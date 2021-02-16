import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from '../app.state';
import { CreditCard } from '../models/creditcard';
import { PaymentService } from '../services/payment.service';

export interface Config {
  mockServerUrl: string;
  textfile: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  creditCard: Observable<CreditCard>; 
  creditCards$: Observable<any[]>;

  constructor(private router: Router,private store: Store<AppState>) { 
    this.creditCard = this.store.select('creditCard');
  }

  ngOnInit(): void {
  }

  payment(){
    this.router.navigate(['/payment']);
  }  

}
