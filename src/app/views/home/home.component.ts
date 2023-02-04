import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Cart } from 'src/app/model/Cart';
import { IProduct, Product } from 'src/app/model/Product';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { CartService } from 'src/app/services/cart.service';
declare var bootstrap: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private ngxService: NgxUiLoaderService, private cartService: CartService,
  public apiRequestService: ApiRequestService, private toastr: ToastrService) {
  }
  public listProducts: Array<IProduct> = [];

  public carouselProducts;

  public timerCarousel;

  public totalPurchase = 0;

  ngOnInit() {
    this.carouselProducts = new bootstrap.Carousel('#carouselProducts');
    this.listProducts = [];
    this.ngxService.start();
    let that = this;

    this.apiRequestService.GetsFetch("/products")
    .then(async (products: any) => {
        if (that.cartService.listValidation(products)) {
          var pos = []
          for (let i = 0; i < 5; i++) {
            pos.push(Math.floor(Math.random() * 20));
          }
          var list = await Promise.all(products.map(async (product: any, idx: number) => {
            if (pos.includes(idx)) {
              var prod: any = product;
              return await that.apiRequestService.getBase64ImageFromUrl(prod.image)
                .then(image => {
                  var product = new Product(prod);
                  product.Image = image;
                  return product;
                });
            }
          }));
          that.listProducts = list.filter((p: any) => {
            return p != undefined
          });
          that.ngxService.stop();
        }
      })
      
  }

  onOpenProduct(product: Product) {
    if (!this.cartService.listValidation(product)) {
      return this.router.navigate(['product'], {
        state: { productId: product.Id }
      });
    }
  }

  onAddProduct(product: Product) {
    var cart = new Cart();
    cart.Product = product;

    this.toastr.success("Produto Adcionado ao carrinho!");
    this.cartService.setItemCart(cart);
  }
}
