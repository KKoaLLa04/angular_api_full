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

  ngOnInit(): void{
    this.getDetailUser();
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ){
    }

    getDetailUser(){
      this.route.params.subscribe(dataRoute => {
         this.userService.getDetailUser(dataRoute['id']).subscribe(data => {
          console.log(this.username);
          this.username = data;
         })
      })
    }

  onSubmit(){
  
  }
}
