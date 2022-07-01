# Node/Express GraphQL API on AWS Lambda for a Sample Cricket Matches Database
This project is built with Express as the foundation, and the GraphQL APIs are built on top
using the apt. packages (express-graphql, graphql). MongoDb is used as the NoSql DB.
Finally, the serverless framework is used to direcltly deploy to AWS Lambda


The aritecture is simple and distinct:
 - src/config - Database Connection and setup
 - src/model - Mongoose Model
 - src/schema - All GraphQL Code
 - src/server.js - Express App Code

# Available Routes

 - "/" - A simple JSON response containing all the data for reference
 - "/graphql" - The graphQl editor to run all the available GraphQL API.

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-express-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-express-api-project-dev (196s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-api-project-dev-api (766 kB)
```

### Local development

You can also run the App locally as an express server by commenting/uncommenting the code at
end of src/server.js

```bash
npm run start
```
