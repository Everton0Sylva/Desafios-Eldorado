import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IProduct, Product } from 'src/app/model/Product';
import { ApiRequestService } from 'src/app/services/apirequest.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  public category = "";
  public listProduct: Array<IProduct>;
  public listProductFilter: Array<IProduct>;

  constructor(private router: Router, private route: ActivatedRoute,
    private apiRequestService: ApiRequestService,
    private ngxService: NgxUiLoaderService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.category !== undefined && params.category !== null) {
        this.category = params.category;
        this.onProductList();
      }
    });
  }

  onProductFilter() {
    let val = (<HTMLInputElement>document.getElementById("inputSearch")).value;
    if (val == null || val == undefined || val == "") {
      this.listProductFilter = this.listProduct;
      return
    }
    val = val.toLowerCase().trim();
    this.listProductFilter = this.listProduct.filter(product => {
      return product.Title.toLowerCase().indexOf(val) >= 0 ? product : false
    })
  }

  onProductList() {
    this.listProduct = [];
    this.ngxService.start();
    let that = this;

    if (this.category != "") {
      let path = this.category.includes("todos") ? "/products" : ("/products/category/" + this.category);

      this.apiRequestService.GETS(path)
        .then(async (products: any) => {
          if (products.length > 0) {
            that.listProduct = await Promise.all(products.map(async (prod: any, idx: number) => {
              return await that.apiRequestService.getBase64ImageFromUrl(prod.image)
                .then(image => {
                  let product: IProduct = new Product(prod);
                  product.Image = image;
                  return product;
                });
            }));
            that.listProductFilter = that.listProduct;
            
            that.ngxService.stop();
          }
        })
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
