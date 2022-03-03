# Backend do desafio IPDV
## Live preview
Caso tenha algum problema na instalação do projeto, estou disponibilizando um link onde vocês poderão testar tanto o back quanto o front.

[https://ipdv-frontend.vercel.app](https://ipdv-frontend.vercel.app)

### Login: 
```
email: admin@admin.com
senha: 123456
```

## Instalação e execução

```sh
yarn install
yarn start
```

*A URL padrão está definida para ```http://localhost:4000``` mas pode ser alterada no arquivo ```.env``` usando a chave ```REACT_APP_BACKEND_URL```

## Banco de dados
Esse projeto está utilizando o SQLITE, seu schema foi gerado através de migrations localizadas no diretório:
```/src/src/database/migrations```
O arquivo do SQLITE pode ser consultado em: ```/src/src/database/db.sqlite3```

## Libs utilizadas:
 - React
 - Ant design
 - axios
 - jwt-decode
 - luzon
 - jsonwebtoken
 - react-router-dom
 - swr
