require("dotenv").config();
const path = require('path');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const schema = require("./schema/schema");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

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