import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { TextSelectDirective } from "./directives/textselect/text-select.directive";
import { ExerciseComponent } from './components/exercise/exercise.component';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [ 
    TextSelectDirective,
    ExerciseComponent, ],
  exports: [ 
    TextSelectDirective,
    ExerciseComponent,
    ]
})
export class AllModule { }
