import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient,} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  user1: any ={publicid:"512d3a435929400d01b2f59431d6e42d"} // dealer

  constructor(  private http: HttpClient,) { }

  url="https://jsonplaceholder.typicode.com/posts"


  signupdelar(){
    // const Headers = new HttpHeaders({
    //   'content-type': 'application/json',
    //   'rajesh': 'saha',
    // });
    const headers = {'Content-Type': 'Access-Control-Allow-Origin:*'};
  //   const params = new URLSearchParams(
  //     this.user1
  //   );
  //   const data=(params.toString());
  //   // let data= this.user
  //   // console.log("dadadada",data)
  // return  this.http.post( this.url.concat(data),{headers: Headers})

  //  return this.http.get(this.url,{headers: Headers})
  return this.http.post(this.url,{headers: headers})


  }

  data: any;
  result: any;

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(logindata,options): Observable<any> {

    var formdata = new FormData();
    formdata.append('_operation','login');
    formdata.append('username',logindata.username);
    formdata.append('password',logindata.password);

    return this.http.post<any>(logindata.url + '/modules/Mobile/api.php', formdata, options).pipe(
      tap((logindata: any) => console.log(`logindata`)),
      catchError(this.handleError<any>('login'))
    );
  }

}
