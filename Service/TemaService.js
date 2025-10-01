import TemaModel from "../Model/TemaModel";
import { TemaDAO } from "../DAO/TemaDAO";

export default class TemaService {
  #dao;

  constructor() {
    this.#dao = new TemaDAO();
  }

  async GetUnique(id) {
    const register = await this.#dao.GetUnique(id);

    if (!register) throw new Error("Não foi possível encontrar o tema");

    return new TemaModel(
      register.id,
      register.nome,  
      register.Player,
      register.TimePlayed
    );
  }

  async GetAll() {
    const registers = await this.#dao.GetAll();

    let models = [];
        
    for(const item of registers){

      const model = new TemaModel(item.id, item.nome, item.Player, item.TimePlayed);

      models.push(model);

    }     
    return models;
  }

  /**
     * Busca um tema pelo ID, incrementa o contador TimePlayed e salva no banco.
     * @param {number} id O ID do tema a ser atualizado.
     */
    async incrementTimePlayed(id) {
        // 1. Busca o tema completo no banco de dados
        const tema = await this.GetUnique(id);
        if (!tema) {
            throw new Error("Tema não encontrado para incrementar o contador.");
        }

        // 2. Incrementa o contador
        tema.TimePlayed += 1;

        // 3. Salva o tema atualizado de volta no banco
        return await this.Update(tema);
    }


  async Insert(model) {
    const result = await this.#dao.Insert(model);
    if (!result) throw new Error("Não foi possível criar o Temastico");
  }

  async Update(model) {
    const result = await this.#dao.Update(model);
    if (!result) throw new Error("Não foi possível atualizar o teminha");
    return result;
  }

  async Delete(id) {
    const result = await this.#dao.Delete(id);
    if (!result) throw new Error("Não foi possível deletar o tema");
    return result;
  }
}