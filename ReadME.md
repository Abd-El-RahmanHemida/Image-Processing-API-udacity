#Image processing API

    use :-
    Node.js
    express
    typescript
    jasmine
    supertest
    sharp
    prettier
    eslint
    nodemon

##scripts:-
prettier: "prettier --config .prettierrc src/\*_/_.ts --write",
lint: "eslint .",
build: "npx tsc",
jasmine:"jasmine",
test: "npm run build && npm run jasmine",
go: "nodemon src/index.ts",
start: "npm run build && npm run go"

to see my project:-
type "npm run start"
and go to "http://localhost:3000/api/images"

##by Abdelrahman Hemida
