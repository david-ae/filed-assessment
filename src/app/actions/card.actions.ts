import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { CreditCard } from '../models/creditcard';

export const HOLD_CARD = '[HOLD] Card';

export class HoldCard implements Action{
    readonly type = HOLD_CARD

    constructor(public payload: CreditCard){}
}

export type CreditCardActions = HoldCard