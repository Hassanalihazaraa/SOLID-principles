import {Discount} from "./Discount";

export class FixedDiscount implements Discount{
    private readonly _fixedDiscount: string = 'fixed';
    private readonly _noDiscount: string = 'none';
    private _value: number;

    public constructor(fixedDiscount: string, value: number = 0) {
        this._fixedDiscount = fixedDiscount;
        this._value = value;

        if (this._fixedDiscount != this._noDiscount && value <= 0) {
            throw new Error('You cannot create a ' + this._fixedDiscount + ' discount with a negative value');
        }
    }

    public apply(price: number): number {
        if(this._fixedDiscount) {
            return Math.max(0, price - this._value);
        } else {
            throw new Error('Invalid type of discount');
        }
    }

    showCalculation(price: number): string {
        if(this._fixedDiscount) {
            return price + "€ -  "+ this._value +"€ (min 0 €)";
        } else {
            throw new Error('Invalid type of discount');
        }
    }
}