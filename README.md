### Prerequisites
1. To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)  
2. add .env file with ports


### Test scripts

```bash
# run unit tests
$ npm run test

# run server in dev mode
$ npm run start:dev

# run server in prod mode
$ npm run start:prod

# run server in multi mode
$ npm run start:multi
```

```bash
# test users 1 - correct, 2 - with uuid error, you can add in users.ts file as default data
{
    id: 'cfdbcfb6-f25c-4eed-bb1b-14442fc3b8a5',
    username: 'Dary',
    age: 12,
    hobbies: ['hob1'],
},
{
    id: '2',
    username: 'Dary',
    age: 12,
    hobbies: ['hob1'],
},
```