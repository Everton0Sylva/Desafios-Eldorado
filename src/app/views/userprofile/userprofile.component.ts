import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { eTiposLogradouro } from 'src/app/model/eTiposLogradouro';
import { User } from 'src/app/model/User';
import { Endereco, UserProfile } from 'src/app/model/UserProfile';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent {

  public userProfile: UserProfile = null;

  public userId: any;

  public isSubmmited: boolean;

  public isInvalid = "";

  public currentCep = "";

  public customSelectValues = {
    states: [],
    name: "listTiposLogradouro",
    label: "Tipo Logradouro"
  }

  constructor(private apiRequestService: ApiRequestService,
    private ngxService: NgxUiLoaderService, private router: Router) {


    var nav = this.router.getCurrentNavigation();
    if (nav !== null && nav !== undefined) {
      const state: any = nav.extras.state;
      if (state !== null && state !== undefined) {
        this.userId = state.userId !== undefined && state.userId !== null ? state.userId : null;
      }
    };
  }
  ngOnInit() {
    this.isSubmmited = false;
    this.ngxService.start();
    if (this.userId) {
      this.apiRequestService.GetHttp("/userProfile/" + this.userId)
        .then((data: any) => {
          this.userProfile = new UserProfile(data);
        }).catch((error: any) => {
          this.userProfile = new UserProfile();
        })
    } else {
      this.userProfile = new UserProfile();
      this.userProfile.endereco = new Endereco();
    }
    this.ngxService.stop();

    let etiposLogradouro = eTiposLogradouro;
    let keys = Object.keys(etiposLogradouro);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      this.customSelectValues.states.push({ name: key, value: etiposLogradouro[key] })
    }
  }

  onSearchAddress() {
    var cep = String(this.currentCep).trim();
    if (cep != null && cep != undefined && cep.length >= 7 && cep.length <= 9) {
      if (!isNaN(parseInt(cep))) {
        this.apiRequestService.GetCEP(cep)
          .then((data: any) => {
            this.userProfile.endereco = new Endereco(data);
          }).catch((error: any) => {
            Swal.fire({
              text: 'CEP não encontrado ou inválido',
              icon: 'error'
            })
          })
      }
    }
  }
}
