import { Component, Input, OnInit, SimpleChanges, ViewChild,ElementRef,  Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser"

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input() gaps:Array<any>;
  @Input() block:Array<any>;
  @Input() text:String;

  @Output() hasInputs = new EventEmitter<boolean>();
  @Output() hasReportHint = new EventEmitter<any>();

  /* content: SafeHtml; */
  content = [];
  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
  

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.block)
    this.text = this.block['text']
    this.createExercise()
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    
    if(!changes["gaps"].firstChange) {
      this.gaps = changes['gaps'].currentValue;
      this.block = changes['block'].currentValue;
      this.text = this.block['text'];
      
      this.createExercise()

     /*  this.content = output; */
      // this.content = this.sanitizer.bypassSecurityTrustHtml(output);

    } else {
      this.text = ""
      this.content = []
    }
   
  }

  createExercise() {
    let finalTokens = [];
    let indexes = [];

    //All set of indexes
    indexes.push(0)
    for(let gap of this.gaps) {
      if(gap['enable']) {
        indexes.push(gap['begin'])
        indexes.push(gap['end'])
      }
    }
    indexes.push(this.text.length)
    
    //Creating exercise
    for (let i = 0; i < indexes.length-1; i++) {
      let hint = this.isGap(indexes[i], indexes[i+1])
      let placeholder = this.text.substring(indexes[i], indexes[i+1])
      if(hint.length > 0) {
        finalTokens.push({
          "type": "input",
          "placeholder": placeholder,
          "hint": hint,
          "isInput": true
        });
      } else {
        finalTokens.push( {
          "type": "text",
          "value":  this.text.substring(indexes[i], indexes[i+1]),
          "isInput": false
        })
      }
    }

    /* console.log(finalTokens) */

    //Output
    let output ='No exercises for this tense';
    if(this.hasExercise()) {
      output = finalTokens.join(' ')
    } 

    //emit to parent
    this.hasInputs.emit(this.hasExercise());
    this.content = finalTokens;
  }

  hasExercise() : boolean {
    return !this.gaps.every(gap => gap['enable'] === false);
  }

  isGap(begin, end) : string {
    for(let gap of this.gaps) {
      if(gap['enable'] && gap['begin'] == begin && gap['end'] == end) {
        return gap['hint'];
      }
    }
    return '';
  }

  hideThisGap(id) {
    /* alert(id) */
  }

  reportHint(item) {
    this.hasReportHint.emit(item);
  }
}
