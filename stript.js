document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-direcionador');
    const inputSegmento = document.getElementById('segmento');
    const resultadoBox = document.getElementById('resultado-direcionador');
    const listaSugestoes = document.getElementById('lista-sugestoes');
    const btnsComprar = document.querySelectorAll('.btn-comprar');

    // 1. Configuração do Stripe (SUBSTITUA PELAS SUAS CHAVES REAIS)
    const stripe = Stripe('SUA_CHAVE_PUBLICA_STRIPE'); // Ex: pk_live_xxxxxxxxxxxxxxxxx

    // 2. Mapeamento de Sugestões Fora da Curva
    const sugestoesImpacto = {
        alimentacao: [
            "O 'Menu Fantasma' (Ghost Menu): Crie um menu secundário, altamente lucrativo, exclusivo para delivery, com marca diferente, otimizado para apps (Ifood, Rappi), sem canibalizar sua operação principal.",
            "Dia do 'Produto Limitado' (Escassez): Toda terça, lance um item ultrassegmentado com alta margem e produção limitada. Gere buzz e urgência no Instagram, forçando a decisão de compra imediata.",
            "Programa 'Embaixadores da Vizinhança': Identifique 5 clientes locais fiéis e os transforme em embaixadores com um código de desconto/afiliado robusto. Eles se tornam sua máquina de marketing boca a boca local."
        ],
        servicos: [
            "Mini-Consultoria Assíncrona: Venda um 'Diagnóstico Rápido' de 30 minutos via vídeo gravado (assíncrono) a preço baixo (R$49). Isso massifica a aquisição de leads qualificados e mostra o valor do seu serviço.",
            "Crie um 'Benchmark' do Setor: Desenvolva um relatório gratuito com dados públicos de 5 concorrentes de sucesso do cliente. Use-o como isca digital (Lead Magnet) de altíssimo valor percebido.",
            "O 'Desafio de 5 Dias': Crie um desafio prático de 5 dias no WhatsApp/Telegram. O conteúdo gratuito de alto valor gera prova social e confiança, e o pitch de venda é no último dia, para o plano premium."
        ],
        varejoonline: [
            "Upsell 'Quase Grátis': Identifique um produto de altíssima margem e o ofereça por R$1,00 para clientes que acabaram de fazer a primeira compra. Aumenta o ticket médio e a recompra imediata.",
            "Use o 'Princípio da História': Em vez de descrições secas, crie uma história (Storytelling) sobre a origem/uso/impacto de cada produto na vida do cliente. Aumenta a conexão emocional e a conversão.",
            "Crie uma 'Central de Tutoriais': Em vez de blog, tenha uma seção no site apenas com vídeos curtos (30s a 60s) mostrando o 'como fazer' com seus produtos. Isso gera autoridade e atrai tráfego orgânico do YouTube/Google."
        ],
        generico: [
            "Aplique o 'Método 80/20' no Cliente: Identifique os 20% de clientes que geram 80% do seu lucro e crie uma oferta exclusiva e hiper-personalizada para eles, garantindo fidelidade e receita estável.",
            "Crie um 'Índice de Confiança' Público: Divulgue mensalmente números transparentes (clientes atendidos, taxa de sucesso, etc.). A transparência gera a segurança que seu público-alvo valoriza.",
            "Monetize seu 'Lixo': Transforme perguntas frequentes, erros comuns e processos internos em conteúdo ou em um mini-produto de baixo custo. O que é 'lixo' para você é ouro para quem está começando."
        ]
    };

    // 3. Função do Direcionador de Ideias (IA Simulação)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const segmento = inputSegmento.value.toLowerCase().trim();
        let chaves = Object.keys(sugestoesImpacto);
        let chaveEncontrada = 'generico'; // Padrão
        
        // Lógica de mapeamento mais robusta
        for (const chave of chaves) {
            if (segmento.includes(chave.toLowerCase())) {
                chaveEncontrada = chave;
                break;
            }
        }

        const sugestoesSelecionadas = sugestoesImpacto[chaveEncontrada];
        
        // Insere as 3 sugestões na lista
        listaSugestoes.innerHTML = ''; // Limpa antes de inserir
        sugestoesSelecionadas.forEach(sugestao => {
            const li = document.createElement('li');
            li.innerHTML = sugestao; // Usando innerHTML para o texto formatado no array
            listaSugestoes.appendChild(li);
        });

        resultadoBox.classList.remove('hidden');
        resultadoBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // 4. Função de Pagamento com Stripe Checkout
    btnsComprar.forEach(button => {
        button.addEventListener('click', async () => {
            const priceId = button.getAttribute('data-plan-id'); // Pega o ID do plano do botão

            // ⚠️ Importante: O modo 'subscription' é crucial para planos mensais
            const session = await stripe.redirectToCheckout({
                lineItems: [{ price: priceId, quantity: 1 }],
                mode: 'subscription', 
                // URLs de destino após o pagamento (SUBSTITUA PELOS SEUS DOMÍNIOS)
                successUrl: 'https://seu-dominio.com/sucesso-pagamento', 
                cancelUrl: 'https://seu-dominio.com/planos',
            });

            if (session.error) {
                // Se houver um erro, exibe-o (apenas para desenvolvimento)
                console.error(session.error.message);
                alert('Ocorreu um erro ao processar o pagamento. Tente novamente.');
            }
        });
    });
});