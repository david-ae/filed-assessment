import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CreditCard } from '../models/creditcard';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  mockServerUrl = 'http://localhost:3000/creditcards/';

  constructor(private http: HttpClient) { }

  getCards(){
    return this.http.get(this.mockServerUrl);
  }

  addCreditCard(creditCard: CreditCard): Observable<CreditCard>{
    return this.http.post(this.mockServerUrl, creditCard)
        .pipe(
          catchError(this.handleError)
        );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
