import { Component, Input, OnInit, SimpleChanges, ViewChild,ElementRef } from '@angular/core';
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

  content: SafeHtml;
  spots = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    
    if(!changes["gaps"].firstChange) {
      this.gaps = changes['gaps'].currentValue;
      this.block = changes['block'].currentValue;
      this.text = this.block['text'];
      
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
          finalTokens.push('<input type="text" placeholder="'+placeholder+'"> <b>['+hint+']</b>');
        } else {
          finalTokens.push( this.text.substring(indexes[i], indexes[i+1]) )
        }
      }

      //Output
      let output ='No exercises for this tense';
      if(this.hasExercise()) {
        output = finalTokens.join(' ')
      }
      this.content = this.sanitizer.bypassSecurityTrustHtml(output);

    } else {
      this.text = ""
      this.content = ""
    }
   
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
}
