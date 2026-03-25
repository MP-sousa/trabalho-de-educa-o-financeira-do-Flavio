let carrinho = [];
let filtroAtual = 'todos';

document.addEventListener('DOMContentLoaded', function() {
    renderizarProdutos(Object.values(PRODUTOS).flat());
    renderizarPCs();
});

function mostrarSecao(secao) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(secao).classList.remove('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function renderizarProdutos(produtos) {
    const grid = document.getElementById('produtosGrid');
    grid.innerHTML = '';
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
            <img src="${produto.icon}" alt="${produto.nome}" class="produto-icon">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <div class="detalhes">
                <strong>Custo:</strong> R$ ${produto.custo.toFixed(2)} <br>
                <strong>Lucro:</strong> ${produto.margem}
            </div>
            <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
            <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        grid.appendChild(card);
    });
}

function filtrarProdutos(categoria) {
    document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filtroAtual = categoria;
    if (categoria === 'todos') {
        renderizarProdutos(Object.values(PRODUTOS).flat());
    } else {
        const produtosFiltrados = PRODUTOS[categoria] || [];
        renderizarProdutos(produtosFiltrados);
    }
}

function renderizarPCs() {
    const grid = document.getElementById('pcsGrid');
    grid.innerHTML = '';
    PCS_PREMONTADOS.forEach(pc => {
        const card = document.createElement('div');
        card.className = 'pc-card';
        card.innerHTML = `
            <div class="pc-nivel">${pc.nivel}</div>
            <h3>${pc.nome}</h3>
            <p>${pc.descricao}</p>
            <div class="pc-specs">
                <p><strong>Processador:</strong> ${pc.componentes.processador}</p>
                <p><strong>GPU:</strong> ${pc.componentes.gpu}</p>
                <p><strong>Memória:</strong> ${pc.componentes.ram}</p>
                <p><strong>Armazenamento:</strong> ${pc.componentes.ssd}</p>
                <p><strong>Placa-mãe:</strong> ${pc.componentes.placamae}</p>
                <p><strong>Fonte:</strong> ${pc.componentes.fonte}</p>
                <p><strong>Gabinete:</strong> ${pc.componentes.gabinete}</p>
            </div>
            <div class="pc-preco">R$ ${pc.preco.toFixed(2)}</div>
            <button class="btn-adicionar" onclick="adicionarPCaoCarrinho('${pc.id}')">Adicionar ao Carrinho</button>
        `;
        grid.appendChild(card);
    });
}

function buscarProduto(id) {
    for (const categoria in PRODUTOS) {
        const produto = PRODUTOS[categoria].find(p => p.id === id);
        if (produto) return produto;
    }
    return null;
}

function adicionarAoCarrinho(id) {
    const produto = buscarProduto(id);
    if (!produto) {
        console.error('Produto não encontrado:', id);
        return;
    }
    const itemExistente = carrinho.find(item => item.id === id && item.tipo === 'produto');
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1,
            tipo: 'produto'
        });
    }
    atualizarCarrinho();
    mostrarNotificacao('✅ Adicionado ao carrinho!');
}

function adicionarPCaoCarrinho(id) {
    const pc = PCS_PREMONTADOS.find(p => p.id === id);
    if (!pc) {
        console.error('PC não encontrado:', id);
        return;
    }
    const itemExistente = carrinho.find(item => item.id === id && item.tipo === 'pc');
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: pc.nome,
            preco: pc.preco,
            quantidade: 1,
            tipo: 'pc'
        });
    }
    atualizarCarrinho();
    mostrarNotificacao('✅ PC adicionado ao carrinho!');
}

function atualizarCarrinho() {
    const itemsContainer = document.getElementById('carrinhoItems');
    itemsContainer.innerHTML = '';
    let total = 0;
    if (carrinho.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-light);">Seu carrinho está vazio</p>';
    } else {
        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'carrinho-item';
            itemDiv.innerHTML = `
                <div class="carrinho-item-nome">${item.nome}</div>
                <div class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</div>
                <div class="quantidade-controls">
                    <button onclick="mudarQuantidade(${index}, -1)">-</button>
                    <input type="number" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${index}, this.value)">
                    <button onclick="mudarQuantidade(${index}, 1)">+</button>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            itemsContainer.appendChild(itemDiv);
        });
    }
    document.getElementById('carrinhoTotal').textContent = `R$ ${total.toFixed(2)}`;
    document.querySelector('.carrinho-count').textContent = carrinho.length;
}

function mudarQuantidade(index, valor) {
    carrinho[index].quantidade += valor;
    if (carrinho[index].quantidade <= 0) {
        removerDoCarrinho(index);
    } else {
        atualizarCarrinho();
    }
}

function atualizarQuantidade(index, valor) {
    const qtd = parseInt(valor);
    if (qtd <= 0) {
        removerDoCarrinho(index);
    } else {
        carrinho[index].quantidade = qtd;
        atualizarCarrinho();
    }
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function limparCarrinho() {
    if (carrinho.length === 0) {
        alert('Seu carrinho já está vazio!');
        return;
    }
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        carrinho = [];
        atualizarCarrinho();
    }
}

function toggleCarrinho() {
    const sidebar = document.getElementById('carrinhoSidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function fazerCheckout() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    toggleCarrinho();
    document.getElementById('checkoutModal').classList.add('active');
}

function fecharCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function processarCompra(event) {
    event.preventDefault();
    const modal = document.getElementById('checkoutModal');
    const conteudo = modal.querySelector('.modal-content');
    conteudo.innerHTML = `
        <h2 style="color: var(--success); text-shadow: 0 0 10px var(--success);">✅ Compra Realizada!</h2>
        <p style="text-align: center; margin: 30px 0;">
            Obrigado pela sua compra na MP PrimeTech!<br><br>
            <strong>Número do Pedido:</strong> #${Math.floor(Math.random() * 100000)}<br><br>
            Você receberá um email de confirmação em breve.
        </p>
        <button class="btn-primary" style="width: 100%;" onclick="finalizarCompra()">Voltar para Home</button>
    `;
}

function finalizarCompra() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.querySelector('.modal-content').innerHTML = `
        <button class="close-btn" onclick="fecharCheckout()">✕</button>
        <h2>Finalizar Compra</h2>
        <form onsubmit="processarCompra(event)">
            <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" required>
            </div>
            <div class="form-group">
                <label>Endereço</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Número do Cartão (Ilustrativo)</label>
                <input type="text" placeholder="0000 0000 0000 0000" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Validade</label>
                    <input type="text" placeholder="MM/AA" required>
                </div>
                <div class="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="000" required>
                </div>
            </div>
            <button type="submit" class="btn-comprar">Confirmar Compra</button>
        </form>
    `;
    carrinho = [];
    atualizarCarrinho();
    mostrarNotificacao('🎉 Compra finalizada com sucesso!');
}

function mostrarNotificacao(mensagem) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, var(--neon-blue), var(--gold));
        color: var(--dark-bg);
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    notif.textContent = mensagem;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {transform: translateX(400px); opacity: 0;}
        to {transform: translateX(0); opacity: 1;}
    }
    @keyframes slideOut {
        from {transform: translateX(0); opacity: 1;}
        to {transform: translateX(400px); opacity: 0;}
    }
`;
document.head.appendChild(style);
