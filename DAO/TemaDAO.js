import StandardDAO from "./StandardDAO";
import { DbHelper } from '../utils/DbHelper';

export class TemaDAO extends StandardDAO {

    constructor() {
        super("tbtema"); // garante que o DAO saiba o nome da tabela
    }

    async Insert(model) {
        const db = DbHelper.GetConnection();
        console.log("Inserindo no banco, tabela:", this.dbName);

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${this.dbName} (nome, Player, TimePlayed) VALUES (?, ?, ?)`,
                    [model.nome, model.Player, model.TimePlayed],
                    (_, result) => resolve(result.rowsAffected === 1),
                    (_, error) => {
                        console.error("Erro ao criar tema:", error);
                        reject(error);
                        return false;
                    }
                );
            });
        });
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