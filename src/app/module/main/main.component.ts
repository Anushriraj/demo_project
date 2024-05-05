import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  pinList: any = [];
  collaboratoryList:any[]=[];
  showCustomerForm = false;
  showPinForm = false;

  ngOnInit(): void {
    this.pinList = JSON.parse(localStorage.getItem('pinList') || '');
  }

  // get collaboratory list
  getCollaboratoryList(event: any) {
    this.collaboratoryList = event;
  }

  // show the customer form using boolean value
  onClickAddCustomer() {
    this.showCustomerForm = true;
    localStorage.setItem('isSubmittedCustomer', 'false');
  }

  // show the pin form using boolean value
  onClickAddPin() {
    this.showPinForm = true;
    localStorage.setItem('isSubmittedPin', 'false');
  }

  ngDoCheck(): void {
    let isSubmitCustomerForm = localStorage.getItem('isSubmittedCustomer');
    if (isSubmitCustomerForm == 'true') {
      this.showCustomerForm = false;
    }
    let isSubmitPinForm = localStorage.getItem('isSubmittedPin');
    if (isSubmitPinForm == 'true') {
      this.showPinForm = false;
    }
    if (localStorage.getItem('pinList')) {
      this.pinList = JSON.parse(localStorage.getItem('pinList') || '');
    }
}

}
