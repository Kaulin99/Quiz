import StandardDAO from "./StandardDAO";
import { DbHelper } from '../utils/DbHelper';

export class PerguntaDAO extends StandardDAO{

    constructor(){
        super("tbPergunta");
    }

    async Insert(model){
        
        const connection = await DbHelper.GetConnection();
        console.log("Inserindo no banco, tabela:", this.dbName);
        console.log(connection);

        const query = "insert into " + this.dbName + 
        " (temaId, perguntas, alternativa1, alternativa2, alternativa3, alternativa4, resposta) VALUES (?, ?, ?, ?, ?, ?, ?)  ";

        const result = await connection.runAsync(query, [model.temaId, model.perguntas, model.alternativa1, model.alternativa2,
                                                         model.alternativa3, model.alternativa4, model.resposta]);

        return result.changes == 1;
    }

    async Update(model) {
    const connection = await DbHelper.GetConnection();
    const query = "UPDATE " + this.dbName + 
        " SET temaId = ?, perguntas = ?, alternativa1 = ?, alternativa2 = ?, alternativa3 = ?, alternativa4 = ?, resposta = ? WHERE id = ?";

    const result = await connection.runAsync(query, [model.temaId, model.perguntas, model.alternativa1, model.alternativa2, 
                                                     model.alternativa3, model.alternativa4, model.resposta, model.id]);

    await connection.closeAsync();

    return result.changes === 1;
    }
}