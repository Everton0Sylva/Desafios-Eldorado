import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../model/Cart';
import { Product } from '../model/Product';
import { ApiRequestService } from './apirequest.service';

@Injectable()
export class CartService {

  private cart: Array<Cart>;
  private subject: BehaviorSubject<Array<Cart>>;

  constructor(private apiRequestService: ApiRequestService) {
    this.cart = new Array<Cart>();
    this.subject = new BehaviorSubject<Array<Cart> | null>(this.cart);
  }

  public setCart(nCart: Array<Cart>) {
    this.cart = nCart;
    setTimeout(() => {
      this.subject.next(this.cart)
    }, 500);
  }

  public setItemCart(nCart: Cart) {
    var itemIdx = this.cart.findIndex((Cart: Cart) => {
      return nCart.Product.Id == Cart.Product.Id
    })

    if (itemIdx != null && itemIdx != undefined && itemIdx >= 0) {
      this.cart[itemIdx].Quantity++;
    } else {
      nCart.Quantity = 1;
      this.cart.push(nCart);
    }
    setTimeout(() => {
      this.subject.next(this.cart);
    }, 200);
  }


  public getCart(): Observable<Array<Cart>> {
    /* let that = this;
   
    if (this.listValidation(this.cart) == false) {
      this.initCart().then((data: any) => {
        this.cart = data;
        that.setCart(data);
      })
    }
*/
    return this.subject.asObservable();
  }

  private initCart() {
    return new Promise(async (resolve, reject) => {
      var pos = [];
      for (let i = 0; i < 5; i++) {
        var rand = Math.floor(Math.random() * 20);
        var find = pos.find((f: any) => {
          return rand == f;
        });
        if (find) --i;
        else pos.push(rand);
      }
      var promi = await pos.map(async (p) => {
        return await this.apiRequestService.GET("/products/", p)
          .then(
            async (data: any) => {
              return await this.apiRequestService.getBase64ImageFromUrl(data.image).then(async image => {
                var nCart = new Cart();
                nCart.Product = new Product(data);
                nCart.Quantity = (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
                nCart.Product.Image = image;
                return nCart;
              });
            })
      })
      resolve(Promise.all(promi));
    })
  }

  public listValidation(list: any) {
    if (list == null) return false;
    else if (list == undefined) return false;
    else if (!Array.isArray(list)) return false;
    else if (list.length <= 0) return false;
    else return true;
  }
}
