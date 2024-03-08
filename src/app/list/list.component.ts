import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  data: any;
  constructor(
    private userService: UserService,
    ){
      this.userService.getData().subscribe(data => {
        console.warn(data);
        this.data = data;
      })
  }

  deleteUser(id: number){
    let checkSure = confirm("Ban co chac chan muon xoa?");

    if(checkSure){
      this.userService.deleteUser(id).subscribe(data => {
        alert("Xoa nguoi dung thanh cong");
      })
    }
  }
}
