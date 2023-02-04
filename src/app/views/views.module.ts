import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { LayoutModule } from '../layout/layout.module';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { CartComponent } from './cart/cart.component';
import { PurchaseComponent } from './cart/purchase/purchase.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductsListComponent } from './products-list/products-list.component';
import { HomeComponent } from './home/home.component';
import { InterceptorModule } from '../services/interceptor/interceptor.module';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    ViewsComponent,
    ProductdetailComponent,
    CartComponent,
    PurchaseComponent,
    ProductsListComponent,
    HomeComponent,
    UserprofileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ViewsRoutingModule,
    NgxMaskModule.forRoot(),
    LayoutModule,
    NgxImageZoomModule,
    InterceptorModule,
    ComponentsModule,
  ],
  exports: [
    PurchaseComponent
  ]
})
export class ViewsModule { }
