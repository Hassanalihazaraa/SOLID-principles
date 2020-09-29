export class MusicPlayer {
    private _musicLevel: number = 0;
    private _oldMusicLevel: number = 50;

    get volume(): number {
        return this._musicLevel;
    }

    set volume(value: number) {
        this._musicLevel = value;
        this._oldMusicLevel = value;
    }

    public turnOn() {
        this._musicLevel = this._oldMusicLevel;
    }

    public turnOff() {
        this._musicLevel = 0;
    }
}