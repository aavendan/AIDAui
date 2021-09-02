import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';

import { MatTableModule } from '@angular/material/table';

import { ExerciseComponent } from '../../components/exercise/exercise.component';

@NgModule({
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    ChartsModule,
    MatTableModule,
    BsDropdownModule,
    ModalModule.forRoot(),
  ],
  declarations: [ WidgetsComponent, ExerciseComponent ]
})
export class WidgetsModule { }
