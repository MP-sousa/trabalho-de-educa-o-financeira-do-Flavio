let carrinho = [];
let filtroAtual = 'todos';

document.addEventListener('DOMContentLoaded', function () {
    renderizarProdutos(Object.values(PRODUTOS).flat());
    renderizarPCs();
});

function mostrarSecao(secao) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(secao).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderizarProdutos(produtos) {
    const grid = document.getElementById('produtosGrid');
    grid.innerHTML = '';
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
            <div class="produto-icon">${produto.icon}</div>
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <div class="detalhes">
                <strong>Custo:</strong> R$ ${produto.custo.toFixed(2)} <br>
                <strong>Lucro:</strong> ${produto.margem}
            </div>
            <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
            <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
                Adicionar ao Carrinho
            </button>
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
            <button class="btn-adicionar" onclick="adicionarPCaoCarrinho('${pc.id}')">
                Adicionar ao Carrinho
            </button>
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
    const overlay*

