export default class TemaModel {

    #id;
    #nome;
    #Player;
    #TimePlayed;

    constructor(id, nome, Player, TimePlayed) {
        this.#id = id;
        this.#nome = nome;   
        this.#Player = Player;
        this.#TimePlayed = TimePlayed;
    }
    
    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
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

    set nome(value) {
        this.#nome = value;
    }

    set Player(value) { 
        this.#Player = value;
    }

    set TimePlayed(value) {
        this.#TimePlayed = value;
    }
}