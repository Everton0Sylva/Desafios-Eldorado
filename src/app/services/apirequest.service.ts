import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private router: Router, private http: HttpClient,
    private encryptionService: EncryptionService) { }

  public async getBase64ImageFromUrl(imageUrl) {
    return new Promise((resolve) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', imageUrl);
      xhr.responseType = 'blob';
      xhr.send();
    })
  }


  public GetsFetch(param: string) {
    return new Promise((resolve, reject) => {
      let url = environment.url + param;
      fetch(url)
        .then(res => res.json())
        .then(json => resolve(json))
    });
  }


  public GetsHttp(url: any) {
    return new Promise((resolve, reject) => {
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

  public GetFetch(param: string, id: number) {
    return new Promise((resolve, reject) => {
      let url = environment.url + param + id;
      fetch(url)
        .then(res => res.json())
        .then(json => resolve(json))
    });
  }

  public GetHttp(url: any) {
    return new Promise((resolve, reject) => {
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

  public POST(param: any, body: any) {
    return new Promise((resolve, reject) => {
      let url = environment.urlapi + param;
      this.http.post(url, body)
        .toPromise().then((data: any) => {
          resolve(data);
        }).catch((error: any) => {
          reject(error);
        })
    })
  }

  public GetCEP(cep: string) {
    return new Promise((resolve, reject) => {
      this.http.get("https://viacep.com.br/ws/" + cep + "/json/", {
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