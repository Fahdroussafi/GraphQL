const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

// Brand Type
const BrandType = new GraphQLObjectType({
  name: "nissans",
  fields: () => ({
    _id: { type: GraphQLID },
    Brand_name: { type: GraphQLString },
    Logo: { type: GraphQLString },
    IPR: { type: GraphQLString },
    Designation: { type: GraphQLString },
    Status: { type: GraphQLString },
    Status_date: { type: GraphQLString },
    Number: { type: GraphQLString },
    Office: { type: GraphQLString },
    Nice_classification: { type: GraphQLString },
    Owner: { type: GraphQLString },
  }),
});

module.exports = BrandType;
