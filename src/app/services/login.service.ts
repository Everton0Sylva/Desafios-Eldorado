import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Token } from '../model/Token';
import { User } from '../model/User';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient,
    private encryptionService: EncryptionService) { }

  public LOGIN(boby: any) {
    return new Promise((resolve, reject) => {
      this.checkLogin(boby)
        .then((token: Token) => {
          if (token) {
            localStorage.setItem("AuthToken", JSON.stringify(token))
            resolve(true);
          }
        }).catch((error: any) => {
          reject("user.pass.invalid")
        })
    });
  }

  private checkLogin(boby: any): Promise<Token> {
    return new Promise((resolve, reject) => {
      let url = environment.urlapi + "/users";
      this.http.get(url)
        .toPromise()
        .then((data: any) => {
          let user = data.find((us: any) => {
            return us.username == boby.username.toLowerCase() && us.password == boby.password
          });
          if (user != null && user != undefined) {
            let tokenBody = {
              value: user.username,
              pass: user.password
            }
            let token = new Token();
            token.token = this.encryptionService.generateToken(tokenBody);
            token.userId = user.id;
            this.saveToken(token).then(() => {
              resolve(token)
            })
          } else reject();
        })
    });
  }

  private saveToken(token: Token) {
    return new Promise((resolve, reject) => {
      let url = environment.urlapi + "/tokens";
      this.http.post(url, token)
        .toPromise().then((data: any) => {
          resolve(data);
        })
    })
  }


  public GetUser(uToken: Token): Promise<User> {
    return new Promise((resolve, reject) => {
      let that = this;
      let url = environment.urlapi + "/tokens";
      this.http.get(url)
        .toPromise()
        .then((data: any) => {
          let fToken = data.find((tk: Token) => {
            debugger
            return tk.token == uToken.token && tk.userId == uToken.userId
          });
          if (fToken) {
            that.http.get(environment.urlapi + "/users/" + fToken.userId)
              .toPromise()
              .then((user: User | any) => {
                resolve(user);
              }).catch((error: any) => {
                return reject(error)
              })
          } else reject(false)
        }).catch((error: any) => {
          return reject("not.find.token")
        })
    });
  }

}