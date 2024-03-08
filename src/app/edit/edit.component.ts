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
           console.log(this.userData);
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

  editUser(){
    this.userService.updateUser(this.userData.id, this.userData).subscribe(data => {
      // this.Router.navigateByUrl('/list-component');
      alert("Cập nhật Người dùng thành công");
    });
  }
}
