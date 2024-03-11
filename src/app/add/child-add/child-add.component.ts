import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'child-add',
  templateUrl: './child-add.component.html',
  styleUrls: ['./child-add.component.scss']
})
export class ChildAddComponent {
  username: FormGroup;

  constructor(
    private userService: UserService,
    private Router: Router,
    private formBuilder: FormBuilder
    ){
      this.username = this.formBuilder.group({
        avatar: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        gender: ['', Validators.required],
      });
    }

     initForm(data: any){
      this.username = this.formBuilder.group({
        avatar: [data.avatar, Validators.required],
        name: [data.name, Validators.required],
        username: [data.username, Validators.required],
        gender: [data.gender, Validators.required],
      });
    }


  @Output() dataToAdd = new EventEmitter();
  changeDataToParent(){
    let dataRequest = {
      avatar: this.username.value.avatar,
      name: this.username.value.name,
      username: this.username.value.username,
      gender: this.username.value.gender,
    }
    this.dataToAdd.emit(dataRequest);
  }
}
