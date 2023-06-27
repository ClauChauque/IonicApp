import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/auth.service";
import {NgForm} from '@angular/forms';
import { Toast } from '@capacitor/toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}
  ngOnInit() {}

  showHelloToast = async (error:string) => {
    await Toast.show({
      text: error,
    });
  };

  consola(){
    console.log("aca estoy")
  }

  redirectRegister(){
    this.router.navigate(['register']); 
  }

  logIn(f:NgForm) : void {
    this.authService.SignIn(f.value.email, f.value.password)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          console.log("es legal")
          this.router.navigate(['movies-list']);          
        } else {
          this.showHelloToast('Credenciales incorrectas')
          return false;
        }
      }).catch((error) => {
        this.showHelloToast(error.message)
        return
      })
  }
}