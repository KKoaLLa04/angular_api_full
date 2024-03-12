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
      // pagination
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

  searchText:String = '';

  onFilterSearchText(value: string){
    this.searchText = value;
  }

  currentPageData = 1;
  perPage: number = 5;

  totalPagesData: number = 51;
  // totalPagesData(): number {
  //   return Math.ceil(this.data.length / this.perPage); // Tính toán tổng số trang dựa trên số lượng đối tượng trong mảng và số lượng đối tượng trên mỗi trang
  // }

  pageChange(currentPage: number){
    this.currentPageData = currentPage;
  }

  checkDisplayList(i: number){
    let pageMax = (this.currentPageData) * 5; // 1 => 5, 2 => 10
    let pageMin = (this.currentPageData-1) * 5 +1; //1 => 1; 2 => 6

    if(i >= pageMin && i <= pageMax){
      return true;
    }

    return false;
  }
}
