import PerguntaService from "../Service/PerguntaService"
import PerguntaModel from "../Model/PerguntaModel"
import {DbHelper} from "../utils/DbHelper"

export default class PerguntaController{
    #service;

    constructor(){
        this.#service = new PerguntaService();
    }

    async GetUnique(id) {
        try {
            return await this.#service.GetUnique(id);
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível obter a pergunta");
        }
    }

    async GetByTema(temaId) {
        try {
            return await this.#service.GetByTema(temaId);
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível obter as perguntas do tema");
        }
    }


    async GetAll(){
        try{
            const dados = await this.#service.GetAll();
            console.log(dados.length);
            return dados || [];
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível obter as perguntas");
        }
    }

    async Insert(pergunta, alternativa1, alternativa2, alternativa3, alternativa4, resposta, temaId){
        try{
            const model = new PerguntaModel("", temaId, pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4);
            await this.#service.Insert(model);
            return true;
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível criar a pergunta");
        }
    }

    async Update(id, pergunta, alternativa1, alternativa2, alternativa3, alternativa4, resposta, temaId){
        try{
            console.log("Atualizando pergunta no controller:", {id, temaId, pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4});
            const model = new PerguntaModel(id, temaId, pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4);
            return await this.#service.Update(model);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível atualizar a pergunta");
        }
    }
    
    async Delete(id){
        try{
            return await this.#service.Delete(id);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível deletar a pergunta");
        }
    }


}