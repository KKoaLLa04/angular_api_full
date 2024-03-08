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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ){
      this.username = this.formBuilder.group({
        avatar: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        gender: ['', Validators.required],
      });

      this.getDetailUser();
    }

    getDetailUser(){
      this.route.params.subscribe((dataRoute: any) => {
         this.userService.getDetailUser(dataRoute.id).subscribe(data => {
           this.userData = data;
         })
      })
    }

  onSubmit(){
  
  }
}
