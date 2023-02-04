import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomSelectComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CustomSelectComponent],
})
export class ComponentsModule { }
