import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/auth.service";
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }
  ngOnInit(){}
  signUp(f:NgForm){
      this.authService.RegisterUser(f.value.email, f.value.password)      
      .then((res) => {
        alert('usuario registrado')
        this.router.navigate(['login']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}