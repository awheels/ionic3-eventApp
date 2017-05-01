import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.zone = new NgZone({});

    firebase.initializeApp({
      apiKey: "AIzaSyCwKC-fR2F-tGwDfu2bk3xkh259pEHG2vQ",
      authDomain: "testproject-eed29.firebaseapp.com",
      databaseURL: "https://testproject-eed29.firebaseio.com",
      projectId: "testproject-eed29",
      storageBucket: "testproject-eed29.appspot.com",
      messagingSenderId: "56049499377"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => { 
      this.zone.run( () => {
        if (!user) { 
          this.rootPage = 'login'; 
          unsubscribe();
        }else{
          this.rootPage = HomePage; unsubscribe();
        } 
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}