# 💰 Calculadora de Lucro para Trabalhadores Independentes

Esta aplicação é uma calculadora de impostos desenhada especificamente para trabalhadores independentes em Portugal. O seu principal objetivo é responder a uma pergunta simples mas crucial: "Se eu realizar um serviço por um determinado valor, quanto é que vou realmente ganhar depois dos impostos?"

A calculadora foca-se no impacto de um **serviço único**, estimando o valor líquido que o trabalhador irá receber após deduzir a Segurança Social e o IRS.

<!-- Placeholder para a screenshot da aplicação -->
![Screenshot da Aplicação](App_Screenshot.webp)

## ✨ Funcionalidades

- **Cálculo de Serviço Único**: Insira o valor de um serviço e o seu rendimento anual estimado para ver o impacto fiscal.
- **Impacto na Segurança Social**: Calcula quanto este serviço específico irá acrescentar às suas contribuições trimestrais de Segurança Social.
- **Impacto no IRS**: Estima como este serviço afeta o seu escalão de IRS e o imposto anual a pagar.
- **Cálculo de Retenção na Fonte**: Permite incluir a retenção na fonte de 25% para uma estimativa mais precisa.
- **Isenção de Primeiro Ano**: Tem em conta a isenção de Segurança Social para trabalhadores no primeiro ano de atividade.
- **Breakdown Detalhado**: Apresenta uma decomposição clara de todas as deduções para que perceba exatamente para onde vai o seu dinheiro.
- **Design Moderno e Responsivo**: Interface intuitiva e visualmente apelativa que funciona em qualquer dispositivo.

## 🚀 Como Utilizar

1.  **Valor do Serviço**: Insira o valor do serviço que pretende realizar (sem IVA).
2.  **Rendimento Anual Estimado**: Forneça uma estimativa do seu rendimento anual total (excluindo este novo serviço). Este valor é crucial para calcular o impacto no seu escalão de IRS.
3.  **Opções**:
    - Marque a caixa "É o primeiro ano de atividade" se estiver isento de contribuições para a Segurança Social.
    - Marque a caixa "Cliente faz retenção na fonte" se o seu cliente for reter 25% do valor do serviço.
4.  **Calcular**: Clique no botão para ver os resultados detalhados.

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- HTML5 & CSS3
- JavaScript (ES6+)

## 🏁 Começar

Para executar este projeto localmente, siga os seguintes passos:

1.  Clone o repositório:
    ```bash
    git clone https://github.com/your-username/calculadora-de-impostos.git
    ```
2.  Navegue para a pasta do projeto:
    ```bash
    cd calculadora-de-impostos
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
A aplicação estará disponível em `http://localhost:3000`.

## ⚠️ Aviso Legal

Esta calculadora é uma ferramenta de simulação e deve ser usada apenas para fins informativos. Os cálculos são baseados na legislação fiscal portuguesa de 2024 para o regime simplificado. Os valores reais podem variar dependendo de muitos outros fatores. Consulte sempre um contabilista certificado para aconselhamento fiscal profissional.
