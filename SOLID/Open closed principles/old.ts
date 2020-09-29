interface Animal {
    makeSound(): string;
}

class Dog implements Animal {
    private _name;

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'Dog';
    }

    makeSound(): string {
        return 'Woo Woo';
    }
}

class Cat implements Animal{
    private _name;

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'cat';
    }

    makeSound(): string {
        return 'Miaauw';
    }
}

class Parrot implements Animal{
    private _name;

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'parrot';
    }

    makeSound(): string {
        return 'weird sound';
    }
}

class Lion implements Animal{
    private _name;

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'Lion';
    }

    makeSound(): string {
        return 'wuaaooh';
    }
}

class Zoo {
    private _animals: Array<Animal> = new Array<Animal>();

    public addAnimal(animal: Animal) {
        this._animals.push(animal);
    }

    get animals(): Array<Animal> {
        return this._animals;
    }
}

let zoo = new Zoo;
zoo.addAnimal(new Cat);
zoo.addAnimal(new Dog);
zoo.addAnimal(new Parrot);
zoo.addAnimal(new Lion);

zoo.animals.forEach((animal) => {
    document.querySelector('#target').innerHTML += (animal.type + ": " + animal.makeSound() + "<br>");
});