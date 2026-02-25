// Importa o módulo readline para leitura de dados no terminal
const readline = require('readline');

// Cria a interface de entrada e saída
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Exibe o título do programa
console.log("--- Calculadora Node.js ---");

// Solicita o primeiro número (ou valor de x)
rl.question('Digite o primeiro número (ou valor de x): ', (num1) => {

  const n1 = parseFloat(num1);

  if (isNaN(n1)) {
    console.log("❌ Erro: O primeiro valor não é um número válido.");
    rl.close();
    return;
  }

  // Solicita o operador
  rl.question('Digite o operador (+, -, *, /, %, x², a², f(x)=ax+b, f(x)=ax²+b+c): ', (operador) => {

    // Operações que NÃO precisam do segundo número
    if (operador === 'x²' || operador === 'a²') {
      const resultado = n1 ** 2;
      console.log(`\n> Resultado: ${operador}(${n1}) = ${resultado}`);
      rl.close();
      return;
    }

    // Função do 1º grau
    if (operador === 'f(x)=ax+b') {
      rl.question('Digite o valor de a: ', (a) => {
        rl.question('Digite o valor de b: ', (b) => {
          const A = parseFloat(a);
          const B = parseFloat(b);

          if (isNaN(A) || isNaN(B)) {
            console.log("❌ Erro: a ou b inválido.");
            rl.close();
            return;
          }

          const resultado = A * n1 + B;
          console.log(`\n> Resultado: f(${n1}) = ${resultado}`);
          rl.close();
        });
      });
      return;
    }

    // Função do 2º grau
    if (operador === 'f(x)=ax²+b+c') {
      rl.question('Digite o valor de a: ', (a) => {
        rl.question('Digite o valor de b: ', (b) => {
          rl.question('Digite o valor de c: ', (c) => {
            const A = parseFloat(a);
            const B = parseFloat(b);
            const C = parseFloat(c);

            if (isNaN(A) || isNaN(B) || isNaN(C)) {
              console.log("❌ Erro: a, b ou c inválido.");
              rl.close();
              return;
            }

            const resultado = A * (n1 ** 2) + B * n1 + C;
            console.log(`\n> Resultado: f(${n1}) = ${resultado}`);
            rl.close();
          });
        });
      });
      return;
    }

    // Operações que precisam do segundo número
    rl.question('Digite o segundo número: ', (num2) => {

      const n2 = parseFloat(num2);

      if (isNaN(n2)) {
        console.log("❌ Erro: O segundo valor não é um número válido.");
        rl.close();
        return;
      }

      let resultado;

      switch (operador) {
        case '+':
          resultado = n1 + n2;
          break;

        case '-':
          resultado = n1 - n2;
          break;

        case '*':
          resultado = n1 * n2;
          break;

        case '/':
          resultado = n2 !== 0 ? n1 / n2 : "Erro: Divisão por zero!";
          break;

        case '%':
          // Agora sim é porcentagem (ex: 20% de 50)
          resultado = (n1 / 100) * n2;
          break;

        default:
          resultado = "Operador inválido!";
      }

      console.log(`\n> Resultado: ${n1} ${operador} ${n2} = ${resultado}`);
      rl.close();
    });
  });
});
