<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h3 align="center">
  Desafio 5: FastFeet Projeto Final   
</h3>
<h1 align="center">
    <img alt="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/raw/master/.github/logo.png" width="200px"/>
</h1>

## :rocket: Sobre o desafio

Criar uma aplicação com **Node js**, **React JS**, **Reac-Native**.

<h3 align="center">
  Funcionalidades Administrador:
</h3>

1. Gestão de entregadores
Cadastrar, editar, eliminar entregadores na plataforma.

2. Gestão de encomendas
Cadastrar, editar, excluir, cancelar encomendas para os entregadores.
Quando uma encomenda for cadastrada, o entregador deve receber um e-mail informando-o sobre a nova entrega atribuída ao mesmo.
Quando uma encomenda for cancelada, o entregador deve receber um e-mail informando-o sobre o cancelamento.

3. Gestão de destinatários
Cadastrar, editar, eliminar destinatários na plataforma.

4. Gestão de problemas
Visualizar

<h3 align="center">
  Funcionalidades do entregador:
</h3>

1. Visualizar encomendas
Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade deve retornar as encomendas atribuidas a ele, que não estejam entregues ou canceladas;
Permite também que ele liste apenas as encomendas que já foram entregues por ele, com base em seu ID de cadastro;

2. Alterar status de encomendas
Permite que o entregador insira uma data de retirada (start_date) e data de entrega (end_date) para as encomendas. O entregador só pode fazer 5 retiradas por dia.
Para a funcionalidade de finalizar a entrega, permite o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.

3. Cadastrar problemas nas entregas
Cadastrar, visualizar problemas referentes a entrega.

## :clipboard: Iniciando a aplicação

1. Clone o repositório com `git clone https://github.com/rodrigodiasf1984/Desafio06.git`
2. Entre dentro da pasta do projeto e abra um terminal, para o backend é preciso 2x o terminal `cd backend, cd frontend, cd mobile`
3. Instale todas as dependencias com o comando `yarn`
4. Abra um terminal para backend API REST => Digite `yarn dev` para rodar o backend
5. Abra um terminal para backend REDIS=> Digite `yarn queue` para iniciar as filas
6. Abra um terminal para frontend =>Digite `yarn start` para iniciar o plataforma online
7. Abrir o emulador do Android
8. Abra um terminal para o Mobile => Digite `React-native run-android` para instalar o app no emulador

## :hammer: Ferramentas usadas

- ⚛️ **React-native** - Uma biblioteca JavaScript para criar mobile Apps 
- ⚛️ **Styled Components** - Biblioteca Javascript pra estilizar componentes
- 📄 **Axios** - Biblioteca Javascript para fazer requisições http
- 📄 **ESLint** - Biblioteca Javascript para procurar e resolver problemas no codigo

## :camera: Demonstração
<h1 align="center">
 
</h1>


