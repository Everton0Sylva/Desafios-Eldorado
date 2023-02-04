import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LayoutModule } from './layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { CartService } from './services/cart.service';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { EncryptionService } from './services/encryption.service';
import { AuthGuard } from './services/auth.guard';
import { InterceptorModule } from './services/interceptor/interceptor.module';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { ServicesModule } from './services/services.module';


registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    NgxUiLoaderModule.forRoot({
      maxTime: 300000,
      blur: 8,
      fgsType: "ball-scale-multiple",
      fgsSize: 80,
      fgsColor: "#cacaca",
      hasProgressBar: true,
      textPosition: "center-center",
    }),
    ToastrModule.forRoot({
      autoDismiss: false,
      closeButton: false,
      timeOut: 5000,
      newestOnTop: true,
      positionClass: "toast-bottom-right"
    }),
    NgxImageZoomModule,
    InterceptorModule,
    ServicesModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
