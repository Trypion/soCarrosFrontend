import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  // url do webservice
  url = 'http://localhost:3000/api/carros';  

  // injetando o httpclient
  constructor(private httpClient: HttpClient) { }

  // headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  }

  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.url).pipe(
      retry(2),
      catchError(this.handleError))
  }

  getCarById(id: string): Observable<Car> {
    return this.httpClient.get<Car>(this.url + '/' + id).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  saveCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(this.url, JSON.stringify(car), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteCar(car: Car) {
    return this.httpClient.delete<Car>(this.url + '/' + car.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message + "lado do cliente";
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }    
    console.log(errorMessage);
    return throwError(error);
  };

}
