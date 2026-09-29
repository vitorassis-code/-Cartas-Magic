import {MagicCardService} from './MagicCard.js';

const magicCardService = new MagicCardService();
const inputBusca = document.getElementById('estrutura');
const botaoBusca = document.getElementById("buscar");
const mensagemErro = document.getElementById("mensagem_de_erro");
const resultadoContainer = document.getElementById('resultado_carta');

botaoBusca.addEventListener("click", async () => {
    const termoBusca = inputBusca.value.trim();
    const termosBuscaFinal = termoBusca.toLowerCase().replace(/\s+/g, '+');
    if(!termoBusca) return alert("Por favor, digite uma carta para buscar.");
    mensagemErro.textContent = "";

    // Limpa mensagens e resultados anteriores
    mensagemErro.textContent = "";
    resultadoContainer.innerHTML = "<p>Buscando carta...</p>";
    
    try {
        const carta = await magicCardService.buscarCartas(termoBusca);
        resultadoContainer.innerHTML = `
            <h2>${carta.nome}</h2>
            <p>Tipo: ${carta.tipo}</p>
            <p>${carta.texto}</p>
            <img src="${carta.imagemUrl}" alt="Imagem da Carta">
        `;
    }
    catch (error) {
        // 1. Limpa o container para não sobrepor resultados antigos
        resultadoContainer.innerHTML = "";

        // 2. Exibe a mensagem de erro da API ou da busca
        mensagemErro.textContent = error.message;

        // 3. Renderiza a imagem padrão de fallback exigida no desafio
        const imagemPadrao = document.createElement('img');
        imagemPadrao.src = 'assets/imagem-padrao.jpg';
        imagemPadrao.alt = 'Imagem padrão do Magic';

        resultadoContainer.appendChild(imagemPadrao);
    }
});
