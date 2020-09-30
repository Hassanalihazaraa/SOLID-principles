import {Discount} from "./Discount";

export class NoDiscount implements Discount {
    private readonly _noDiscount: string = 'none';

    public constructor(noDiscount: string) {
        this._noDiscount = noDiscount;
    }

    public apply(price: number): number {
        if (this._noDiscount === "none") {
            return price;
        } else {
            throw new Error('Invalid type of discount');
        }
    }

    public showCalculation(price: number): string {
        if (this._noDiscount) {
            return "No discount";
        } else {
            throw new Error('Invalid type of discount');
        }
    }
}