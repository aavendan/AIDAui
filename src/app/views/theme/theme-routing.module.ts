import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Input'
    },
    children: [
      {
        path: '',
        redirectTo: 'aida-resources'
      },
      {
        path: 'aida-resources',
        component: ColorsComponent,
        data: {
          title: 'AIDA resources'
        }
      },
      {
        path: 'whole-text',
        component: TypographyComponent,
        data: {
          title: 'Add whole text'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
