"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedDiscount = void 0;
var FixedDiscount = /** @class */ (function () {
    function FixedDiscount(fixedDiscount, value) {
        if (value === void 0) { value = 0; }
        this._fixedDiscount = 'fixed';
        this._noDiscount = 'none';
        this._fixedDiscount = fixedDiscount;
        this._value = value;
        if (this._fixedDiscount != this._noDiscount && value <= 0) {
            throw new Error('You cannot create a ' + this._fixedDiscount + ' discount with a negative value');
        }
    }
    FixedDiscount.prototype.apply = function (price) {
        if (this._fixedDiscount) {
            return Math.max(0, price - this._value);
        }
        else {
            throw new Error('Invalid type of discount');
        }
    };
    FixedDiscount.prototype.showCalculation = function (price) {
        if (this._fixedDiscount) {
            return price + "€ -  " + this._value + "€ (min 0 €)";
        }
        else {
            throw new Error('Invalid type of discount');
        }
    };
    return FixedDiscount;
}());
exports.FixedDiscount = FixedDiscount;
