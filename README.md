## Happy

Aplicação escrita durante o Next Level Week #3 da Rocketseat.

---

## Linguagens, Libs e Frameworks utilizados:

**Typescript**
- Com tipagens especificas de cada pacote (`yarn add @types/[nome-do-pacote]`)

---

**Frontend - ReactJS**
- Template - [create-react-app](https://github.com/facebook/create-react-app)
- [react-router-dom](https://reactrouter.com) (Roteamento das páginas/componentes)
- [react-icons](https://react-icons.github.io/react-icons) - Lib de ícones-padrão;
- [react-leaflet](https://react-leaflet.js.org) - (Usando tileset do OpenStreetMaps);

---

**Backend - NodeJS**
- [cors](https://www.npmjs.com/package/cors) - Para possibilitar uso de [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing);
- [express-async-errors](https://www.npmjs.com/package/express-async-errors) - Para facilitar gerenciamento de erros em funções assíncronas;
- [morgan](https://www.npmjs.com/package/morgan) - Logging básico dos requests
- [multer](https://www.npmjs.com/package/multer) - Para upload de imagens;
- [yup](https://www.npmjs.com/package/yup) - Para validação dos inputs;

---

**Banco de dados**
- [SQLite](https://www.sqlite.org)
- [TypeORM](https://typeorm.io)

---
## Instalação (Linux/Debian)

#### Clonar este repositório
`$ git clone https://github.com/dnbtr/nlw3-happy.git`


**#### Na Pasta /server**
#### Criar as tabelas do banco de dados com o comando
`$ yarn typeorm migration:run`

#### Iniciar o servidor 
`$ yarn run dev`

**#### Na Pasta /web**
#### Iniciar o front-end
`$ yarn start`

#### Caso contrário, ao tentar usar as APIs, receberá erros do tipo:
```
QueryFailedError: SQLITE_ERROR: no such table: orphanages
```

## To-do

- Melhorar a estrutura de logs;
- Melhorar as validações de dados e inputs;
- Colocar mais funcionalidades, como exclusão de fotos, etc;
