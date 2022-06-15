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

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

router.get('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html')); 
});

router.use('/test', testRouter);
router.use('/user', userRouter);

module.exports = router;
