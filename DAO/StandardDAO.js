import { DbHelper } from '../utils/DbHelper';

class StandardDAO {
    
    nomeDb = "";

    constructor(tbNome) {
        this.nomeDb = tbNome;
    }

    // --- MÉTODO CORRIGIDO ---
    async GetUnique(id) {
        return new Promise((resolve, reject) => {
            const db = DbHelper.GetConnection();
            db.transaction(tx => {
                // CORREÇÃO: Usando a propriedade correta 'this.nomeDb'
                const query = `SELECT * FROM ${this.nomeDb} WHERE id = ?`;
                
                tx.executeSql(query, [id], 
                    // Callback de sucesso
                    (_, { rows }) => {
                        // A API retorna um objeto com 'rows', que contém um array '_array'
                        if (rows.length > 0) {
                            resolve(rows._array[0]); // Retorna o primeiro e único registro
                        } else {
                            resolve(null); // Nenhum registro encontrado
                        }
                    },
                    // Callback de erro
                    (_, error) => {
                        reject(error); // Rejeita a promise em caso de erro
                        return false; // Retornar false em callbacks de erro é uma boa prática
                    }
                );
            });
        });
    }

    // --- MÉTODO CORRIGIDO ---
    async GetAll() {
        return new Promise((resolve, reject) => {
            const db = DbHelper.GetConnection();
            db.transaction(tx => {
                // CORREÇÃO: Usando a propriedade correta 'this.nomeDb'
                const query = `SELECT * FROM ${this.nomeDb}`;

                tx.executeSql(query, [],
                    (_, { rows }) => {
                        resolve(rows._array); // Retorna o array de registros
                    },
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }

    // --- MÉTODO CORRIGIDO ---
    async Delete(id) {
        return new Promise((resolve, reject) => {
            const db = DbHelper.GetConnection();
            db.transaction(tx => {
                // CORREÇÃO: Usando a propriedade correta 'this.nomeDb'
                const query = `DELETE FROM ${this.nomeDb} WHERE id = ?`;
                
                tx.executeSql(query, [id],
                    (_, { rowsAffected }) => {
                        // 'rowsAffected' informa quantas linhas foram alteradas
                        resolve(rowsAffected > 0); // Retorna true se 1 ou mais linhas foram deletadas
                    },
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }

    // Métodos a serem implementados
    async Create(model) {
        console.warn("Método Create não implementado.");
        return null;
    }

    async Update(model) {
        console.warn("Método Update não implementado.");
        return null;
    }
}

export default StandardDAO;