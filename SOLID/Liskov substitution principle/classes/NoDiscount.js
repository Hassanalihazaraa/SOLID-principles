"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoDiscount = void 0;
var NoDiscount = /** @class */ (function () {
    function NoDiscount(noDiscount) {
        this._noDiscount = 'none';
        this._noDiscount = noDiscount;
    }
    NoDiscount.prototype.apply = function (price) {
        if (this._noDiscount === "none") {
            return price;
        }
        else {
            throw new Error('Invalid type of discount');
        }
    };
    NoDiscount.prototype.showCalculation = function (price) {
        if (this._noDiscount) {
            return "No discount";
        }
        else {
            throw new Error('Invalid type of discount');
        }
    };
    return NoDiscount;
}());
exports.NoDiscount = NoDiscount;
