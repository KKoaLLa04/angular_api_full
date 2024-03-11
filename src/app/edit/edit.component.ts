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

  constructor(private userService: UserService){}
  handlerToEditUser(event: any){
    this.userService.updateUser(event.id, event).subscribe(data => {
      // this.Router.navigateByUrl('/list-component');
      alert("Cập nhật Người dùng thành công");
    });
  }
}
