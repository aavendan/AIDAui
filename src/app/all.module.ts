import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownsComponent } from './views/buttons/dropdowns.component';
import { TextSelectDirective } from "./directives/textselect/text-select.directive";
import { ExerciseComponent } from './components/exercise/exercise.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ 
      
    DropdownsComponent,
    TextSelectDirective,
    ExerciseComponent, ],
  exports: [ 
        TextSelectDirective,
        ExerciseComponent, 
    ]
})
export class AllModule { }
