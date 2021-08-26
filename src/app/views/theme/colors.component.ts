import { Component, Inject, OnInit, ViewChild,ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { AidaService } from '../../services/aida.service';

@Component({
  styleUrls: ['colors.component.css'],
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {

  @ViewChild('selectModel') selectModel:ElementRef;
  @ViewChild('selectResource') selectResource:ElementRef;
  @ViewChild('exercise') exercise:ElementRef;

  models = [];
  resources = [];
  texts = [];

  constructor(private aidaService: AidaService) {
    /* , @Inject(DOCUMENT) private _document: any */
  }

  /* public themeColors(): void {
    Array.from(this._document.querySelectorAll('.theme-color')).forEach((el: HTMLElement) => {
      const background = getStyle('background-color', el);
      const table = this._document.createElement('table');
      table.innerHTML = `
        <table class="w-100">
          <tr>
            <td class="text-muted">HEX:</td>
            <td class="font-weight-bold">${rgbToHex(background)}</td>
          </tr>
          <tr>
            <td class="text-muted">RGB:</td>
            <td class="font-weight-bold">${background}</td>
          </tr>
        </table>
      `;
      el.parentNode.appendChild(table);
    });
  } */

  ngOnInit(): void {
    this.loadModels();
    this.loadResources();
    /* this.themeColors(); */
  }

  loadModels() {
    this.aidaService.getModels()
    .then(response => {
      this.models = response;
    }) 
  }

  loadResources() {
    this.aidaService.getResources()
    .then(response => {
      this.resources = response;
    }) 
  }


  modelChanged(e) {
    this.loadExercises(this.selectModel.nativeElement.value, this.selectResource.nativeElement.value)
  }
  
  resourceChanged(e) {
    this.loadExercises(this.selectModel.nativeElement.value, this.selectResource.nativeElement.value)
  }

  async loadExercises(idModel, idResource) {
    if(idModel != -1 && idResource != -1) {
      let contentMax = this.resources[idResource].content
      let resourceName = this.resources[idResource].resourceId
      
      let results = await this.aidaService.getExercisesByResource(resourceName, contentMax)
      .then(responses => responses.map( response => response['value']['text']))

      this.texts = results.filter(function (el) {
        return el != "";
      });

      /* this.aidaService.getExercisesByResource(resourceName, content)
      .then(response => { 
        console.log(response.text)
      }) */
    }
    
  }
}
