import TemaService from "../Service/TemaService";
import TemaModel from "../Model/TemaModel";

export default class TemaController {

    #service;

    constructor() {
        this.#service = new TemaService();
    }

    async GetUnique(id) {
    try {
        return await this.#service.GetUnique(id);
    } catch (error) {
        console.error(error);
        throw new Error("Não foi possível obter o tema");
    }
  }

    async GetAll(){
        try{
            const dados = await this.#service.GetAll();

            console.log(dados.length);

            return dados || [];
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível obter os temas");
        }
    }

    async Insert(name, Player, TimePlayed) {
        try {
            const model = new TemaModel("", name, Player, TimePlayed);

            const result = await this.#service.Create(model);

            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível criar o tema");
        }
    }

    async Update(id, name, Player, TimePlayed) {
        try {
            const model = new TemaModel(id, name, Player, TimePlayed);

            const result = await this.#service.Update(model);

            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível atualizar o tema");
        }
    }

    async Delete(id) {
        try {
            const result = await this.#service.Delete(id);
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível deletar o tema");
        }
    }
}