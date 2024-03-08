import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

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

  onSubmit(){

    if (this.username.invalid) {
      return;
    }
  
    const formData = {
      avatar: this.username.get('avatar')?.value,
      name: this.username.get('name')?.value,
      username: this.username.get('username')?.value,
      gender: this.username.get('gender')?.value,
      // Thêm các trường dữ liệu khác vào đây nếu cần
    };


    this.userService.addUser(formData).subscribe(response => {
      alert("Them san pham thanh cong!");
      this.Router.navigateByUrl('/list-component');
    }
    );
  }
}
