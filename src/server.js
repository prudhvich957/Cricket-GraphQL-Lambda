const serverless = require("serverless-http");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./schema/schema");
const Match = require("./models/Match");

const connectDB = require("./config/setupDB");

const app = require("express")();

connectDB();

app.get("/", async (req, res) => {
  const result = await Match.find().exec();
  res.status(200).json(result);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    graphiql: true,
  })
);

//app.listen(3000, () => console.log(`Server is listening on 3000`));

module.exports.handler = serverless(app);
