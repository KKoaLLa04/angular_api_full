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
        this.data = data;
      })
  }
}
