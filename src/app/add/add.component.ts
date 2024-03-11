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

  constructor(
    private userService: UserService,
    private router: Router
    ){}

<<<<<<< HEAD
  handlerToAddUser(formData: any){
      this.userService.addUser(formData).subscribe(reponse => {
        alert("Them san pham thanh cong!");
        this.router.navigateByUrl('/list-component')
      })
=======
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
>>>>>>> 9d79fa6012914ea79bfd6fd4983954e3a84c6f3b
  }
}
