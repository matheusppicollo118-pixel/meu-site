document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-direcionador');
    const inputSegmento = document.getElementById('segmento');
    const resultadoBox = document.getElementById('resultado-direcionador');
    const sugestaoRapida = document.getElementById('sugestao-rapida');

    // Mapeamento de sugestões baseadas no segmento
    const sugestoes = {
        alimentacao: "Foque em criar um menu digital atrativo e use o Instagram para mostrar o 'making of' dos pratos, gerando desejo e transparência.",
        servicos: "Desenvolva um funil de conteúdo no LinkedIn para se posicionar como autoridade no seu nicho, oferecendo um e-book gratuito em troca de contato.",
        varejoonline: "Otimize suas descrições de produtos com palavras-chave de cauda longa (long-tail keywords) e invista em anúncios de retargeting para quem abandonou o carrinho.",
        generico: "Sua prioridade é definir 3 'Personas' de cliente. Entender quem compra é o primeiro passo para o marketing e a escala eficaz."
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const segmento = inputSegmento.value.toLowerCase().trim();
        let sugestao = '';

        if (segmento.includes('alimentação') || segmento.includes('comida') || segmento.includes('restaurante')) {
            sugestao = sugestoes.alimentacao;
        } else if (segmento.includes('serviços') || segmento.includes('consultoria') || segmento.includes('freelancer')) {
            sugestao = sugestoes.servicos;
        } else if (segmento.includes('varejo') || segmento.includes('e-commerce') || segmento.includes('online')) {
            sugestao = sugestoes.varejoonline;
        } else {
            sugestao = sugestoes.generico;
        }

        sugestaoRapida.textContent = sugestao;
        resultadoBox.classList.remove('hidden');

        // Rolagem suave para o resultado
        resultadoBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});