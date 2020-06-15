import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  // url do webservice
  url = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) { }

  // headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  }  

  //registra um usuario
  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, JSON.stringify(user), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //login um usuario
  loginUser(user: User): Observable<boolean> {
    return this.httpClient.post<boolean>(this.url + '/login', JSON.stringify(user), this.httpOptions).pipe(
      retry(2),
      tap(val => this.isLoggedIn = true),
      catchError(this.handleError)
    )
  }  

  //logout um usuario
  logoutUser(): Observable<boolean>{
    return this.httpClient.get<boolean>(this.url + '/logout', this.httpOptions).pipe(
      retry(2),
      tap(val => this.isLoggedIn = false),
      catchError(this.handleError)
    )
  }

  getIsAuth(){
    return this.isLoggedIn;
  }

  //logout user
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message + "lado do cliente";
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}` + ' lado do servidor';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
