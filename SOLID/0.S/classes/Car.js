"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car(MAXIMUM_FUEL_CAPACITY) {
        this._miles = 0;
        this._fuel = 0;
        this.FUEL_MILEAGE = 10;
        this.MAXIMUM_FUEL_CAPACITY = MAXIMUM_FUEL_CAPACITY;
    }
    Object.defineProperty(Car.prototype, "miles", {
        get: function () {
            return this._miles;
        },
        set: function (value) {
            this._miles = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "fuel", {
        get: function () {
            return this._fuel;
        },
        set: function (fuel) {
            this._fuel = Math.min(fuel + this._fuel, this.MAXIMUM_FUEL_CAPACITY);
        },
        enumerable: false,
        configurable: true
    });
    Car.prototype.drive = function (engine) {
        if (engine.engineStatus === false || this._fuel <= 0) {
            return;
        }
        this._fuel -= 1;
        this._miles += this.FUEL_MILEAGE;
    };
    return Car;
}());
exports.Car = Car;
