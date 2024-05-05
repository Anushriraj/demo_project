import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePinComponent } from './create-pin/create-pin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    CreatePinComponent,
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FileUploadModule
  ],
  exports: [
    CreatePinComponent,
    CreateCustomerComponent
  ]
})
export class SharedModule { }
