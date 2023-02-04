import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../model/User";
import { LoginService } from "./login.service";

@Injectable()
export class UserService {

  private currentUser: User;
  private subject: BehaviorSubject<User>;

  constructor(private loginService: LoginService,) {
    this.subject = new BehaviorSubject<User | null>(this.currentUser);
  }

  public setUser(cUser: User) {
    this.currentUser = new User();
    this.currentUser = cUser;
    setTimeout(() => {
      this.subject.next(this.currentUser)
    }, 100);
  }

  public getUser(): Observable<User> {
    if (!this.currentUser) {
      this.InitUser()
        .then((user: User) => {
          this.setUser(user);
        })
    }

    return this.subject.asObservable();
  }

  private InitUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      let token = JSON.parse(localStorage.getItem("AuthToken"));
      if (token) {
        debugger
        this.loginService.GetUser(token)
          .then((user: User) => {
            resolve(user);
          }).catch((error: any) => {
            reject(error)
          })
      } else reject(true)
    })
  }
}