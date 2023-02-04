import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;

  public isSubmmited: boolean;


  constructor(private formBuilder: FormBuilder
    , private router: Router
    , private toastr: ToastrService,
    private loginService: LoginService,
    private ngxService: NgxUiLoaderService) {

  }

  ngOnInit() {
    this.onForm();
  }
  onForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  isInvalid(name): boolean {
    return this.loginForm.controls[name].status.toUpperCase().includes("INVALID") && this.isSubmmited == true;
  }

  onSubmit() {
    this.isSubmmited = true
    if (this.loginForm.invalid) {
      return
    }
    let body = {
      "username": this.loginForm.controls["username"].value,
      "password": this.loginForm.controls["password"].value
    }
    let that = this;
    this.loginService.LOGIN(body)
      .then((data: any) => {
        this.ngxService.stop();

        this.router.navigate(['/']);
      }
      ).catch((error: any) => {
        if (error.includes("user") && error.includes("pass") && error.includes("invalid")) {
          that.toastr.error("Verifique os dados e tente novamente.", "Usuário ou senha inválido!",)
          that.onForm();
        } else {
          that.toastr.error("Ocorreu erro desconhecido", "Erro no Login!",)
        }
        console.log(error)
      });

  }
}