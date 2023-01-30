import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Cart } from 'src/app/model/Cart';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {


  public listCart: Array<Cart> | null;

  constructor(private router: Router, private cartService: CartService, private ngxService: NgxUiLoaderService,) { }

  ngOnInit() {
    this.ngxService.start();
    this.cartService.getCart()
      .subscribe((cart) => {
        if (Array.isArray(cart) && cart.length > 0) {
          this.listCart = cart;
          this.ngxService.stop();
        } else {
          this.listCart = null;
          this.ngxService.stop();
        }
      })
  }

  setItemCart(fn, cart: Cart) {
    if (!isNullOrUndefined(cart)) {
      if (fn == '+') {
        cart.Quantity++;
      } else if (fn == '-') {
        if (cart.Quantity <= 1) {
          this.listCart.splice(this.listCart.findIndex((car: any) => {
            return car == cart;
          }), 1);
        } else cart.Quantity--;
      }
      this.listCart[this.listCart.indexOf(cart)] = cart;

      setTimeout(() => {
        this.cartService.setCart(this.listCart);
      }, 1000);
    }
  }

  onOpenProduct(product: Product) {
    if (!isNullOrUndefined(product)) {
      return this.router.navigate(['product'], {
        state: { productId: product.Id }
      });
    }
  }
}
