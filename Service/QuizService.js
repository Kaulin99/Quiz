import { PerguntaDAO } from '../DAO/PerguntaDAO.js';
// import PerguntaModel from '../Model/PerguntaModel.js';

export default class QuizService {
    #perguntaDAO;

    constructor() {
        this.#perguntaDAO = new PerguntaDAO();
    }

    async startNewQuiz(temaId, numPerguntas) {
        // ... (passos 1 a 5 continuam iguais: buscar, filtrar, validar, embaralhar, cortar)
        const todasAsPerguntasRaw = await this.#perguntaDAO.GetAll();
        const perguntasDoTemaRaw = todasAsPerguntasRaw.filter(p => p.temaId === temaId);
        if (perguntasDoTemaRaw.length === 0) { throw new Error("Não há perguntas para este tema."); }
        if (numPerguntas > perguntasDoTemaRaw.length) { throw new Error("A quantidade de perguntas solicitada é maior do que a disponível."); }
        for (let i = perguntasDoTemaRaw.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [perguntasDoTemaRaw[i], perguntasDoTemaRaw[j]] = [perguntasDoTemaRaw[j], perguntasDoTemaRaw[i]];
        }
        const perguntasSelecionadasRaw = perguntasDoTemaRaw.slice(0, numPerguntas);

        // --- MUDANÇA PRINCIPAL AQUI ---
        // 6. Converte os dados brutos em objetos simples com o formato que a GameScreen espera
        const perguntasFormatadas = perguntasSelecionadasRaw.map(item => ({
            id: item.id,
            pergunta: item.pergunta,
            resposta: item.resposta,
            // Cria o array de alternativas que a GameScreen precisa
            alternativas: [
                { id: `${item.id}-1`, texto: item.alternativa1 },
                { id: `${item.id}-2`, texto: item.alternativa2 },
                { id: `${item.id}-3`, texto: item.alternativa3 },
                { id: `${item.id}-4`, texto: item.alternativa4 },
            ]
        }));
        
        return perguntasFormatadas;
    }

    checkAnswer(pergunta, respostaDoUsuario) {
        // ... (este método continua igual)
        if (!pergunta || !pergunta.resposta) {
            return false;
        }
        // A GameScreen agora passa o ID da alternativa, não o texto.
        // Precisamos encontrar a alternativa correta e comparar os IDs.
        const alternativaSelecionada = pergunta.alternativas.find(alt => alt.id === respostaDoUsuario);
        if (!alternativaSelecionada) return false;

        return alternativaSelecionada.texto.trim().toLowerCase() === pergunta.resposta.trim().toLowerCase();
    }
}