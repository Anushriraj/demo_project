import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  createCustomform!: UntypedFormGroup;
  regionList: any[] = [];
  countryList:  any[] = [];
  isSubmitted = false;
  collaboratoryList: any = [];
  @Output() collaboratory = new EventEmitter();

  constructor(private _formBuilder: UntypedFormBuilder, private _service: MainService){}
  ngOnInit(): void {
    this.createCustomerFormValidation();
    this.getRegionAndCountry();
    this.collaboratoryList.push(localStorage.getItem('collaboratoryList'));
  }

  // create customer form validation
  createCustomerFormValidation() {
    this.createCustomform = this._formBuilder.group({
      title: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new UntypedFormControl('', [Validators.email, Validators.required]),
      region: new UntypedFormControl('', Validators.required),
      country: new UntypedFormControl('', Validators.required)
    })
  }


  // add the customer data and store in session storage
  onClickCreateCustomer() {
    this.isSubmitted = true;
    if (this.createCustomform.valid) {
      localStorage.setItem('isSubmittedCustomer', 'true');
      this.collaboratoryList.push(this.createCustomform.value.title);
      this.collaboratory.emit(this.collaboratoryList);
      if (this.collaboratoryList[0] !== null) {
        this.collaboratoryList[0] = this.collaboratoryList[0].replace(/,/g, "");
        console.log(this.collaboratoryList[0], this.collaboratoryList)
      }
      localStorage.setItem('collaboratoryList', this.collaboratoryList)
    }
  }

  // get region from the api response
  async getRegionAndCountry() {
    let res = await this._service.getRegion();
    Object.values(res.data).map((data: any) => { 
      this.regionList.push(data.region);
     });
    this.regionList = this.regionList.filter((item, index) => this.regionList.indexOf(item) === index);
    let selectedRegion = this.createCustomform.value.region;
    Object.values(res.data).map((data: any) => { 
      this.countryList.push(data.country);
     });
  }

}
