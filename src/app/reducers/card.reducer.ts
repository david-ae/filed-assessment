import { Action } from '@ngrx/store'
import { CreditCard } from '../models/creditcard';
import * as CardActions from './../actions/card.actions'

const initialState : CreditCard = {
    id: 0,
    cardNumber: 'No Card Added',
    cardHolder: 'No Card Added',
    amount: 0.0,
    expirationDate: '00/00',
    securityCode: 123
}

export function reducer(state: CreditCard = initialState, action: CardActions.CreditCardActions){
    
    switch(action.type){

        case CardActions.HOLD_CARD:
            state = action.payload;
            return state;

        default:
            return state;
    }
}