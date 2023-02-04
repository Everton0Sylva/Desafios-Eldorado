import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'product',
        component: ProductdetailComponent,
      },
      {
        path: 'products/:category',
        component: ProductsListComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'userprofile',
        component: UserprofileComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
