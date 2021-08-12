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
  
  modalRef: BsModalRef;
  config = {
    animated: true
  };
  
  models = [];
  gaps = [];
  block = [];
  text = "";
  tense = "";
  inputtext = '';
  libraries = [
    {'name': 'AIDA course'},
    {'name': 'Basic 101'},
    {'name': 'Advanced English course'}
  ]

  
  constructor(private aidaService: AidaService, private modalService: BsModalService) {}

  ngOnInit() {  
    this.loadModels()
  } 

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
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
  generateExercise(inputText, idx) {
    idx = idx == -1? 0:idx;
    if(inputText.length > 0) {
      this.aidaService.getExercise(inputText, this.models[idx].modelId)
      .then(response => {
        this.block = response.block;
        this.gaps = response.gaps;
        this.text = inputText;

        this.exercise.nativeElement.classList.add('shown')
        this.generateOtherTenses()
        
        this.tense = this.models[idx].label 

      })
    } else {
      this.exercise.nativeElement.classList.add('hidden')
      this.loadModels()
    }

  }

  // Capitalize each word
  capitalizeTheFirstLetterOfEachWord(words) {
      var separateWord = words.toLowerCase().split(' ');
      for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
        separateWord[i].substring(1);
      }
      return separateWord.join(' ');
  }

  // Generate a list of other tenses
  generateOtherTenses() {
    var dict = {};
    let arrTenses = [];
    let allcount = 0;
    

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
      
    })

    this.models = [...arrTenses];

  }
  
  

}
