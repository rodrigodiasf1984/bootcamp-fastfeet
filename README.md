
<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h3 align="center">
   FastFeet Projeto Final   
</h3>
<h1 align="center">
    <img alt="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/raw/master/.github/logo.png" width="200px"/>
</h1>

## :rocket: Sobre o desafio

Criar uma aplicação com **Node js**, **React JS**, **Reac-Native**.

<h3 align="center">
  Funcionalidades do Administrador:
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
Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade deve retornar as encomendas atribuídas a ele, que não estejam entregues ou canceladas;
Permite também que ele liste apenas as encomendas que já foram entregues por ele, com base em seu ID de cadastro;

2. Alterar status de encomendas
Permite que o entregador insira uma data de retirada (start_date) e data de entrega (end_date) para as encomendas. O entregador só pode fazer 5 retiradas por dia.
Para a funcionalidade de finalizar a entrega, permite o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.

3. Cadastrar problemas nas entregas
Cadastrar, visualizar problemas referentes a entrega.

### :pencil: Requerimentos

_Programas necessários:_
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Android Studio](https://developer.android.com/studio)


# 🗄️ Base de dados da aplicação
- [Postgres](https://github.com/postgres/postgres)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Postbird](https://www.electronjs.org/apps/postbird)

### É necessário instalar [docker](https://www.docker.com/) versão desktop. Após a instalação, abre o docker desktop e depois execute os comandos a seguir no powershell do windows :

```
# Criar um container com a imagem do Redis
docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine

# Criar um container com a imagem do Postgres
docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres
(O login e senha serão: fastfeet)

# Inicie o Redis
docker start redisfastfeet

# Inicie o Postgres
docker start fastfeet

```

# 🖥 Iniciando a API REST

1. Clonar o repositório com `git clone https://github.com/rodrigodiasf1984/bootcamp-fastfeet.git`
2. Entre dentro da pasta do projeto com `cd bootcamp-fastfeet/backend`
3. Instale todas as dependências com o comando `yarn`
4. Criar a base de dados fastfeet no postbird 
5. Executar as migrations para criar a base de dados:
6. `yarn sequelize db:migrate`
7. É necessário criar o utilizador Admin execute o comando: 
8. `yarn sequelize db:seed:all`
7. Para excutar a api execute o comando a seguir no terminal:
8. `yarn dev` 
9. Para executar as filas execute no terminal 
10. `yarn queue`
11. Para testar as rotas use a aplicação seguinte:
12. **https://insomnia.rest/**

# 💻 Iniciando a plataforma web

1. Abra um terminal entre na pasta `cd bootcamp-fastfeet/frontend`
2. Instale todas as dependências com o comando `yarn`
3. Para inicializar a plataforma execute o comando: 
4. `yarn start`
5. Uma nova aba do navegador abrirá url http://localhost:3000 
6. Efetue o login na plataforma: 
      _Use estes dados para realizar login na aplicação:_
      <blockquote><strong>Email:</strong> admin@fastfeet.com</blockquote>
      <blockquote> <strong>Senha:</strong> 123456</blockquote>
  
# 📱 Iniciando o app mobile(Android)

1. Abra o Android studio 
2. Abra o AVD Manager
3. Inicie o emulador
4. Abra o terminal na pasta `cd bootcamp-fastfeet/mobile` e execute:
5. Instale todas as dependências com o comando `yarn`
6. adb reverse tcp:9090 tcp:9090 (Reactotron)
7. adb reverse tcp:3333 tcp:3333
8. `react-native run-android` para instalar o app no emulador 
9. Faça o login com o ID do entregador

## :hammer: Ferramentas utilizadas

- ⚛️ **React-native** - É uma Biblioteca JavaScript para criar mobile Apps 
- ⚛️ **ReactJs** - É uma Biblioteca Javascript para criar interfaces de usuário.
- 💅 **Styled Components** - É uma Biblioteca Javascript pra estilizar componentes.
- 📄 **Axios** - É uma Biblioteca Javascript para fazer requisições http
- 📄 **ESLint** - É uma Biblioteca Javascript para procurar e resolver problemas de identaçãô e outros no código
- 📄 **Redux** - É um controlador de estados gerais da aplicação.
- 📄 **Redux-saga** - É Biblioteca que foca em fazer os efeitos colaterais(ex: chamadas assíncronas).
- 📄 **react-native-tiny-toast** - É Biblioteca para criar toasts nativos para o mobile. 
- 📄 **react-toastify** - É Biblioteca para criar toasts para web. 
- 📄 **Immer** - É Biblioteca para alterar estados usando draft(rascunho). 
- 📄 **React Navigation V5** - Permite trabalhar com rotas e navegação no react-native. 

## :camera: Demonstração

<h1 align="center">
  <img alt="FastFeet" src="https://github.com/rodrigodiasf1984/bootcamp-fastfeet/blob/master/Gif/fastfeet.gif"
 />
</h1>

<h3 align="center">
  👍 Obrigado a todos, que de alguma forma direta ou indireta contribuíram na realização deste projeto!
</h3>

