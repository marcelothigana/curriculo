# Currículo Web - Marcelino de Oliveira

Sistema web para edição e visualização do currículo de Marcelino de Oliveira.

## Como funciona

Este projeto permite que você visualize seu currículo online e o converta automaticamente para PDF.

A estrutura é baseada em :
- **HTML5** para estrutura semântica
- **CSS3** com variáveis para fácil customização de cores
- **JavaScript (ES Modules)** para renderização dinâmica
- **GitHub Pages** para hospedagem
- **GitHub Actions** para deploy automático

## Estrutura do Projeto

```
curriculo-web/
├── src/
│   ├── index.html    # Página principal do currículo
│   ├── style.css     # Estilos visuais e de impressão
│   ├── app.js        # Lógica da aplicação
│   └── data.json     # Dados do currículo em formato JSON
├── .github/workflows/
│   └── deploy-pages.yml   # Deploy no GitHub Pages
├── package.json
├── .gitignore
└── README.md
```

## Como visualizar seu currículo

### Localmente (em seu computador)

#### Método 1: Abrir diretamente no navegador

1. Abra o navegador (Chrome, Firefox, Edge, etc.)
2. Arraste o arquivo `src/index.html` para a janela do navegador
3. Ou use **Ctrl+O** (Cmd+O no Mac) e selecione `src/index.html`
4. Clique no botão **"Imprimir Currículo"** no topo direito para gerar um PDF

#### Método 2: Usar servidor local (recomendado)

No terminal, execute:

```bash
python3 -m http.server 5500
```

Depois, acesse: **http://localhost:5500**

### Online (via GitHub Pages)

Acesse: `https://marcelothigana.github.io/curriculo/`

## Como editar seu currículo

A edição é feita diretamente no repositório do GitHub:

1. Acesse `https://github.com/marcelothigana/curriculo/blob/main/src/data.json`
2. Clique no ícone de lápis (✏️) para editar
3. Faça as alterações necessárias no JSON
4. Role para baixo e clique em "Commit changes"

O GitHub Actions fará o deploy automático.

## Como gerar PDF

1. Acesse o currículo no navegador
2. Clique no botão "Imprimir Currículo" (ícone de impressora no topo direito)
3. No diálogo de impressão:
   - Selecione "Salvar como PDF" como destino
   - Configure o formato como A4
   - Clique em "Salvar"

## Personalização de cores

Para mudar as cores do currículo, edite as variáveis CSS no início do arquivo `src/style.css`:

```css
:root {
  --primary-blue: #0066FF;      /* Cor principal */
  --text-dark: #1A1A1A;          /* Cor do texto principal */
  --text-muted: #555555;         /* Cor do texto secundário */
  --bg-white: #FFFFFF;           /* Cor de fundo */
}
```

---

© 2026 Currículo de Marcelino de Oliveira

Licenciado sob a [MIT License](LICENSE)
