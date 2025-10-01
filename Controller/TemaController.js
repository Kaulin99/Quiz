import TemaService from "../Service/TemaService";
import TemaModel from "../Model/TemaModel";
import {DbHelper} from "../utils/DbHelper";

export default class TemaController {
    #service;

    constructor() {
        this.#service = new TemaService();
    }

    async GetUnique(id) {
        const connection = await DbHelper.GetConnection();
        const query = "SELECT * FROM tbtema WHERE id = ?";
        const result = await connection.getFirstAsync(query, [id]);
        return result;
    }

    async GetAll() {
        try {
            const dados = await this.#service.GetAll();
            console.log(dados.length);
            return dados || [];
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível obter os temas");
        }
    }

    async Insert(nome, Player) {
        try {
            const model = new TemaModel("", nome, Player, 0);
            await this.#service.Insert(model);
            return true;
        } catch (error) {
        console.error(error);
        throw new Error("Não foi possível criar o tema");
        }
    }

    async Update(id, nome, Player) {
        try {
            console.log("Atualizando tema no controller:", { id, nome, Player });
            const model = new TemaModel(id, nome, Player, 0);
            return await this.#service.Update(model);
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível atualizar o tema");
        }
    }

    async Delete(id) {
        try {
            return await this.#service.Delete(id);
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível deletar o tema");
        }
    }
}