import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import {Router} from '@angular/router'
import { HttpConnectorService } from '../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";
//import { ToastrService } from 'ngx-toastr';
import {STATUS_RESP} from '../../constants'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private title: Title,
    private xhr: HttpConnectorService,
    //private toarst: ToastrService,
    private router: Router
  ) {
    this.title.setTitle("Đăng nhập");
  }

  ngOnInit(): void {
    this.setUpForm();
  }

  loginForm: FormGroup;
  message: string = "";
  setUpForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  login() {
    let url = CONSUME_API.USERS.LOGIN;
    this.message = "";
    let param = {
      "userName": this.loginForm.value.userName,
      "password": this.loginForm.value.password
    }
    url += '?' + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        if (res.message === STATUS_RESP.STATUS_OK) {
          this.saveSession(res.result.fullName, res.result.role, res.result.id);
          this.router.navigate(['/cis/customer-management']);
        } else {
          this.message = "Thông tin đăng nhập chưa đúng!!!"
        }
      }
    }, (err) => {

    });
  }

  saveSession(name: string, role: string, id: string){
    sessionStorage.setItem("fullName", name);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("userId", id);    
  }
}
