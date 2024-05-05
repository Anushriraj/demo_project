import { Component, DoCheck, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { FileUploader} from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';
const URL = 'http://localhost:4200/fileupload/';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.css']
})
export class CreatePinComponent implements OnInit{
  createPinForm!: UntypedFormGroup;
  isSubmitted = false;
  pinList: any[] = [];
  public uploader:FileUploader = new FileUploader({
    url: URL, 
    disableMultipart:true
    });
  url: any;
  fileName: any;
  collaboratoryList: any = [];
  @Input() collaboratoryLists: any[] = [];

  constructor(private _formBuilder: UntypedFormBuilder, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.createPinFormValidation();
    this.pinList = JSON.parse(localStorage.getItem('pinList') || '');
    this.collaboratoryLists[0].replace(/,/g, "");
 }

 // create pin form validation
 createPinFormValidation() {
    this.createPinForm = this._formBuilder.group({
      title: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      collaboratory: new UntypedFormControl('', Validators.required),
      privacy: new UntypedFormControl('', Validators.required)
    })
  }

  // uoload the file using drag and drop
  public onFileSelected(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event[0])
    reader.onload=(event: any)=>{
      this.url = event.target.result;
    }
    this.fileName = event[0].name;
  }

  // add the pin data and store in local storage
  onClickCreatePin() {
    this.isSubmitted = true;
    if (this.createPinForm.valid) {
      localStorage.setItem('isSubmittedPin', 'true');
      let url = {url: this.url};
      let pinformValue: any;
      pinformValue = Object.assign(this.createPinForm.value, url);
      this.pinList.push(this.createPinForm.value);    
      localStorage.setItem('pinList', JSON.stringify(this.pinList));
    }
  }

}
