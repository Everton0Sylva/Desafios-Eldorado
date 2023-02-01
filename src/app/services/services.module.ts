import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from './apirequest.service';
import { AuthGuard } from './auth.guard';
import { CartService } from './cart.service';
import { EncryptionService } from './encryption.service';
import { LoginService } from './login.service';
import { UserService } from './user.service';



@NgModule({
  providers: [
    ApiRequestService,
    AuthGuard,
    CartService,
    EncryptionService,
    LoginService,
    UserService
  ],
})
export class ServicesModule { }
