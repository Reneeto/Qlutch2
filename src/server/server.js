require("dotenv").config();
const path = require('path');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const schema = require("./schema/schema");
const PORT = process.env.PORT || 4000;
const app = express();
const redis = require('./redis');
const qlutch = require('qlutch');

app.use(express.json());
app.use(express.static('assets'));
app.use(express.static(path.resolve('node_modules/qlutch/dist')));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve('node_modules/qlutch/dist/index.html'));
})

app.use(
    '/qlutch',
    qlutch('http://localhost:4000/graphql', redis),
    (req, res) => {
        return res.json(res.locals.response);
    }
);

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown error',
        status: 500,
        message: { err: 'An error occured' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});