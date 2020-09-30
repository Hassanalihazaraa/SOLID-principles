import {Discount} from "./Discount";

export class VariableDiscount implements Discount {
    private readonly _variableDiscount: string = 'variable';
    private readonly _noDiscount: string = 'none';
    private _value: number;

    public constructor(variableDiscount: string, value: number = 0) {
        this._variableDiscount = variableDiscount;
        this._value = value;

        if (this._variableDiscount != this._noDiscount && value <= 0) {
            throw new Error('You cannot create a ' + this._variableDiscount + ' discount with a negative value');
        }
    }

    public apply(price: number): number {
        if (this._variableDiscount) {
            return (price - (price * this._value / 100));
        } else {
            throw new Error('Invalid type of discount');
        }
    }

    showCalculation(price: number): string {
       if (this._variableDiscount) {
            return price + " € -  " + this._value + "%";
        } else {
            throw new Error('Invalid type of discount');
        }
    }
}