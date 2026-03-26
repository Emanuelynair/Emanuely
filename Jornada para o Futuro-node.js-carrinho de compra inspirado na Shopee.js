const readline = require("readline");

// Interface do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Carrinho
let carrinho = [];

// Função para exibir menu
function mostrarMenu() {
  console.log("\n🛒 MENU:");
  console.log("1 - Adicionar produto");
  console.log("2 - Remover produto");
  console.log("3 - Alterar quantidade");
  console.log("4 - Ver carrinho");
  console.log("5 - Ver total");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", opcao => {
    switch (opcao) {
      case "1":
        adicionarProduto();
        break;
      case "2":
        removerProduto();
        break;
      case "3":
        alterarQuantidade();
        break;
      case "4":
        verCarrinho();
        break;
      case "5":
        calcularTotal();
        break;
      case "0":
        console.log("Encerrando...");
        rl.close();
        break;
      default:
        console.log("Opção inválida!");
        mostrarMenu();
    }
  });
}

// Adicionar produto
function adicionarProduto() {
  rl.question("Nome do produto: ", nome => {
    rl.question("Preço: ", preco => {
      rl.question("Quantidade: ", quantidade => {
        const produto = {
          nome,
          preco: parseFloat(preco),
          quantidade: parseInt(quantidade)
        };

        carrinho.push(produto);
        console.log("✅ Produto adicionado!");
        mostrarMenu();
      });
    });
  });
}

// Remover produto
function removerProduto() {
  rl.question("Nome do produto para remover: ", nome => {
    carrinho = carrinho.filter(p => p.nome !== nome);
    console.log("🗑 Produto removido!");
    mostrarMenu();
  });
}

// Alterar quantidade
function alterarQuantidade() {
  rl.question("Nome do produto: ", nome => {
    const produto = carrinho.find(p => p.nome === nome);

    if (!produto) {
      console.log("❌ Produto não encontrado!");
      return mostrarMenu();
    }

    rl.question("Nova quantidade: ", qtd => {
      produto.quantidade = parseInt(qtd);
      console.log("🔄 Quantidade atualizada!");
      mostrarMenu();
    });
  });
}

// Ver carrinho
function verCarrinho() {
  if (carrinho.length === 0) {
    console.log("🛒 Carrinho vazio!");
  } else {
    console.log("\n📦 Produtos no carrinho:");
    carrinho.forEach((p, i) => {
      console.log(
        `${i + 1}. ${p.nome} | R$ ${p.preco.toFixed(2)} | Qtd: ${p.quantidade}`
      );
    });
  }
  mostrarMenu();
}

// Calcular total
function calcularTotal() {
  const total = carrinho.reduce(
    (soma, p) => soma + p.preco * p.quantidade,
    0
  );

  const totalItens = carrinho.reduce(
    (soma, p) => soma + p.quantidade,
    0
  );

  console.log(`\n💰 Total: R$ ${total.toFixed(2)}`);
  console.log(`📊 Quantidade de itens: ${totalItens}`);

  mostrarMenu();
}

// Iniciar sistema
console.log("🛍 Bem-vindo ao carrinho estilo Shopee!");
mostrarMenu();
