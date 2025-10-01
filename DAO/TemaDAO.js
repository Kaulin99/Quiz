import StandardDAO from "./StandardDAO";
import { DbHelper } from '../utils/DbHelper';

export class TemaDAO extends StandardDAO {

    constructor() {
        super("tbtema"); // garante que o DAO saiba o nome da tabela
    }

    async Insert(model){
        
        const connection = await DbHelper.GetConnection();
        console.log("Inserindo no banco, tabela:", this.dbName);
        console.log(connection);

        const query = "insert into " + this.dbName + " (nome, Player, TimePlayed) VALUES (?, ?, ?)  ";

        const result = await connection.runAsync(query, [model.nome, model.Player, model.TimePlayed]);
        
        return result.changes == 1;
    }

    async Update(model) {
    const connection = await DbHelper.GetConnection();
    const query = "UPDATE " + this.dbName + " SET nome = ?, Player = ? WHERE id = ?";

    const result = await connection.runAsync(query, [model.nome, model.Player, model.id]);

    return result.changes === 1;
    }
}