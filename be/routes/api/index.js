var express = require('express');
var path = require("path") 
var router = express.Router();
var testRouter = require('./test');
var userRouter = require('./users');

// graphql
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

router.use('/', (req, res, next)=>{
  next()
}, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = router;