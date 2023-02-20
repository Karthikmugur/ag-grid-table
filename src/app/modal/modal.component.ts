import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  userForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, Validators.required),
    middlename: new FormControl(null),
    lastname: new FormControl(null),
    mobile: new FormControl(null, [Validators.required, Validators.pattern("[6-9][0-9]{9}")]),
    email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._]+@[a-z0-9.]+\\.[a-z]{2,4}$")])
  });


  onSubmission(){
    console.log(this.userForm.value);
    alert("Submitted Success");
    this.userForm.reset();
  }

}
