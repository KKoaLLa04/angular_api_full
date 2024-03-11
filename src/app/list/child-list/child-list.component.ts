import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent {
  @Input() data: any = '';

  constructor(
    private userService: UserService,
    private router: Router
    ){
  }

  deleteUser(id: number){
    let checkSure = confirm("Ban co chac chan muon xoa?");

    if(checkSure){
      this.userService.deleteUser(id).subscribe(data => {
        alert("Xoa nguoi dung thanh cong");
        this.router.navigateByUrl('/list-component');
      })
    }
  }
}
