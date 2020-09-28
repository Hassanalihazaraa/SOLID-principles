export class Engine {
    private _engineStatus: boolean = false;

    get status(): boolean {
        return this._engineStatus;
    }

    public turnOn() {
        this._engineStatus = true;
    }

    public turnOff() {
        this._engineStatus = false;
    }
}