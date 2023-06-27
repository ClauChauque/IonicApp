import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/auth.service";
import {NgForm} from '@angular/forms';
import { Toast } from '@capacitor/toast';
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

  showHelloToast = async (error:string) => {
    await Toast.show({
      text: error,
    });
  };

  signUp(f:NgForm){
      this.authService.RegisterUser(f.value.email, f.value.password)      
      .then((res) => {
        this.authService.SendVerificationMail()
      }).catch((error) => {
        this.showHelloToast("Hubo un error registrando el usuario") 
      })
  }
}