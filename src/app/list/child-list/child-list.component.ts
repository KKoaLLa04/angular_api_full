import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent {
  @Input() data: any = '';

  modalRef?: BsModalRef;
  username: FormGroup;
  message?: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    ){
      this.username = this.formBuilder.group({
        avatar: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        gender: ['', Validators.required],
        date_of_study: ['', Validators.required],
        block1: [false],
        block2: [false],
        status: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20) , Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()/.=+]).{6,20}")]],
        age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        date: ['', Validators.required],
      });
    }

  // handle search
  searchText:String = '';

  onFilterSearchText(value: string){
    this.searchText = value;
  }

  // handle pagination
  currentPageData = 1;
  perPage: number = 5;

  totalPagesData: number = 11;

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

  
  // checkbox block
  blockArr = [
    {id:1,name:"Kỳ 1", isSelected: true},
    {id:2,name:"Kỳ 2", isSelected: false},
    {id:3,name:"Kỳ 3", isSelected: false},
  ];

  onChange(event: any){
    console.log(event.target.value);
  }

  // modal
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  // add
  changeDataToParent(){
    // Block fix cứng tạm thời
    interface UserDataRequest {
      avatar: string;
      name: string;
      username: string;
      gender: string;
      date_of_study: string;
      block1: boolean;
      block2: boolean;
      status: string;
      password: string;
      age: number;
      date: string;
    }
    let dataRequest: UserDataRequest = {
      avatar: this.username.value.avatar,
      name: this.username.value.name,
      username: this.username.value.username,
      gender: this.username.value.gender,
      date_of_study: this.username.value.date_of_study,
      block1: this.username.value.block1,
      block2: this.username.value.block2,
      status: this.username.value.status,
      password: this.username.value.password,
      age: this.username.value.age,
      date: this.username.value.date,
    }

    return dataRequest;
  }

  submitForm(){
    if(this.username.valid){
      let data = this.changeDataToParent();
      this.userService.addUser(data).subscribe(response => {
        alert("Thêm sản phẩm thành công!");
        window.location.reload();
      })
    }else{
      this.markFormGroupAsTouched(this.username);
    }
  }
// add
  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // show status list
  // edit
  userData: any;
  idEdit: number = 0;

  openEditModal(template: TemplateRef<void>, itemId:number) {
    interface UserData {
      avatar: string;
      name: string;
      username: string;
      gender: string;
      date_of_study: string;
      block: boolean[];
      status: string;
      password: string;
      age: number;
      date: string;
    }
    
    this.modalRef = this.modalService.show(template);
    this.idEdit = itemId;
    this.getDetailUser(itemId);
  }

  initFormEdit(data: any){
    this.username = this.formBuilder.group({
      avatar: [data.avatar, Validators.required],
      name: [data.name, Validators.required],
      username: [data.username, Validators.required],
      gender: [data.gender, Validators.required],
      date_of_study: [data.date_of_study, Validators.required],
      block: [data.block, Validators.required],
      status: [data.status, Validators.required],
      password: [data.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20) , Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()/.=+]).{6,20}")]],
      age: [data.age, [Validators.required, Validators.min(1), Validators.max(100)]],
      date: [data.date, Validators.required],
    });
  }

  getDetailUser(idItem: number){
    this.userService.getDetailUser(idItem).subscribe(data => {
      this.userData = data;
      console.log(this.userData);
      this.initFormEdit(this.userData);
    })
  }

  submitFormEdit(){
    if(this.username.valid){
      // add
      let data = this.changeDataToParent();
      this.userService.updateUser(this.idEdit, data).subscribe(response => {
        alert("Cập nhật sản phẩm thành công!");
        window.location.reload();
      })
    }else{
      this.markFormGroupAsTouched(this.username);
    }
  }

  // delete
  openModalDetete(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(id: number): void {
    // this.message = 'Confirmed!';
    // this.modalRef?.hide();
    this.userService.deleteUser(id).subscribe(data => {
      alert("Xoa nguoi dung thanh cong");
      window.location.reload();
    })
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
}
