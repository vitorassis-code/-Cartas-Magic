export class MagicCardService {
  #statusMessages = {
    404: "Carta ou recurso não encontrado na API.",
    500: "O servidor do Magic está instável no momento.",
    503: "Serviço indisponível. Tente novamente em instantes.",
  };

  async buscarCartas(nome) {
    // 1. URL dinâmica com o termo da busca
    const url = `https://api.magicthegathering.io/v1/cards?name="${encodeURIComponent(nome)}"`;
    const response = await fetch(url);

    if (!response.ok) {
      const mensagem = this.#statusMessages[response.status] 
        || `Erro de comunicação com a API (${response.status})`;
      
      throw new Error(mensagem);
    }

    const data = await response.json();

    // 2. Valida se veio o array 'cards' e se ele possui ao menos 1 item
    if (!data.cards || data.cards.length === 0) {
      throw new Error("Nenhuma carta encontrada para o termo buscado.");
    }

    // 3. Captura o primeiro resultado retornado pela API
    const carta = data.cards[0];

    // 4. Retorna o DTO padronizado lendo os dados de 'carta'
    return {
      nome: carta.name,
      tipo: carta.type,
      texto: carta.text || "Sem texto de efeito registrado.",
      imagemUrl: carta.imageUrl || `assets/imagem-padrao.jpg`
    };
  }
}