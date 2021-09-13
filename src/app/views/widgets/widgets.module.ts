import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';

import { MatTableModule } from '@angular/material/table';

/* import { TextSelectDirective } from "../../directives/textselect/text-select.directive";
import { ExerciseComponent } from '../../components/exercise/exercise.component'; */

import { AllModule } from '../../all.module';

@NgModule({
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    ChartsModule,
    MatTableModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    AllModule
  ],
  declarations: [ 
    WidgetsComponent, 
    /* TextSelectDirective,
    ExerciseComponent, */ ]
})
export class WidgetsModule { }
