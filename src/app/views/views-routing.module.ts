import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    pathMatch: 'full'
  },
  {
    path: 'product',
    component: ProductdetailComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
