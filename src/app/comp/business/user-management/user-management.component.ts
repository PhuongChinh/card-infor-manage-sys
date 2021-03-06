import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import {role} from '../../../service/services/constant';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { CONSUME_API } from 'src/app/service/services/consume-apis';
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(
    private titleService: Title,
    private xhr: HttpConnectorService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.titleService.setTitle("Quản lí nhân viên");
  }

  ngOnInit(): void {
    this.checkIfAdmin();
    this.setUpForm();
    this.getAllUser();
  }

  newUserRole: string = role.WORKER;
  selectOption(event: any) {
    this.newUserRole = event;
  }

  lstUser: any = [];
  // create new user
  formCreateNewUser: FormGroup;
  setUpForm(){
    this.formCreateNewUser = new FormGroup({
      name: new FormControl('', []),
      userName: new FormControl('', []),
      password: new FormControl('', []),
      phone: new FormControl('', [])
    })
  }
  createNewUser(){
    this.spinner.show();
    let url = CONSUME_API.USERS.USERS;
    let body = {
      'userName': this.formCreateNewUser.value.userName,
      'fullName': this.formCreateNewUser.value.name,
      'password': this.formCreateNewUser.value.password,
      'phone': this.formCreateNewUser.value.phone,
      'role': this.newUserRole,
      'status': false
    }
    this.xhr.post(url,body).subscribe((res: any) => {
      if (res) {
        this.getAllUser();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  getAllUser(){
    this.spinner.show();
    let url = CONSUME_API.USERS.USERS;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        console.log("user: ",res);
        this.lstUser = res._embedded.users;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  seeWorkingDetail(userId: string) {
    this.router.navigate(['/cis/each-user-working-management/',userId]);
  }

  checkIfAdmin(){
    let role = sessionStorage.getItem("role");
    if (role === "WORKER" || role === null){
      sessionStorage.clear();
      this.router.navigate(['/cis/login']);
    }
  }
  currentPage: number = 0;

  isEdited: boolean = false;
  editedUserId: string;
  setUser(user: any) { 
    this.editedUserId = user.id;
    this.formCreateNewUser.setValue({
      name: user.fullName, 
      userName: user.userName,
      password: user.password,
      phone: user.phone
    });
    this.newUserRole = user.role;
    this.isEdited = true;
  }

  updateUser(){
    this.spinner.show();
    let url = CONSUME_API.USERS.USERS + "/" + this.editedUserId;
    let body = {
      'userName': this.formCreateNewUser.value.userName,
      'fullName': this.formCreateNewUser.value.name,
      'password': this.formCreateNewUser.value.password,
      'phone': this.formCreateNewUser.value.phone,
      'role': this.newUserRole
    }
    this.xhr.patch(url,body).subscribe((res: any) => {
      if (res) {
        this.getAllUser();
        this.isEdited = false;
        this.formCreateNewUser.reset();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }
  deleteUser() {
    this.spinner.show();
    let url = CONSUME_API.USERS.USERS + "/" + this.editedUserId;
    this.xhr.delete(url).subscribe((res: any) => {
      if (res) {
        this.getAllUser();
        this.spinner.hide();
      }
      this.getAllUser();
    }, (err) => {

    });
  }
  setCreateNew(){
    this.isEdited = false;
    this.formCreateNewUser.reset();
  }
}
