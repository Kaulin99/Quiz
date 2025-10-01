export default class PerguntaModel {

    #id;
    #temaId;
    #pergunta;
    #resposta;
    #alternativa1;
    #alternativa2;
    #alternativa3;
    #alternativa4;

    constructor(id, temaId, pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4) {
        this.id = id;
        this.temaId = temaId;   
        this.pergunta = pergunta;
        this.resposta = resposta;
        this.alternativa1 = alternativa1;
        this.alternativa2 = alternativa2;
        this.alternativa3 = alternativa3;
        this.alternativa4 = alternativa4;
    }
    
    get id() {
        return this.#id;
    }

    get temaId() {
        return this.#temaId;
    }

    get pergunta() {
        return this.#pergunta;
    }

    get resposta() {
        return this.#resposta;
    }

    get alternativa1() {
        return this.#alternativa1;
    }

    get alternativa2() {
        return this.#alternativa2;
    }

    get alternativa3() {
        return this.#alternativa3;
    }

    get alternativa4() {
        return this.#alternativa4;
    }

    set id(value) {
        this.#id = value;
    }

    set temaId(value) {
        this.#temaId = value;
    }

    set pergunta(value) { 
        this.#pergunta = value;
    }

    set resposta(value) {
        this.#resposta = value;
    }

    set alternativa1(value) {
        this.#alternativa1 = value;
    }   

    set alternativa2(value) {
        this.#alternativa2 = value;
    }

    set alternativa3(value) {
        this.#alternativa3 = value;
    }

    set alternativa4(value) {
        this.#alternativa4 = value;
    }
}