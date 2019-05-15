import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { window } from '@angular/platform-browser/src/facade/browser';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import './gapi.js'
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}
window.gapi.load('client', r => {
  console.log("r")
  console.log(r)
  window.gapi.load('auth2', r => {
    console.log("r")
    console.log(r)
    window.gapi.auth2.init(
      {
        client_id: '899707847621-m53ivndf6u279ap7nuurhvstpd939p3o.apps.googleusercontent.com',
        apiKey: 'AIzaSyASTWXuBtPFxzCREg30FfvBfInnzJ5UFXU'

      }
    ).then(r => {
      console.log("init")
      console.log(r)
      window.gapi.auth2.getAuthInstance().signIn({
        prompt: 'consent'
      }).then(r => {
        console.log("logginf successful")
        console.log(r)

        // window.gapi.client.load("https://shiv-dairy-deepankar.appspot.com/_ah/api/discovery/v1/apis/vendor/v1/rest").then(() => {
          window.gapi.client.load("http://localhost:8080/_ah/api/discovery/v1/apis/vendor/v1/rest").then(r => {
          console.log("api loaded")
          console.log(r)
          console.log(window.gapi.auth2.getAuthInstance().currentUser.get().getId())
          platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
        })
      })
    })
  })
})
// window.gapi.auth2.getAuthInstance().isSignedIn.listen(function (x) {
//   console.log("x")
//   console.log(x)