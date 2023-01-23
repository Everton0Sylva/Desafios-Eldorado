import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private router: Router, private http: HttpClient) { }

  public GETS() {
    return new Promise((resolve, reject) => {
      let url = environment.url + "/products";
      this.http.get(url, {
      })
        .toPromise()
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
  
  public GET(id: number) {
    return new Promise((resolve, reject) => {
      let url = environment.url + "/products/" + id;
      this.http.get(url, {
      })
        .toPromise()
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
}