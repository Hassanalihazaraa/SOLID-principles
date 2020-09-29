export class Engine {
    private _status: boolean = false;

    get status(): boolean {
        return this._status;
    }

    public turnOn() {
        this._status = true;
    }

    public turnOff() {
        this._status = false;
    }
}