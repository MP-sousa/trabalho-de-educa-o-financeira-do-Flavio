const PRODUTOS = {
    processador: [
        {
            id: 1,
            nome: "Intel Core i3",
            preco: 750,
            custo: 500,
            lucro: 250,
            margem: "33%",
            categoria: "processador",
            icon: "🔧",
            descricao: "Processador básico para tarefas do dia a dia"
        },
        {
            id: 2,
            nome: "AMD Ryzen 5",
            preco: 1250,
            custo: 900,
            lucro: 350,
            margem: "28%",
            categoria: "processador",
            icon: "⚙️",
            descricao: "Processador intermediário com bom desempenho"
        },
        {
            id: 3,
            nome: "Intel Core i7",
            preco: 2400,
            custo: 1800,
            lucro: 600,
            margem: "25%",
            categoria: "processador",
            icon: "🔩",
            descricao: "Processador top para gaming e workstation"
        }
    ],
    gpu: [
        {
            id: 4,
            nome: "GTX 1650",
            preco: 1250,
            custo: 900,
            lucro: 350,
            margem: "28%",
            categoria: "gpu",
            icon: "🎮",
            descricao: "Placa de vídeo básica para gaming casual"
        },
        {
            id: 5,
            nome: "RTX 3060",
            preco: 2500,
            custo: 1800,
            lucro: 700,
            margem: "28%",
            categoria: "gpu",
            icon: "🎯",
            descricao: "Placa intermediária com ray tracing"
        },
        {
            id: 6,
            nome: "RTX 4070",
            preco: 4200,
            custo: 3200,
            lucro: 1000,
            margem: "24%",
            categoria: "gpu",
            icon: "🚀",
            descricao: "Placa top de linha para máximo desempenho"
        }
    ],
    ram: [
        {
            id: 7,
            nome: "8GB DDR4",
            preco: 200,
            custo: 120,
            lucro: 80,
            margem: "40%",
            categoria: "ram",
            icon: "💾",
            descricao: "Memória básica para uso geral"
        },
        {
            id: 8,
            nome: "16GB DDR4",
            preco: 400,
            custo: 250,
            lucro: 150,
            margem: "37%",
            categoria: "ram",
            icon: "🧠",
            descricao: "Memória intermediária para multitarefa"
        },
        {
            id: 9,
            nome: "32GB DDR5",
            preco: 850,
            custo: 600,
            lucro: 250,
            margem: "29%",
            categoria: "ram",
            icon: "⚡",
            descricao: "Memória top com tecnologia DDR5"
        }
    ],
    ssd: [
        {
            id: 10,
            nome: "SSD 240GB",
            preco: 180,
            custo: 100,
            lucro: 80,
            margem: "44%",
            categoria: "ssd",
            icon: "📀",
            descricao: "Armazenamento básico e rápido"
        },
        {
            id: 11,
            nome: "SSD 500GB",
            preco: 300,
            custo: 180,
            lucro: 120,
            margem: "40%",
            categoria: "ssd",
            icon: "💿",
            descricao: "Armazenamento intermediário com ótimo custo-benefício"
        },
        {
            id: 12,
            nome: "SSD 1TB NVMe",
            preco: 550,
            custo: 350,
            lucro: 200,
            margem: "36%",
            categoria: "ssd",
            icon: "🔌",
            descricao: "Armazenamento top com velocidade máxima"
        }
    ],
    "placa-mae": [
        {
            id: 13,
            nome: "Placa H510",
            preco: 600,
            custo: 400,
            lucro: 200,
            margem: "33%",
            categoria: "placa-mae",
            icon: "🧩",
            descricao: "Placa-mãe básica com bom custo-benefício"
        },
        {
            id: 14,
            nome: "Placa B550",
            preco: 1000,
            custo: 700,
            lucro: 300,
            margem: "30%",
            categoria: "placa-mae",
            icon: "🖲️",
            descricao: "Placa intermediária com suporte a Ryzen"
        },
        {
            id: 15,
            nome: "Placa Z790",
            preco: 2100,
            custo: 1500,
            lucro: 600,
            margem: "28%",
            categoria: "placa-mae",
            icon: "⚙️",
            descricao: "Placa top para Intel de última geração"
        }
    ],
    fonte: [
        {
            id: 16,
            nome: "Fonte 400W",
            preco: 250,
            custo: 150,
            lucro: 100,
            margem: "40%",
            categoria: "fonte",
            icon: "🔌",
            descricao: "Fonte básica para sistemas econômicos"
        },
        {
            id: 17,
            nome: "Fonte 600W",
            preco: 450,
            custo: 300,
            lucro: 150,
            margem: "33%",
            categoria: "fonte",
            icon: "⚡",
            descricao: "Fonte intermediária com boa eficiência"
        },
        {
            id: 18,
            nome: "Fonte 850W Modular",
            preco: 850,
            custo: 600,
            lucro: 250,
            margem: "29%",
            categoria: "fonte",
            icon: "🔋",
            descricao: "Fonte top com cabos modulares"
        }
    ],
    gabinete: [
        {
            id: 19,
            nome: "Gabinete Simples",
            preco: 220,
            custo: 120,
            lucro: 100,
            margem: "45%",
            categoria: "gabinete",
            icon: "🖥️",
            descricao: "Gabinete básico e funcional"
        },
        {
            id: 20,
            nome: "Gabinete Gamer RGB",
            preco: 400,
            custo: 250,
            lucro: 150,
            margem: "37%",
            categoria: "gabinete",
            icon: "🎮",
            descricao: "Gabinete com LED RGB personalizável"
        },
        {
            id: 21,
            nome: "Gabinete Premium Vidro Temperado",
            preco: 750,
            custo: 500,
            lucro: 250,
            margem: "33%",
            categoria: "gabinete",
            icon: "💎",
            descricao: "Gabinete premium com vidro temperado"
        }
    ]
};

const PCS_PREMONTADOS = [
    {
        id: "101",
        nome: "PC Básico",
        nivel: "Básico",
        preco: 4320,
        descricao: "Perfeito para tarefas do dia a dia",
        componentes: {
            processador: "Intel Core i3",
            gpu: "GTX 1650",
            ram: "8GB DDR4",
            ssd: "SSD 240GB",
            placamae: "Placa H510",
            fonte: "Fonte 400W",
            gabinete: "Gabinete Simples"
        },
        custo_total: 3070,
        lucro: 1250
    },
    {
        id: "102",
        nome: "PC Intermediário",
        nivel: "Intermediário",
        preco: 7600,
        descricao: "Ótimo para gaming e produção",
        componentes: {
            processador: "AMD Ryzen 5",
            gpu: "RTX 3060",
            ram: "16GB DDR4",
            ssd: "SSD 500GB",
            placamae: "Placa B550",
            fonte: "Fonte 600W",
            gabinete: "Gabinete Gamer RGB"
        },
        custo_total: 5300,
        lucro: 2300
    },
    {
        id: "103",
        nome: "PC Top de Linha",
        nivel: "Top",
        preco: 13570,
        descricao: "Máximo desempenho para tudo",
        componentes: {
            processador: "Intel Core i7",
            gpu: "RTX 4070",
            ram: "32GB DDR5",
            ssd: "SSD 1TB NVMe",
            placamae: "Placa Z790",
            fonte: "Fonte 850W Modular",
            gabinete: "Gabinete Premium Vidro Temperado"
        },
        custo_total: 9500,
        lucro: 4070
    }
];

const CONCORRENTES = [
    {
        nome: "TechGamer Store",
        descricao: "Loja online especializada em componentes para gaming com preços variáveis"
    },
    {
        nome: "CompuPC Online",
        descricao: "Varejista de componentes com foco em PCs montados e preços competitivos"
    }
];
