import { Component, OnInit } from '@angular/core';
import {Network} from '@capacitor/network';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   
  constructor(
  ) { }

  ngOnInit() {
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });

    this.logCurrentNetworkStatus()
  }
  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    console.log('Network status:', status);
  };

}
