import QuizService from "../Service/QuizService";

export default class QuizController {
    #service;

    constructor() {
        this.#service = new QuizService();
    }

    /**
     * Solicita ao serviço a preparação de um novo quiz.
     */
    async startNewQuiz(temaId, numPerguntas) {
        try {
            // A lógica de embaralhar e selecionar foi movida para o service.
            return await this.#service.startNewQuiz(temaId, numPerguntas);
        } catch (error) {
            console.error("Erro no controller ao iniciar novo quiz:", error);
            throw error;
        }
    }

    /**
     * Solicita ao serviço a verificação de uma resposta.
     */
    checkAnswer(pergunta, respostaDoUsuario) {
        // A lógica de comparação foi movida para o service.
        return this.#service.checkAnswer(pergunta, respostaDoUsuario);
    }
}