import * as SQLite from 'expo-sqlite';

console.log("CARREGANDO DbHelper.js - " + new Date().toLocaleTimeString());

export class DbHelper {

    static _db = null; // guarda a conexão do banco

    // Abre a conexão de forma assíncrona
    static async GetConnection() {
        if (!this._db) {
            this._db = await SQLite.openDatabaseAsync('quiz_db');
        }
        return this._db;
    }

    // Cria a tabela de temas se não existir
    static async ThemeDbStart() {
        const query = `
            CREATE TABLE IF NOT EXISTS tbtema (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                Player TEXT NOT NULL,
                TimePlayed INTEGER NOT NULL
            );
        `;
        const connection = await this.GetConnection();
        try {
            await connection.execAsync(query);
            console.log("Tabela tbtema criada ou já existe.");
        } catch (error) {
            console.error("Erro ao criar a tabela tbtema:", error);
        }
    }

    // Inicialização completa do DB
    static async startDb() {
        await this.ThemeDbStart();
    }
}
