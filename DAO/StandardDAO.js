import { DbHelper } from '../utils/DbHelper';

export default class StandardDAO {

    dbName = "";

    constructor(tbNome) {
        this.dbName = tbNome;
        if (!this.dbName) {
            console.error("Erro: nome da tabela não foi definido no DAO!");
        }
    }

    async GetUnique(id) {
        try {
            const connection = await DbHelper.GetConnection();
            const query = `SELECT * FROM ${this.dbName} WHERE id = ?`;
            const result = await connection.getFirstAsync(query, [id]);
            return result || null;
        } catch (error) {
            console.error(`Erro ao buscar registro único em ${this.dbName}:`, error);
            throw error;
        }
    }

    async GetAll(){
        const connection = await DbHelper.GetConnection();
        const registers = await connection.getAllAsync("SELECT * FROM " + this.dbName);
        return registers ?? [];
    }

    async Delete(Id){
        const connection = await DbHelper.GetConnection();
        const query = "DELETE FROM " + this.dbName + " WHERE id = ?";
        const result = await connection.runAsync(query, [Id]); 
        return result.changes === 1; 
    }
    
    async Insert(model) { 
        throw new Error("Método Insert não implementado no DAO filho.");
    }

    async Update(model) {
        throw new Error("Método Update não implementado no DAO filho.");
    }
}