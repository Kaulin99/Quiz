import * as SQLite from 'expo-sqlite';

export class DbHelper {
    static GetConnection() {
        return SQLite.openDatabase('quiz_db');
    }

    static ThemeDbStart() {  
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

    static startDb() {
        this.ThemeDbStart();
    }
}