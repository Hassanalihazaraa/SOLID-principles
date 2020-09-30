"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableDiscount = void 0;
var VariableDiscount = /** @class */ (function () {
    function VariableDiscount(variableDiscount, value) {
        if (value === void 0) { value = 0; }
        this._variableDiscount = 'variable';
        this._noDiscount = 'none';
        this._variableDiscount = variableDiscount;
        this._value = value;
        if (this._variableDiscount != this._noDiscount && value <= 0) {
            throw new Error('You cannot create a ' + this._variableDiscount + ' discount with a negative value');
        }
    }
    VariableDiscount.prototype.apply = function (price) {
        if (this._variableDiscount) {
            return (price - (price * this._value / 100));
        }
        else {
            throw new Error('Invalid type of discount');
        }
    };
    VariableDiscount.prototype.showCalculation = function (price) {
        if (this._variableDiscount) {
            return price + " € -  " + this._value + "%";
        }
        else {
            throw new Error('Invalid type of discount');
        }
    };
    return VariableDiscount;
}());
exports.VariableDiscount = VariableDiscount;
