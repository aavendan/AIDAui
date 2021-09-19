import { Component, Input, OnInit, 
  SimpleChanges, ViewChild,ElementRef,  Output, EventEmitter, Inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/common';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

// Import the application components and services.
import { TextSelectEvent } from "../../directives/textselect/text-select.directive";

interface SelectionRectangle {
	left: number;
	top: number;
	width: number;
	height: number;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input() gaps:Array<any>;
  @Input() block:Array<any>;
  @Input() text:String = "";
  @Input() enableSelect = false;

  @Output() hasInputs = new EventEmitter<boolean>();
  @Output() hasReportHint = new EventEmitter<any>();
  @Output() hasNewText = new EventEmitter<string>();

  newChangesFlag = false;

  /* content: SafeHtml; */
  content = [];
  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  highlighted = 'nothing';
  onlytext = '';


  public hostRectangle: SelectionRectangle | null;

  constructor(private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: Document) {
    this.hostRectangle = null;
  }

  ngOnInit(): void {
    
    if(this.block && this.block.length> 0) {
      this.text = this.block['text'];
      this.createExercise()
    }
      
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    console.log(changes["gaps"], this.newChangesFlag)
    
    if(changes["gaps"].currentValue && !this.newChangesFlag) {
      this.gaps = changes['gaps'].currentValue;
      this.block = changes['block'].currentValue;
      this.text = this.block['text'];
      
      this.createExercise()

      this.newChangesFlag = true;

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
          "value":  this.text.replace(/(\r\n|\n|\r)/gm, " ").substring(indexes[i], indexes[i+1]),
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

  /* https://www.bennadel.com/blog/3439-creating-a-medium-inspired-text-selection-directive-in-angular-5-2-10.htm */
  
  renderRectangles( event: TextSelectEvent ) : void {

    if(!this.enableSelect) return;

    /* console.group( "Text Select Event" );
		console.log( "Text:", event.text );
		console.log( "Viewport Rectangle:", event.viewportRectangle );
		console.log( "Host Rectangle:", event.hostRectangle );
		console.groupEnd(); */

		// If a new selection has been created, the viewport and host rectangles will
		// exist. Or, if a selection is being removed, the rectangles will be null.
		if ( event.hostRectangle ) {

			this.hostRectangle = event.hostRectangle;
      this.hostRectangle.top = this.hostRectangle.top + 80;
			this.onlytext = event.text.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s{2,}/g, ' ');
      
      if(this.onlytext.length > 3) {
        //Alert to parent
        this.hasNewText.emit(this.onlytext);
      }        

		} else {

			this.hostRectangle = null;
			this.onlytext = "";

		}

  }

  shareSelection() {
    /* let hints = this.getHints(this.onlytext)
    let multiplist = this.splitMulti(this.onlytext, hints)
    let arrValues = this.valuesOnText(this.onlytext, hints, multiplist)
    console.log(multiplist) */

    let hints = this.getHints(this.onlytext)
    /* console.log(this.content)
    console.log(hints) */
    this.hasNewText.emit(this.onlytext);
  }

  getHints(text) {
    let regexp = /\[.*?\]/g;
    let matchAll = text.matchAll(regexp);
    return Array.from(matchAll);
  }
  
  splitMulti(str, tokens){
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);

    return str;
  }

  valuesOnText(str, hints, multiplist) {
    let output = []
    hints.forEach(element => {
      let idx = str.indexOf(element);
      output.push({'element':element, 'start': idx , 'end': idx + element.length})
    });

    return output;
  }

  //old

  showSelectedText(event) {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }/*  else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    } */
    /* console.log(text)
    console.log(text.length)
    console.log(window.getSelection().getRangeAt(0).commonAncestorContainer['innerHTML']) */
    

    let selection = window.getSelection();
    let oRange = selection.getRangeAt(0); //get the text range
    var start = oRange.startOffset;
    var end = oRange.endOffset;
    let oRect = oRange.getBoundingClientRect();

    let endoced = encodeURIComponent(window.getSelection().toString()).replace(/[!'()*]/g, escape)
    /* console.log(endoced) */

   // Find out how much (if any) user has scrolled
   /* var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
     */    
   // Get cursor position
   const posX = event.clientX - 110;
   const posY = event.clientY + 20;
    
   /* console.log(posX, posY) */

   /* this.highlighted = window.getSelection().getRangeAt(0).commonAncestorContainer['innerHTML']; */
   this.onlytext = text;

   let rangeit =  window.getSelection().getRangeAt(0);
   let so = rangeit.startOffset;
   let eo = rangeit.endOffset;

   /* console.log(rangeit.commonAncestorContainer['innerHTML'])
   */

   /* this.getHints(text).forEach((hints, i) => {
   
    let placeholder = this.content.filter(token => token['isInput'] && "["+token['hint']+"]".includes(hints[0]))
    if(placeholder.length > 0) {
      console.log(hints[0], placeholder)
    }
   }) */

   this.onlytext = this.convert(this.onlytext)

  /*  this.dropdown.show(); */

  }

  convert(text) {
    console.clear()
    this.getHints(text).forEach( (hints) => {
      let temp = this.content.find(token => token['isInput'] && "["+token['hint']+"]" == hints[0])
      text = text.replace(hints[0].trim(), temp['placeholder'].trim())
    })
    return text.trim()
  }

  
}
