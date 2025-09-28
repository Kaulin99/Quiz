import TemaModel from "../Model/TemaModel";
import { TemaDAO } from "../DAO/TemaDAO";

export default class TemaService {

    #dao;

    constructor() { 
        this.#dao = new TemaDAO();
    }

    async GetUnique (id) {
        const register = await this.#dao.GetUnique(id);

        if(!register) throw new Error("Não foi possível encontrar o tema");

        const tema = new TemaModel(register.id, register.name);

        return tema;
    }

    async GetAll() {

        const dados = await this.#dao.GetAll();
        let models = [];

        for(const item of dados){
            const model = new TemaModel(item.id, item.name,item.Player,item.TimePlayed);
            models.push(model);
        }

        return models;
    }

    async Create(model) {
        const result = this.#dao.Create(model)

        if(!result) throw new Error("Não foi possível criar o tema");

        return result;
    }

    async Update(model) {
        const result = this.#dao.Update(model)

        if(!result) throw new Error("Não foi possível atualizar o tema");

        return result;
    }
}