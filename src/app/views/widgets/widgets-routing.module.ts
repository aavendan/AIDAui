import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetsComponent } from './widgets.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetsComponent,
    data: {
      title: 'Exercises'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {}
