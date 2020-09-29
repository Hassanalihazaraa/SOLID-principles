import {Engine} from "./Engine";
import {MusicPlayer} from "./MusicPlayer";

class Car {
    private _miles: number = 0;
    private _fuel: number = 0;
    private readonly MAXIMUM_FUEL_CAPACITY: number;
    private readonly FUEL_MILEAGE: number = 10;
    private readonly _musicToggleElement = <HTMLElement>document.querySelector('#music-toggle');
    private readonly _musicSliderElement = <HTMLInputElement>document.querySelector('#music-slider');
    private readonly _engineToggleElement = <HTMLInputElement>document.querySelector('#engine-toggle');
    private readonly _addFuelForm = document.querySelector('#add-fuel-form');
    private readonly _addFuelInput = <HTMLFormElement>document.querySelector('#add-fuel-input');
    private readonly _fuelLevelElement = <HTMLElement>document.querySelector('#fuel-level');
    private readonly _milesElement = <HTMLElement>document.querySelector('#miles-value');
    private readonly _audioElement = <HTMLAudioElement>document.querySelector('#car-music');
    private _musicPlayer: MusicPlayer;
    private _engine: Engine;

    public constructor(MAXIMUM_FUEL_CAPACITY: number) {
        this.MAXIMUM_FUEL_CAPACITY = MAXIMUM_FUEL_CAPACITY;
        this.render();
    }

    get miles(): number {
        return this._miles;
    }

    set miles(value: number) {
        this._miles = value;
    }

    get fuel(): number {
        return this._fuel;
    }

    public addFuel(fuel: number) {
        this._fuel = Math.min(fuel + this._fuel, this.MAXIMUM_FUEL_CAPACITY);
    }

    public drive() {
        if (this._engine.status === false || this._fuel <= 0) {
            return;
        }
        this._fuel -= 1;
        this._miles += this.FUEL_MILEAGE;
    }

    public render() {
        //toggle music
        this._musicToggleElement.addEventListener('click', () => {
            if (this._musicPlayer.volume === 0) {
                this._musicPlayer.turnOn();
                this._musicSliderElement.value = this._musicPlayer.volume.toString();
                this._musicToggleElement.innerText = 'Turn music on';
                return;
            }
            this._musicToggleElement.innerText = 'Turn music off';
            this._musicPlayer.turnOff();
        });
        //music slider
        this._musicSliderElement.addEventListener('input', (event) => {
            let target = <HTMLFormElement>(event.target);
            this._musicPlayer.volume = target.value;
            this._audioElement.volume = this._musicPlayer.volume / 100;

            //@todo when you are repeating the same text over and over again maybe we should have made some constants for it? Can you do improve on this?
            this._musicToggleElement.innerText = this._musicPlayer.volume ? 'Turn music off' : 'Turn music on';
        });
        //engine status
        this._engineToggleElement.addEventListener('click', () => {
            if (this._engine.status) {
                this._engine.turnOff();
                this._engineToggleElement.innerText = 'Turn engine off';
                return;
            }
            this._engineToggleElement.innerText = 'Turn engine on';
            this._engine.turnOn();
        });
        //add fuel
        this._addFuelForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addFuel(Number(this._addFuelInput.value));
            this._fuelLevelElement.innerText = this.fuel.toString();
        });
        //setInterval
        setInterval(() => {
            this.drive();
            this._milesElement.innerText = <string><unknown>(this.miles);
            this._fuelLevelElement.innerText = this.fuel.toString();

            if (this._musicPlayer.volume === 0) {
                this._audioElement.pause();
            } else {
                this._audioElement.play()
            }
        }, 1000);
    }
}

new Car(100);