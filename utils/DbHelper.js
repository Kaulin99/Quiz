import * as SQLite from 'expo-sqlite';

console.log("CARREGANDO DbHelper.js - " + new Date().toLocaleTimeString()); // <-- ADICIONE ESTA LINHA

export class DbHelper {
    static async GetConnection() {
        return await SQLite.openDatabaseAsync('quiz_db');
    }

    static async ThemeDbStart() {  
        const query = `CREATE TABLE IF NOT EXISTS tbtema (
         id INTEGER PRIMARY KEY,
         nome TEXT NOT NULL,    
         Player TEXT NOT NULL,
         TimePlayed INTEGER NOT NULL
        );`;

        const db = this.GetConnection();
        db.transaction(tx => {
            tx.executeSql(query);
        });
    }

    static async startDb() {
        this.ThemeDbStart();
    }
}