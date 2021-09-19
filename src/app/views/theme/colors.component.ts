import { Component, Inject, OnInit, ViewChild,ElementRef, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';


import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { AidaService } from '../../services/aida.service';

/* https://stackblitz.com/angular/ygdrrokyvkv?file=app%2Ftable-expandable-rows-example.ts */

@Component({
  styleUrls: ['./colors.component.css'],
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

  @ViewChild('templateReportHint') templateReportHint:TemplateRef<any>;

  modalReportHint: BsModalRef;
  modalSaveExercise: BsModalRef;

  config = {
    animated: true
  };

  models = [];
  resources = [];
  elements = [];
  item: any;

  //datatable
  dataSource = [];
  columnsToDisplay = ['exercise'];
  expandedElement: Exercise;

  //accordion
  customClass = 'customClass';

  //save
  keys = {
    'path': ['course','book', 'chapter'],
    'evaluation': 'evaluation'
  } 
  libraries = [
    {
      'course': 'Grammar',
      'book': 'Book1',
      'chapter': 'Chapter 01',
      'evaluation': 'AIDA course'
    },
    {
      'course': 'Grammar',
      'book': 'Book1',
      'chapter': 'Chapter 01',
      'evaluation': 'AIDA course II'
    },
    {
      'course': 'Grammar',
      'book': 'Book2',
      'chapter': 'Chapter 03',
      'evaluation': 'Advanced English course'
    },
  ]

  constructor(private aidaService: AidaService, private modalService: BsModalService) {
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

  openModal(template: TemplateRef<any>) {
    this.modalSaveExercise = this.modalService.show(template, this.config);
  }

  reportHint(value){
    this.item = value;
    this.modalReportHint = this.modalService.show(this.templateReportHint, this.config);
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
        let short =  response['value']['text'].replace(/(\r\n|\n|\r)/gm, " ").replace(/\s{2,}/g, ' ').slice(0,50) + ' ...'
        
        return {
          'short': short,
          'text': response['value']['text'],
        }

      }));

      results.map( r => {
        this.aidaService.createExercise(r['text'],this.models[idModel].modelId)
        .then( r2 => {
          r['block'] = r2.block
          r['gaps'] = r2.gaps
          r['show'] = r2.gaps.filter((gap) => gap.enable).length > 0
        })
      })

      this.elements = results.filter( (el) => {
        return el['text'] != "";
      });

      /* console.log(this.elements) */

      /* this.aidaService.getExercisesByResource(resourceName, content)
      .then(response => { 
        console.log(response.text)
      }) */
    }
    
  }

  /* async convertToExercise(text, model) {
    return await this.aidaService.createExercise( text, model)
    .then(response => {
      return {
        'block' : response.block,
        'gaps' : response.gaps
      }
    })
  }  */

  /* hasExercises(has: boolean){
    console.log(has)
  } */

  moreInfo() {
    alert("More Info")
    
  }

  save() {
    alert("Save")
  }

}

export interface Exercise {
  exercise: string;
  text: string;
  conversion: string;
}
