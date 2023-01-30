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

  private token: string;

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

  public GETS(param: string) {
    return new Promise((resolve, reject) => {
      let url = environment.url + param;
      fetch(url)
        .then(res => res.json())
        .then(json => resolve(json))
    });
  }


  public GET(param: string, id: number) {
    return new Promise((resolve, reject) => {
      let url = environment.url + param + id;
      fetch(url)
        .then(res => res.json())
        .then(json => resolve(json))
    });
  }

  public LOGIN(boby: any) {
    return new Promise((resolve, reject) => {
      let url = environment.url + "/auth/login";
      this.http.post(url, boby)
        .toPromise()
        .then((data: any) => {
          this.token = data.token;
          this.encryptToken();
          resolve(data)
        })
    });
  }

  public encryptToken() {
    const encodedData = this.encryptionService.onEncrypt(this.token);
    localStorage.setItem("", encodedData);
  }

  public getToken() {
    let accessToken = localStorage.getItem("");
    this.token = this.encryptionService.onDecrypt(accessToken);
    return this.token;
  }
}