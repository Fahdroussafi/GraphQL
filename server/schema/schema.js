// Mongoose models
const Brand = require("../models/nissan");
// Brand Type
const BrandType = require("../types/BrandType");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    brands: {
      type: new GraphQLList(BrandType),
      resolve(parent, args) {
        return Brand.find();
      },
    },
    brand: {
      type: BrandType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Brand.findById(args.id);
      },
    },
  },
});

// Mutations - Create, Update, Delete
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add Brand
    addBrand: {
      type: BrandType,
      args: {
        Brand_name: { type: new GraphQLNonNull(GraphQLString) },
        Logo: { type: new GraphQLNonNull(GraphQLString) },
        IPR: { type: new GraphQLNonNull(GraphQLString) },
        Designation: { type: new GraphQLNonNull(GraphQLString) },
        Status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Registered" },
              progress: { value: "Pending" },
              completed: { value: "Expired" },
            },
          }),
          defaultValue: "Not Started",
        },
        Status_date: { type: new GraphQLNonNull(GraphQLString) },
        Number: { type: new GraphQLNonNull(GraphQLString) },
        Office: { type: new GraphQLNonNull(GraphQLString) },
        Nice_classification: { type: new GraphQLNonNull(GraphQLString) },
        Owner: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const brand = new Brand({
          Brand_name: args.Brand_name,
          Logo: args.Logo,
          IPR: args.IPR,
          Designation: args.Designation,
          Status: args.Status,
          Status_date: args.Status_date,
          Number: args.Number,
          Office: args.Office,
          Nice_classification: args.Nice_classification,
          Owner: args.Owner,
        });
        return brand.save();
      },
    },
    // delete Brand
    deleteBrand: {
      type: BrandType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Brand.findByIdAndRemove(args.id);
      },
    },
    // update Brand
    updateBrand: {
      type: BrandType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        Brand_name: { type: new GraphQLNonNull(GraphQLString) },
        Logo: { type: new GraphQLNonNull(GraphQLString) },
        IPR: { type: new GraphQLNonNull(GraphQLString) },
        Designation: { type: new GraphQLNonNull(GraphQLString) },
        Status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Registered" },
              progress: { value: "Pending" },
              completed: { value: "Expired" },
            },
          }),
        },
        Status_date: { type: new GraphQLNonNull(GraphQLString) },
        Number: { type: new GraphQLNonNull(GraphQLString) },
        Office: { type: new GraphQLNonNull(GraphQLString) },
        Nice_classification: { type: new GraphQLNonNull(GraphQLString) },
        Owner: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Brand.findByIdAndUpdate(
          args.id,
          {
            $set: {
              Brand_name: args.Brand_name,
              Logo: args.Logo,
              IPR: args.IPR,
              Designation: args.Designation,
              Status: args.Status,
              Status_date: args.Status_date,
              Number: args.Number,
              Office: args.Office,
              Nice_classification: args.Nice_classification,
              Owner: args.Owner,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
