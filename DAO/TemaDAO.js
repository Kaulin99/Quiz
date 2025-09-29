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


        await connection.closeAsync();
        
        return result.changes == 1;
    }

    async Update(model) {
        const db = DbHelper.GetConnection();
        console.log("Atualizando no banco, tabela:", this.dbName);

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${this.dbName} SET nome = ?, Player = ? WHERE id = ?`,
                    [model.nome, model.Player, model.id],
                    (_, result) => resolve(result.rowsAffected === 1),
                    (_, error) => {
                        console.error("Erro ao atualizar tema:", error);
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }
}