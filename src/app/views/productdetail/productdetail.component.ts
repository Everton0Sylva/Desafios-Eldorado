import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IProduct, Product } from 'src/app/model/Product';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/model/Cart';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {

  public product: IProduct;

  public productId: number;

  constructor(private router: Router, private route: ActivatedRoute,
    private apiRequestService: ApiRequestService, private cartService: CartService,
    private ngxService: NgxUiLoaderService, private location: Location, private toastr: ToastrService) {
    let nav = this.router.getCurrentNavigation();
    if (nav !== null && nav !== undefined) {
      const state: any = nav.extras.state;
      if (state !== null && state !== undefined) {
        const id = state.productId;
        if (id !== null && id !== undefined) {
          this.productId = id;
          //  this.onGetProduct();
        }
      }
    }
  }

  // onGetProduct() {
  ngOnInit() {
    if (isNaN(this.productId)) {
      this.location.back();
    } else {
      this.ngxService.start();
      this.apiRequestService.GetFetch("/products/", this.productId)
        .then((data: any) => {
          this.product = new Product(data);
          this.product.Image = data.image ? data.image : data.Image;

          this.ngxService.stop();
        }
        ).catch(error => {
          console.log(error)
        });
    }
  }

  onAddProduct() {
    var cart = new Cart();
    cart.Product = this.product;

    this.toastr.success("Produto Adcionado ao carrinho!");
    this.cartService.setItemCart(cart);
  }
}
