import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { IProduct, Product } from '../model/Product';
import { ProductService } from '../services/product.service';
declare var bootstrap: any;

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {
  constructor(private router: Router, private productService: ProductService) {
  }
  public listProducts: Array<IProduct> = [];

  public carouselProducts;

  public timerCarousel;

  public totalPurchase = 0;

  ngOnInit() {
    this.productService.getProduct()
      .subscribe((products) => {
        if (this.productService.listValidation(products)) {
          this.listProducts = products;

          this.carouselProducts = new bootstrap.Carousel('#carouselProducts');


        }
      })
  }
  onOpenProduct(product: Product) {
    if (!isNullOrUndefined(product)) {
      return this.router.navigate(['product'], {
        state: { productId: product.Id }
      });
    }
  }

}
