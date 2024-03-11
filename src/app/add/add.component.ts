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

  handlerToAddUser(formData: any){
      this.userService.addUser(formData).subscribe(reponse => {
        alert("Them san pham thanh cong!");
        this.router.navigateByUrl('/list-component')
      })
  }
}
