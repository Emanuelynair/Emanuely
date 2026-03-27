#!/usr/bin/env node

import inquirer from "inquirer";
import QRCode from "qrcode";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

// ===============================
// CONFIGURAÇÕES INICIAIS
// ===============================
const outputDir = path.resolve("./qrcodes");
fs.ensureDirSync(outputDir);

// ===============================
// FUNÇÃO PARA GERAR QR CODE
// ===============================
async function gerarQRCode() {
  console.log(chalk.blue("\n🛒 Gerador de QR Code para E-commerce\n"));

  const respostas = await inquirer.prompt([
    {
      name: "nomeProduto",
      message: "📝 Nome do produto:",
      type: "input",
      validate: (input) =>
        input.length > 0 || "Digite o nome do produto"
    },
    {
      name: "url",
      message: "🔗 Link do produto:",
      type: "input",
      validate: (input) =>
        input.startsWith("http") || "Digite uma URL válida (http/https)"
    },
    {
      name: "cor",
      message: "🎨 Cor do QR Code (hex):",
      default: "#000000"
    },
    {
      name: "fundo",
      message: "🖼️ Cor de fundo (hex):",
      default: "#ffffff"
    },
    {
      name: "formato",
      message: "📦 Formato do arquivo:",
      type: "list",
      choices: ["png", "svg"]
    }
  ]);

  const fileName = `${respostas.nomeProduto
    .replace(/\s+/g, "_")
    .toLowerCase()}.${respostas.formato}`;

  const filePath = path.join(outputDir, fileName);

  try {
    if (respostas.formato === "png") {
      await QRCode.toFile(filePath, respostas.url, {
        color: {
          dark: respostas.cor,
          light: respostas.fundo
        }
      });
    } else {
      const svgString = await QRCode.toString(respostas.url, {
        type: "svg",
        color: {
          dark: respostas.cor,
          light: respostas.fundo
        }
      });
      fs.writeFileSync(filePath, svgString);
    }

    console.log(chalk.green("\n✅ QR Code gerado com sucesso!"));
    console.log(chalk.yellow(`📁 Salvo em: ${filePath}\n`));

  } catch (error) {
    console.log(chalk.red("❌ Erro ao gerar QR Code:"));
    console.error(error);
  }
}

// ===============================
// LOOP PRINCIPAL
// ===============================
async function iniciar() {
  let continuar = true;

  while (continuar) {
    await gerarQRCode();

    const resposta = await inquirer.prompt([
      {
        name: "continuar",
        message: "🔁 Deseja gerar outro QR Code?",
        type: "confirm",
        default: false
      }
    ]);

    continuar = resposta.continuar;
  }

  console.log(chalk.blue("\n👋 Programa finalizado!\n"));
}

// ===============================
// INICIAR PROGRAMA
// ===============================
iniciar();

npm init -y
npm install inquirer qrcode chalk fs-extra

"type": "module"
