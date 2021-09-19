import { Component, ViewChild,ElementRef, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AidaService } from '../../services/aida.service';

@Component({
  templateUrl: 'typography.component.html',
  styleUrls: ['typograph.component.css'],
  providers : [AidaService]  
})
export class TypographyComponent {

  @ViewChild('selectModel') selectModel:ElementRef;
  @ViewChild('inputText') inputText:ElementRef;
  @ViewChild('exercise') exercise:ElementRef;
  
  @ViewChild('templateReportHint') templateReportHint:TemplateRef<any>;
  
  modalSaveExercise: BsModalRef;
  modalReportHint: BsModalRef;

  config = {
    animated: true
  };
  
  models = [];
  gaps = [];
  block = [];
  text = "";
  tense = "";
  inputtext = '';
  item: any;

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

  
  constructor(private aidaService: AidaService, private modalService: BsModalService) {}

  ngOnInit() {  
    this.loadModels()
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

  modelChanged(e) {
    this.generateExercise(this.inputText.nativeElement.value, this.selectModel.nativeElement.value)
  }

  inputTextArea(e) {
    this.generateExercise(this.inputText.nativeElement.value, this.selectModel.nativeElement.value)
    
  }

  showThisTense(e) {
    this.generateExercise(this.inputText.nativeElement.value, e.target.id)
  }

  // Generate exercise
  generateExercise(inputText, idTarget) {
    
    let idx = idTarget == -1? 0:idTarget;
    let assigned = idTarget == -1;

    if(inputText.trim().length > 0) {
      this.aidaService.createExercise(inputText, this.models[idx].modelId)
      .then(response => {
        this.block = response.block;
        this.gaps = response.gaps;
        this.text = inputText;

        //show exercises box
        if(this.exercise.nativeElement.classList.contains('hidden')) {
          this.exercise.nativeElement.classList.toggle('hidden')
          this.exercise.nativeElement.classList.add('shown')
        }
                
        let idGenerated = this.generateOtherTenses()
        
        this.tense = this.models[idx].label 
        
        if(assigned) {
          this.selectModel.nativeElement.value = idGenerated
        }

        /* console.log("Selected idx ", idx)
        console.log("Generated idx ", idGenerated) */
      })
    } else {

      //hide exercises box
      if(this.exercise.nativeElement.classList.contains('shown')) {
        this.exercise.nativeElement.classList.toggle('shown')
        this.exercise.nativeElement.classList.add('hidden')
      }
      
      this.selectModel.nativeElement.value = -1
      this.loadModels()
    }

  }

  // Capitalize each word
  public capitalizeTheFirstLetterOfEachWord(words) {
      try {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
          separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
          separateWord[i].substring(1);
        }
        return separateWord.join(' ');
      } catch (error) {
        console.error();
      }      
  }

  // Generate a list of other tenses
  generateOtherTenses() {
    var dict = {};
    let arrTenses = [];
    let allcount = 0;
    let idx = -1;

    /* for(let model of this.models) { */
    this.models.forEach((model, itx) => {
      let label = model.label.split(" (")[0];

      let count = this.gaps.filter(gap => this.capitalizeTheFirstLetterOfEachWord(gap['tense']) === label).length
      allcount += count;
      
      if(itx != this.models.length - 1) {
        model.label = label + " (" + count + ") "
      } else {
        model.label = label + " (" + allcount + ") "
      }
     
      arrTenses.push(model)
      idx = count != 0 && idx == -1? itx : idx;
    })

    this.models = [...arrTenses];
    return idx
  }

  newText(value) {

    /* this.inputText.nativeElement.value = value; */
  }

}
