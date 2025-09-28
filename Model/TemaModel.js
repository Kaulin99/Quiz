export default class TemaModel {

    #id;
    #name;
    #Player;
    #TimePlayed;

    constructor(id ="", name="", Player = "", TimePlayed = 0) {
        this.#id = id;
        this.#name = name;
        this.#Player = Player;
        this.#TimePlayed = TimePlayed;
    }
    
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get Player() {
        return this.#Player;
    }

    get TimePlayed() {
        return this.#TimePlayed;
    }

    set id(value) {
        this.#id = value;
    }

    set name(value) {
        this.#name = value;
    }

    set Player(value) { 
        this.#Player = value;
    }

    set TimePlayed(value) {
        this.#TimePlayed = value;
    }
}