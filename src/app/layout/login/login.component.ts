import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { EncryptionService } from 'src/app/services/encryption.service';

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
    private apiRequestService: ApiRequestService,
    private ngxService: NgxUiLoaderService) {

    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  ngOnInit() {
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
     "username" : this.loginForm.controls["username"].value,
     "password" : this.loginForm.controls["password"].value
    }
    this.apiRequestService.LOGIN(body)
      .then((data: any) => {
        this.ngxService.stop();

        this.router.navigate(['/']);
      }
      ).catch(error => {
        console.log(error)
      });

  }
}
