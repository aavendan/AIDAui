// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
/* 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; */

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';

// Dropdowns Component
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { EllipsisModule } from 'ngx-ellipsis';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { BadgesComponent } from '../notifications/badges.component';
import { DropdownsComponent } from '../buttons/dropdowns.component';

import { ExerciseComponent } from '../../components/exercise/exercise.component';

@NgModule({
  imports: [
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    ThemeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EllipsisModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
   
  ],
  declarations: [
    ColorsComponent,
    TypographyComponent,
    BadgesComponent,
    ExerciseComponent,
    DropdownsComponent
  ]
})
export class ThemeModule { }
