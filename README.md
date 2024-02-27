# Gerenciamento de Locadora de Filmes 🎬

Este projeto é uma aplicação web desenvolvida para gerenciar uma locadora de filmes. Foi construído utilizando Vue.js 3, Tailwind CSS, Typescript e Docker. A aplicação permite o cadastro, edição, listagem e desativação de usuários, clientes e locações. Além disso, integra-se com a API da OMDb para obter informações sobre filmes.

## Funcionalidades 🛠️

- Cadastro, edição, listagem e desativação de usuários
- Cadastro, edição, listagem e desativação de clientes
- Consumo da API da OMDb para obtenção de informações sobre filmes
- Registro de novas locações e listagem das locações existentes

## Detalhes de Implementação 🚀

- Utilização extensiva de Vue.js 3 e Tailwind CSS
- Integração com a API ViaCEP para obtenção de informações de endereço a partir do CEP
- Armazenamento de usuários, clientes e locações no local storage do navegador
- Persistência do login dos usuários entre sessões
- Feedback visual de sucesso ou falha após qualquer alteração
- Restrição de acesso para usuários desativados
- Restrição para clientes com locação ativa realizarem outra locação
- Nomenclatura seguindo o padrão americano

## Faltas e Melhorias 🚧

- Adicionar mais testes unitários para garantir a qualidade do código
- Melhorar a aplicação do Atomic Design na estrutura dos componentes
- Criar um componente de tabela com paginação para uma melhor experiência de usuário
- Refinar a responsividade da aplicação

## Rodando a Aplicação ▶️

Para executar a aplicação, basta seguir os seguintes passos:

1. Certifique-se de ter o Docker instalado em sua máquina.
2. Clone o repositório para o seu ambiente local.
3. Navegue até o diretório do projeto.
4. Execute o comando `docker-compose up --build`.
5. Aguarde até que o processo de construção e inicialização do container Docker seja concluído.
6. Acesse a aplicação através do navegador, geralmente em `http://localhost:8080`.
7. - O usuário admin é:

- **Usuário:** admin
- **Senha:** admin

## Observações 📝

- A aplicação foi desenvolvida com layouts e views bem definidas.
- Utilizou-se autenticação de rotas para controlar o acesso às diferentes partes da aplicação.
- Validou-se os formulários utilizando Veelidate + ZOD.
- O uso de CSS foi minimizado em favor do Tailwind CSS.
- Todos os componentes estão devidamente separados e responsivos.
- Foi utilizado o `faker.js` para gerar mocks de dados.
