import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../model/Product';
import { ApiRequestService } from './apirequest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Array<IProduct>;
  private subject: BehaviorSubject<Array<IProduct>>;

  constructor(private router: Router, private apiRequestService: ApiRequestService) {
    this.subject = new BehaviorSubject<Array<IProduct>>(this.products);
  }

  public setProduct(nProducts: Array<IProduct>) {
    this.subject.next(nProducts)
  }

  public getProduct(): Observable<Array<IProduct>> {
    if (this.products == null || this.products == undefined || this.products.length <= 0) {
      this.initProducts().then((data: any) => {
        this.setProduct(data);
        
      })
    }
     return this.subject.asObservable();
  }
  private initProducts() {
    return new Promise((resolve, reject) => {
      this.apiRequestService.GETS()
        .then(
          data => {
            resolve(data);
          }
        ).catch(error => {
          reject(error);
        })
        ;
    });
  }

  public listValidation(list: any){
    if(list == null) return false;
    else if (list == undefined) return false;
    else if (!Array.isArray(list)) return false;
    else if (list.length <= 0) return false;
    else return true;
  }

}
