import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'child-edit',
  templateUrl: './child-edit.component.html',
  styleUrls: ['./child-edit.component.scss']
})
export class ChildEditComponent {
  username: any;
  userData: any;

  ngOnInit(): void{
    this.getDetailUser();
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private Router: Router
    ){
    }
    
    getDetailUser(){
      this.route.params.subscribe((dataRoute: any) => {
         this.userService.getDetailUser(dataRoute.id).subscribe(data => {
           this.userData = data;
           this.initForm(this.userData);
         })
      })
    }

    initForm(data: any){
      this.username = this.formBuilder.group({
        avatar: [data.avatar, Validators.required],
        name: [data.name, Validators.required],
        username: [data.username, Validators.required],
        gender: [data.gender, Validators.required],
      });
    }

  // editUser(){
  //   let dataRequest = {
  //     avatar: this.username.value.avatar,
  //     name: this.username.value.name,
  //     username: this.username.value.username,
  //     gender: this.username.value.gender,
  //   }
  //   this.userService.updateUser(this.userData.id, dataRequest).subscribe(data => {
  //     // this.Router.navigateByUrl('/list-component');
  //     alert("Cập nhật Người dùng thành công");
  //   });
  // }

  @Output() dataToEdit = new EventEmitter();

  changeDataToParent(){
    let dataRequest = {
      avatar: this.username.value.avatar,
      name: this.username.value.name,
      username: this.username.value.username,
      gender: this.username.value.gender,
      id: this.userData.id
    }
    this.dataToEdit.emit(dataRequest);
  }
}
