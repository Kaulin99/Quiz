import { DbHelper } from '../utils/DbHelper';

export default class StandardDAO {

    dbName = "";

    constructor(tbNome) {
        this.dbName = tbNome;
        if (!this.dbName) {
            console.error("Erro: nome da tabela não foi definido no DAO!");
        }
    }

    // Buscar um registro único
    async GetUnique(id) {
        const db = DbHelper.GetConnection();
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${this.dbName} WHERE id = ?`,
                    [id],
                    (_, { rows }) => {
                        resolve(rows.length > 0 ? rows.item(0) : null);
                    },
                    (_, error) => {
                        console.error(`Erro ao buscar registro em ${this.dbName}:`, error);
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }

    // Buscar todos os registros
    async GetAll() {
        const db = DbHelper.GetConnection();
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${this.dbName}`,
                    [],
                    (_, { rows }) => {
                        const result = [];
                        for (let i = 0; i < rows.length; i++) {
                            result.push(rows.item(i));
                        }
                        resolve(result);
                    },
                    (_, error) => {
                        console.error(`Erro ao buscar todos os registros em ${this.dbName}:`, error);
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }

    async GetAll(){
        const connection = await DbHelper.GetConnection();
        const registers = await connection.getAllAsync("SELECT * FROM " + this.dbName);
        
        return registers && registers.length > 0 ? registers : [];
    }

    async Delete(Id){
        const connection = await DbHelper.GetConnection();
        const query = "DELETE FROM " + this.dbName + " WHERE id = ?";
        const result = await connection.runAsync(query, [Id]); 
        return result.changes === 1; 
    }

    async Insert(model) { return null; }
    async Update(model) { return null; }
}