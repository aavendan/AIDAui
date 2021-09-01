import { Component, Inject, OnInit, ViewChild,ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';


import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { AidaService } from '../../services/aida.service';

/* https://stackblitz.com/angular/ygdrrokyvkv?file=app%2Ftable-expandable-rows-example.ts */

@Component({
  styleUrls: ['colors.component.css'],
  templateUrl: 'colors.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ColorsComponent implements OnInit {

  @ViewChild('selectModel') selectModel:ElementRef;
  @ViewChild('selectResource') selectResource:ElementRef;
  @ViewChild('selectType') selectType:ElementRef;
  @ViewChild('exercise') exercise:ElementRef;

  models = [];
  resources = [];
  texts = [];

  dataSource = [];
  columnsToDisplay = ['exercise'];
  expandedElement: Exercise;


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


  combosChanged(e) {
    this.loadExercises(
      this.selectModel.nativeElement.value, 
      this.selectResource.nativeElement.value,
      this.selectType.nativeElement.value)
  }
  
 /*  resourceChanged(e) {
    this.loadExercises(this.selectModel.nativeElement.value, this.selectResource.nativeElement.value)
  }

  typeChanged(e) {
    this.loadExercises(this.selectModel.nativeElement.value, this.selectResource.nativeElement.value)
  }
 */

  async loadExercises(idModel, idResource, idType) {
    if(idModel != -1 && idResource != -1 && idType != -1) {
      
      let contentMax = this.resources[idResource].content
      let resourceName = this.resources[idResource].resourceId
      
      let results = await this.aidaService.getExercisesByResource(resourceName, contentMax)
      .then(responses => responses.map( response => {
       
        return {
          'exercise': response['value']['text'].slice(0,100) + ' ...',
          'text': response['value']['text'],
        }

      }));

      results.map( r => {
        this.aidaService.getExercise(r['text'],this.models[idModel].modelId)
        .then( r2 => {
          r['block'] = r2.block
          r['gaps'] = r2.gaps
          r['show'] = r2.gaps.filter((gap) => gap.enable).length > 0
        })
      })

      /* console.log(results) */

      this.texts = results.filter( (el) => {
        return el['text'] != "";
      });

      

      console.log(this.texts)

      /* this.aidaService.getExercisesByResource(resourceName, content)
      .then(response => { 
        console.log(response.text)
      }) */
    }
    
  }

  async convertToExercise(text, model) {
    return await this.aidaService.getExercise( text, model)
    .then(response => {
      return {
        'block' : response.block,
        'gaps' : response.gaps
      }
    })
  } 

  hasExercises(has: boolean){
    /* console.log(has) */
  }

}

export interface Exercise {
  exercise: string;
  text: string;
  conversion: string;
}
