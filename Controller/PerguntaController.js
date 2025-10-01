<<<<<<< HEAD
import PerguntaService from "../Service/PerguntaService"
import PerguntaModel from "../Model/PerguntaModel"
import {DbHelper} from "../utils/DbHelper"

export default class PerguntaController{
    #service;

    constructor(){
=======
import PerguntaService from "../Service/PerguntaService";
import PerguntaModel from "../Model/PerguntaModel";
import {DbHelper} from "../utils/DbHelper";

export default class PerguntaController {
    #service;

    constructor() {
>>>>>>> d3c00e08fd1cb7462ce0314a1aa30d4da9437a2c
        this.#service = new PerguntaService();
    }

    async GetUnique(id) {
<<<<<<< HEAD
        try {
            return await this.#service.GetUnique(id);
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível obter a pergunta");
        }
    }

    async GetAll(){
        try{
            const dados = await this.#service.GetAll();
            console.log(dados.length);
            return dados || [];
        } catch(error){
=======
        const connection = await DbHelper.GetConnection();
        const query = "SELECT * FROM tbPergunta WHERE id = ?";
        const result = await connection.getFirstAsync(query, [id]);
        return result;
    }
 
    async GetByTema(temaId) {
        try {
            const dados = await this.#service.GetByTema(temaId);
            return dados || [];
        } catch (error) {
            console.error("Erro ao buscar perguntas por tema:", error);
            throw new Error("Não foi possível obter as perguntas do tema");
        }
    }



    async GetAll() {
        try {
            const dados = await this.#service.GetAll();
            console.log(dados.length);
            return dados || [];
        } catch (error) {
>>>>>>> d3c00e08fd1cb7462ce0314a1aa30d4da9437a2c
            console.error(error);
            throw new Error("Não foi possível obter as perguntas");
        }
    }

<<<<<<< HEAD
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
=======
    async Insert( temaId, pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4) {
        try {
            const model = new PerguntaModel(temaId, pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4);
            await this.#service.Insert(model);
            return true;
        } catch (error) {
        console.error(error);
        throw new Error("Não foi possível criar a pergunta");
        }
    }

    async Update(pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4) {
        try {
            console.log("Atualizando pergunta no controller:", { pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4 });
            const model = new PerguntaModel(pergunta, resposta, alternativa1, alternativa2, alternativa3, alternativa4);
            return await this.#service.Update(model);
        } catch (error) {
>>>>>>> d3c00e08fd1cb7462ce0314a1aa30d4da9437a2c
            console.error(error);
            throw new Error("Não foi possível atualizar a pergunta");
        }
    }
<<<<<<< HEAD
    
    async Delete(id){
        try{
            return await this.#service.Delete(id);
        } catch(error){
=======

    async Delete(id) {
        try {
            return await this.#service.Delete(id);
        } catch (error) {
>>>>>>> d3c00e08fd1cb7462ce0314a1aa30d4da9437a2c
            console.error(error);
            throw new Error("Não foi possível deletar a pergunta");
        }
    }
<<<<<<< HEAD


=======
>>>>>>> d3c00e08fd1cb7462ce0314a1aa30d4da9437a2c
}