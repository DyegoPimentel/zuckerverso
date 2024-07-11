🇧🇷 Português | 🇬🇧 [English](README_en.md)

# SISTEMA DE COLECIONÁVEIS INTEGRADO A BLOCKCHAIN

Este sistema foi desenvolvido para compor o projeto prático do TCC - SISTEMA DE COLECIONÁVEIS INTEGRADO A BLOCKCHAIN e foi desenvolvido pelo aluno Dyego Lourenço Pimentel, formando no curso de Pós-Graduação em Desenvolvimento Fullstack pela PUC-RS.

Este sistema é uma plataforma WEB 3 para compra e venda de NFTs (Non-Fungible Token), e utilizou de recursos como a Metamask e o Firebase para criar um sistema de login anonimizado. 

Caso tenha interesse em saber mais detalhes sobre este projeto, sinta-se avontade para ver o Documento de apresentação deste TCC [neste link]().

🟢 [Acesse o sistema para ve-lo em funcionamento](https://zuckerverso.com.br) 🟢

## 🔴 Informaçoes Importantes
- O sistema foi desenvolvido em Angular na versão 18;
- Typescript é a principal linguagem de programação utilizada neste projeto;
- É necessário ter a Metamask instalada e devidamente configurada para acessar determinados recursos no sistema, como por exemplo, favoritar itens da coleção;
- Na raiz do projeto tem uma pasta chamada `.github/workflows`, esta página contém o script utilizado para realizar o deploy automático (CI/CD) da aplicação;
-  O Firebase é parte importante do desenvolvimento, utilizei ele como um backend as a service, através dele foi feito a hospedagem e a autenticação do usuário de forma anonima.
- O Firestore foi o banco de dados escolhido pelo fato de ser noSQL e pela facilidade de integração.

## 🥷 Login Anonimizado
Esta é uma breve explicação da estrutura de login utilizado neste projeto, geralmente um login é composto por um Usuário e senha, mas isso na maior parte das vezes é desnecessário e invasivo, as vezes para simples cadastros são exigidos CPF, endereços e etc.

Aproveitando de uma das caracteristicas criadas pela Blockchain, utilizei a chave pública da carteira de criptomoedas (no nosso caso a metamask) para ser o identificador do usuário, levando em consideração que a chave pública é uma hash unica. Desta forma, quando o usuário conecta sua metamask no sistema, a chave publica é armazenada como um documento na coleção de usuários no Firestore, e este documento inicialmente tem apenas um atributo que é o array de favoritos do usuário. Conforme pode ser visto na imagem abaixo:

![Alt text](<DB noSQL - Firestore.png>)

Desta forma mantemos a integridade dos dados e sua unicidade, e não invadimos a privacidade do usuário.

Veja a seguir tudo que é necessário para rodar este projeto localmente.

## 🛠️ Pré requisitos
 [Angular CLI](https://github.com/angular/angular-cli) versão 18.0.3

 [NodeJs](https://nodejs.org/pt) versão 20.14.0

 [NVM](https://nodejs.org/pt/download/package-manager) - Gerenciador de versões do NodeJs

 [Metamask](https://metamask.io) - Carteira de Criptomoedas 

[Firebase](https://firebase.google.com/) - Responsável pelo hosting, autenticação e banco de dados noSQL(Firestore)

## 🧑‍💻 Instalando o Frontend

Após instalar todas as ferramentas citadas anteriormente, clone este repositório e acesse a pasta raiz do projeto "zuckerverso".

Instale as dependências presentes no arquivo package.json, para isso basta digitar o comando abaixo na raiz do projeto:

```
npm install
```

Assim que todas as depêndencias forem instaladas com sucesso, rode o servidor local para subir a aplicação Frontend digitando o comando abaixo:
```
ng serve
```

Se você chegou até aqui, já estará apto a acessar a url `http://localhost:4200/`. 


## 🌎 Build

Caso eventualmente queira realizar o build para subir este projeto em algum servidor, basta digitar o comando abaixo na raiz do projeto:
```
ng build
```
Este comando é responável por transformar os arquivos gerados pelo angular em arquivos estáticos, que ficarão disponíveis na pasta `dist/zuckerverso` .


## 🙏 Considerações Finais
Este projeto foi bastante desafiador e empolgante, visto que web3 e Blockchain são temas relativamente novos. Muito obrigado por ter chegado até aqui e não se esqueça de favoritar ⭐️ este repósitorio caso tenha interesse em ver mais conteúdos semelhantes a este. 
