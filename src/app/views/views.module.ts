import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ChartComponent } from './chart/chart.component';
import { ShoppingComponent } from './shopping/shopping.component';


@NgModule({
  declarations: [
    ViewsComponent,
    ChartComponent,
    ShoppingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ViewsRoutingModule,
    NgxMaskModule
  ]
})
export class ViewsModule { }
