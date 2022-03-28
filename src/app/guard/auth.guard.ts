import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  data: any;
  validUser = false;
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
   
    let authInfo = {
      authenticated: false
    };

   /*  if (localStorage.getItem("session") == null) {
      authInfo.authenticated = true;
      this.router.navigate(["signup"]);
      return false;
    }
    if (localStorage.getItem("session") != null) {
      authInfo.authenticated = false;
     
      //this.router.navigate(['dashboard']);

      return true;
    } */
    console.log('before','logout');

    if (!this.authService.getToken()) {

      console.log('auth','logout');
      this.authService.logout();
      return false;

    }else{

      let url = environment.baseurl
      const session = localStorage.getItem('session');
      const userid = localStorage.getItem('userid');    
  
      var formdata = new FormData();
      formdata.append('_operation','getCartProductsAndWishListCount');
      formdata.append('_session',session);
      formdata.append('userId',userid);  
  
      this.http.post( url,formdata,{})
      .toPromise()
      .then(response => {
        this.data = response; 
        console.log('check user auth guard', response);
     if( this.data.success == true){
       return true;
     }else{
      this.authService.logout();
      return false;
    }
       
  
      })
      .catch(console.log);
      return true;
    } 

    //return true;
  }

  
}
