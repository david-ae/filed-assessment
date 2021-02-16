import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CreditCard } from './../models/creditcard';
import { AppState } from './../app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as CardActions from './../actions/card.actions';
import { PaymentService } from '../services/payment.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit, OnDestroy {
  paymentForm: FormGroup;  
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store<AppState>, 
    private toastr: ToastrService, private paymentService: PaymentService,
    private router: Router) {   
  }  

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      creditcardnumber: ['', [Validators.required]],
      cardholder: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      expdate: ['', [Validators.required]],
      cvv: ['', [Validators.maxLength(3)]]
    });
  }

  addCreditCard(){
    let creditCardNumber = this.paymentForm.get('creditcardnumber').value;
    let cardHolder = this.paymentForm.get('cardholder').value;
    let expdate = this.paymentForm.get('expdate').value;
    let amount = this.paymentForm.get('amount').value;    
    let cvv = this.paymentForm.get('cvv').value;

    let randomId = Math.floor(Math.random() * Math.floor(100));
    
    this.paymentService.addCreditCard(
      {id: randomId,cardNumber: creditCardNumber, cardHolder: cardHolder, 
        amount: amount, expirationDate: expdate, securityCode: cvv})
        .pipe(takeUntil(this.destroy$))
        .subscribe(()=>{
          this.store.dispatch(new CardActions.HoldCard(
            {
              id: randomId,
              cardNumber: creditCardNumber, 
              cardHolder: cardHolder, 
              amount: amount, 
              expirationDate: expdate, 
              securityCode: cvv        
            }
          ));

          this.toastr.success("New Card Added");
          this.paymentForm.reset();
        });    
  }

  back(){
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  numberOnly(event){
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
  }
}
