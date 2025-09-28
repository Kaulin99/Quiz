import StandardDAO from "./StandardDAO";
import { DbHelper } from '../utils/DbHelper';

export class TemaDAO extends StandardDAO {

    constructor() {
        // Isso está perfeito! Configura a tabela 'tbtema' para os métodos da classe pai.
        super("tbtema");
    }

    // --- MÉTODO CREATE CORRIGIDO ---
    async Create(model) {
        return new Promise((resolve, reject) => {
            const db = DbHelper.GetConnection();
            db.transaction(tx => {
                // Agora inclui as colunas nome, Player e TimePlayed
                const query = `INSERT INTO ${this.nomeDb} (nome, Player, TimePlayed) VALUES (?, ?, ?)`;
                tx.executeSql(query, [model.nome, model.Player, model.TimePlayed],
                    (_, { insertId }) => {
                        resolve(insertId);
                    },
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }

    // --- MÉTODO UPDATE CORRIGIDO ---
    async Update(model) {
        return new Promise((resolve, reject) => {
            const db = DbHelper.GetConnection();
            db.transaction(tx => {
                // Agora inclui as colunas nome, Player e TimePlayed
                const query = `UPDATE ${this.nomeDb} SET nome = ?, Player = ?, TimePlayed = ? WHERE id = ?`;
                tx.executeSql(query, [model.nome, model.Player, model.TimePlayed, model.id],
                    (_, { rowsAffected }) => {
                        resolve(rowsAffected > 0);
                    },
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }
}