import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private Router: Router,
    ){
      // pagination
      this.username = this.formBuilder.group({
        avatar: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        gender: ['', Validators.required],
        date_of_study: ['', Validators.required],
        block: ['', Validators.required],
        status: ['', Validators.required],
        password: ['', Validators.required],
        age: ['', Validators.required],
      });
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

  

  // modal
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  initForm(data: any){
    this.username = this.formBuilder.group({
      avatar: [data.avatar, Validators.required],
      name: [data.name, Validators.required],
      username: [data.username, Validators.required],
      gender: [data.gender, Validators.required],
    });
  }

  changeDataToParent(){
    let dataRequest = {
      avatar: this.username.value.avatar,
      name: this.username.value.name,
      username: this.username.value.username,
      gender: this.username.value.gender,
    }
  }

  submitForm(){
    if(this.username.valid){

    }else{
      this.markFormGroupAsTouched(this.username);
    }
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
