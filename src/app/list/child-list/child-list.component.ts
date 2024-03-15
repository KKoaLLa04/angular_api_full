import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddComponent } from 'src/app/add/add.component';
import { EditComponent } from 'src/app/edit/edit.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss'],
})
export class ChildListComponent implements OnChanges {
  @Input() data: any;
  dataShow:any[] = [];

  // modalRef?: BsModalRef;
  username!: FormGroup;
  message?: string;
  today: Date = new Date();
  formattedToday: string = '2024-03-14';

  @Output() reloadData = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private modalRef: BsModalRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onFilterSearchText("");
  }

  // handle search
  searchText: String = '';

  onFilterSearchText(value: string) {
    // Chuyển đổi searchText sang chữ thường để tìm kiếm không phân biệt hoa thường
    const searchLower = value.toLowerCase();
    
    // Sử dụng phương thức filter để lọc mảng dựa trên name hoặc username
    this.dataShow = this.data.filter((item:any) => {
      // Chuyển đổi name và username sang chữ thường để so sánh không phân biệt hoa thường
      const nameLower = item.name.toLowerCase();
      const usernameLower = item.username.toLowerCase();
      
      // Trả về true nếu name hoặc username chứa searchText
      return nameLower.includes(searchLower) || usernameLower.includes(searchLower);
    });
  }

  // handle pagination
  currentPageData = 1;
  perPage: number = 5;

  totalPagesData: number = 11;

  pageChange(currentPage: number) {
    this.currentPageData = currentPage;
  }

  checkDisplayList(i: number) {
    let pageMax = this.currentPageData * 5; // 1 => 5, 2 => 10
    let pageMin = (this.currentPageData - 1) * 5 + 1; //1 => 1; 2 => 6

    // if(i >= pageMin && i <= pageMax){
    //   return true;
    // }

    // return false;
    return i >= pageMin && i <= pageMax;
  }

  // add student modal
  openModal() {
    this.modalRef = this.modalService.show(AddComponent, {});

    this.modalRef.onHidden?.subscribe((res:any) => {
      this.checkChangeData(res.id == 1);
    })
  }

  // edit student modal
  openEditModal(itemId: number) {
    const initialState: {itemId:number} = {
      itemId: itemId,
    };
    this.modalRef = this.modalService.show(EditComponent, { initialState });
  }

  // delete student modal
  openModalDetete(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(id: number): void {
    this.userService.deleteUser(id).subscribe((data) => {
      window.location.reload();
    });
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  checkChangeData(value:boolean){
    this.reloadData.emit(value);
  }

  searchData(){

  }

  
}
