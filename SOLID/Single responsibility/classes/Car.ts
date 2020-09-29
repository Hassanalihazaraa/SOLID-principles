import {Engine} from "./Engine";
import {MusicPlayer} from "./MusicPlayer";

class Car {
    private _miles: number = 0;
    private _fuel: number = 0;
    private _musicTurnOn: string = 'Turn music on';
    private _musicTurnOff: string = 'Turn music off';
    private readonly MAXIMUM_FUEL_CAPACITY: number;
    private readonly FUEL_MILEAGE: number = 10;
    private readonly _musicToggleElement = <HTMLElement>document.querySelector('#music-toggle');
    private readonly _musicSliderElement = <HTMLInputElement>document.querySelector('#music-slider');
    private readonly _engineToggleElement = <HTMLInputElement>document.querySelector('#engine-toggle');
    private readonly _addFuelForm = <HTMLButtonElement>document.querySelector('#add-fuel-form');
    private readonly _addFuelInput = <HTMLFormElement>document.querySelector('#add-fuel-input');
    private readonly _fuelLevelElement = <HTMLElement>document.querySelector('#fuel-level');
    private readonly _milesElement = <HTMLElement>document.querySelector('#miles-value');
    private readonly _audioElement = <HTMLAudioElement>document.querySelector('#car-music');
    private _musicPlayer: MusicPlayer;
    private _engine: Engine;

    public constructor(MAXIMUM_FUEL_CAPACITY: number, musicPlayer: MusicPlayer, engine: Engine) {
        this.MAXIMUM_FUEL_CAPACITY = MAXIMUM_FUEL_CAPACITY;
        this._engine = engine;
        this._musicPlayer = musicPlayer;
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
                this._musicToggleElement.innerText = this._musicTurnOn;
                return;
            }
            this._musicToggleElement.innerText = this._musicTurnOff;
            this._musicPlayer.turnOff();
        });
        //music slider
        this._musicSliderElement.addEventListener('input', (event) => {
            let target = <HTMLFormElement>(event.target);
            this._musicPlayer.volume = target.value;
            this._audioElement.volume = this._musicPlayer.volume / 100;
            this._musicToggleElement.innerText = this._musicPlayer.volume ? this._musicTurnOff : this._musicTurnOn;
        });
        //engine status
        this._engineToggleElement.addEventListener('click', () => {
            if (this._engine.status) {
                this._engine.turnOff();
                this._engineToggleElement.innerText = this._musicTurnOff;
                return;
            }
            this._engineToggleElement.innerText = this._musicTurnOn;
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

new Car(100, new MusicPlayer(), new Engine());