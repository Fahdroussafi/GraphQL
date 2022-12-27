const cors = require("cors");
const colors = require("colors");
const express = require("express");
const { json, urlencoded } = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/server");
const port = 8080;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(cors({ origin: "*" }));
app.use(json());
app.use(urlencoded({ extended: true }));

// Connect to database
connectDB();

// Connect to GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
