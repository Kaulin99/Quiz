import { PerguntaDAO } from '../DAO/PerguntaDAO.js';
import PerguntaModel from '../Model/PerguntaModel.js';

export default class QuizService {
    #perguntaDAO;

    constructor() {
        this.#perguntaDAO = new PerguntaDAO();
    }

    /**
     * Prepara e retorna uma lista de perguntas aleatórias para um novo quiz.
     * @param {number} temaId O ID do tema do quiz.
     * @param {number} numPerguntas A quantidade de perguntas desejada.
     * @returns {Promise<Array<PerguntaModel>>} Uma lista de modelos de pergunta, embaralhada e cortada.
     */
    async startNewQuiz(temaId, numPerguntas) {
        // 1. Pega os dados brutos de todas as perguntas do DAO
        const todasAsPerguntasRaw = await this.#perguntaDAO.GetAll();

        // 2. Filtra para ter apenas as perguntas do tema selecionado
        const perguntasDoTemaRaw = todasAsPerguntasRaw.filter(p => p.temaId === temaId);

        // 3. Validação
        if (perguntasDoTemaRaw.length === 0) {
            throw new Error("Não há perguntas para este tema.");
        }
        if (numPerguntas > perguntasDoTemaRaw.length) {
            throw new Error("A quantidade de perguntas solicitada é maior do que a disponível.");
        }

        // 4. Embaralha a lista (Algoritmo Fisher-Yates)
        for (let i = perguntasDoTemaRaw.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [perguntasDoTemaRaw[i], perguntasDoTemaRaw[j]] = [perguntasDoTemaRaw[j], perguntasDoTemaRaw[i]];
        }

        // 5. Pega apenas a quantidade desejada
        const perguntasSelecionadasRaw = perguntasDoTemaRaw.slice(0, numPerguntas);

        // 6. Converte os dados brutos em instâncias do PerguntaModel
        const models = perguntasSelecionadasRaw.map(item => 
            new PerguntaModel(
                item.id, item.temaId, item.pergunta, item.resposta,
                item.alternativa1, item.alternativa2, item.alternativa3, item.alternativa4
            )
        );
        
        return models;
    }

    /**
     * Verifica se a resposta fornecida pelo usuário está correta.
     * @param {PerguntaModel} pergunta O objeto da pergunta atual.
     * @param {string} respostaDoUsuario A alternativa que o usuário selecionou.
     * @returns {boolean} True se a resposta for correta, false caso contrário.
     */
    checkAnswer(pergunta, respostaDoUsuario) {
        if (!pergunta || !pergunta.resposta) {
            return false;
        }
        return pergunta.resposta.trim().toLowerCase() === respostaDoUsuario.trim().toLowerCase();
    }
}