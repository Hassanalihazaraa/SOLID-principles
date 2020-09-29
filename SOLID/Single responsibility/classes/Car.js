"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = require("./Engine");
var MusicPlayer_1 = require("./MusicPlayer");
var Car = /** @class */ (function () {
    function Car(MAXIMUM_FUEL_CAPACITY, musicPlayer, engine) {
        this._miles = 0;
        this._fuel = 0;
        this._musicTurnOn = 'Turn music on';
        this._musicTurnOff = 'Turn music off';
        this.FUEL_MILEAGE = 10;
        this._musicToggleElement = document.querySelector('#music-toggle');
        this._musicSliderElement = document.querySelector('#music-slider');
        this._engineToggleElement = document.querySelector('#engine-toggle');
        this._addFuelForm = document.querySelector('#add-fuel-form');
        this._addFuelInput = document.querySelector('#add-fuel-input');
        this._fuelLevelElement = document.querySelector('#fuel-level');
        this._milesElement = document.querySelector('#miles-value');
        this._audioElement = document.querySelector('#car-music');
        this.MAXIMUM_FUEL_CAPACITY = MAXIMUM_FUEL_CAPACITY;
        this._engine = engine;
        this._musicPlayer = musicPlayer;
        this.render();
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
        enumerable: false,
        configurable: true
    });
    Car.prototype.addFuel = function (fuel) {
        this._fuel = Math.min(fuel + this._fuel, this.MAXIMUM_FUEL_CAPACITY);
    };
    Car.prototype.drive = function () {
        if (this._engine.status === false || this._fuel <= 0) {
            return;
        }
        this._fuel -= 1;
        this._miles += this.FUEL_MILEAGE;
    };
    Car.prototype.render = function () {
        var _this = this;
        //toggle music
        this._musicToggleElement.addEventListener('click', function () {
            if (_this._musicPlayer.volume === 0) {
                _this._musicPlayer.turnOn();
                _this._musicSliderElement.value = _this._musicPlayer.volume.toString();
                _this._musicToggleElement.innerText = _this._musicTurnOn;
                return;
            }
            _this._musicToggleElement.innerText = _this._musicTurnOff;
            _this._musicPlayer.turnOff();
        });
        //music slider
        this._musicSliderElement.addEventListener('input', function (event) {
            var target = (event.target);
            _this._musicPlayer.volume = target.value;
            _this._audioElement.volume = _this._musicPlayer.volume / 100;
            _this._musicToggleElement.innerText = _this._musicPlayer.volume ? _this._musicTurnOff : _this._musicTurnOn;
        });
        //engine status
        this._engineToggleElement.addEventListener('click', function () {
            if (_this._engine.status) {
                _this._engine.turnOff();
                _this._engineToggleElement.innerText = _this._musicTurnOff;
                return;
            }
            _this._engineToggleElement.innerText = _this._musicTurnOn;
            _this._engine.turnOn();
        });
        //add fuel
        this._addFuelForm.addEventListener('submit', function (event) {
            event.preventDefault();
            _this.addFuel(Number(_this._addFuelInput.value));
            _this._fuelLevelElement.innerText = _this.fuel.toString();
        });
        //setInterval
        setInterval(function () {
            _this.drive();
            _this._milesElement.innerText = (_this.miles);
            _this._fuelLevelElement.innerText = _this.fuel.toString();
            if (_this._musicPlayer.volume === 0) {
                _this._audioElement.pause();
            }
            else {
                _this._audioElement.play();
            }
        }, 1000);
    };
    return Car;
}());
new Car(100, new MusicPlayer_1.MusicPlayer(), new Engine_1.Engine());
