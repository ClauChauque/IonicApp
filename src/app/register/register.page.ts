import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() { 

  }

  ngOnInit() {
  }

  async onRegister(f:NgForm) {
    try {
    const data=f.value; //email,password
    // const user= await this.authSvc.register(data.email,data.password);
    // if(user){
    //   console.log(user);
    // }
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  

}
