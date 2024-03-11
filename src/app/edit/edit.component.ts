import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
<<<<<<< HEAD
=======
  username: any;
  userData: any;
>>>>>>> 9d79fa6012914ea79bfd6fd4983954e3a84c6f3b

  constructor(private userService: UserService){}
  handlerToEditUser(event: any){
    this.userService.updateUser(event.id, event).subscribe(data => {
      // this.Router.navigateByUrl('/list-component');
      alert("Cập nhật Người dùng thành công");
    });
  }
<<<<<<< HEAD
}
=======

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
        avatar: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        gender: ['', Validators.required],
      });
    }

  editUser(){
    console.log(this.username);
    let dataRequest = {
      avatar: this.username.value.avatar,
      name: this.username.value.name,
      username: this.username.value.username,
      gender: this.username.value.gender,
    }
    this.userService.updateUser(this.userData.id, dataRequest).subscribe(data => {
      // this.Router.navigateByUrl('/list-component');
      alert("Cập nhật Người dùng thành công");
    });
  }
}
>>>>>>> 9d79fa6012914ea79bfd6fd4983954e3a84c6f3b
