import PerguntaModel from "../Model/PerguntaModel";
import { PerguntaDAO } from "../DAO/PerguntaDAO";

export default class PerguntaService {
  #dao;

  constructor() {
    this.#dao = new PerguntaDAO();
  }

  async GetUnique(id) {
    const register = await this.#dao.GetUnique(id);

    if (!register) throw new Error("Não foi possível encontrar a pergunta");

    return new PerguntaModel(
      register.id,
      register.temaId,  
      register.pergunta,
      register.resposta,
      register.alternativa1,
      register.alternativa2,
      register.alternativa3,
      register.alternativa4
    );
  }

  async GetAll() {
    const registers = await this.#dao.GetAll();

        let models = [];
        
        for(const item of registers){

            const model = new PerguntaModel(item.id, item.temaId, item.pergunta, item.resposta, 
                                            item.alternativa1, item.alternativa2, item.alternativa3, item.alternativa4);

            models.push(model);

        }     
        return models;
    }

  async Insert(model) {
    const result = await this.#dao.Insert(model);
    if (!result) throw new Error("Não foi possível criar a pergunta");
  }

  async Update(model) {
    const result = await this.#dao.Update(model);
    if (!result) throw new Error("Não foi possível atualizar a pergunta");
    return result;
  }

  async Delete(id) {
    const result = await this.#dao.Delete(id);
    if (!result) throw new Error("Não foi possível deletar a pergunta");
    return result;
  }

  async GetByTema(temaId) {
    const registers = await this.#dao.GetByTema(temaId);
    return registers.map(item => new PerguntaModel(
        item.id, item.temaId, item.pergunta, item.resposta,
        item.alternativa1, item.alternativa2, item.alternativa3, item.alternativa4
    ));
    }

}