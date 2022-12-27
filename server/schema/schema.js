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

// Status Enum
const StatusEnum = new GraphQLEnumType({
  name: "Status",
  values: {
    REGISTERED: { value: "Registered" },
    PENDING: { value: "Pending" },
    EXPIRED: { value: "Expired" },
  },
});

// non-null string
const nonNullIntType = new GraphQLNonNull(GraphQLString, GraphQLID);

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
        Brand_name: { type: nonNullIntType },
        Logo: { type: nonNullIntType },
        IPR: { type: nonNullIntType },
        Designation: { type: nonNullIntType },
        Status: { type: nonNullIntType, enum: StatusEnum },
        Status_date: { type: nonNullIntType },
        Number: { type: nonNullIntType },
        Office: { type: nonNullIntType },
        Nice_classification: { type: nonNullIntType },
        Owner: { type: nonNullIntType },
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
      args: { id: { type: nonNullIntType } },
      resolve(parent, args) {
        return Brand.findByIdAndDelete(args.id);
      },
    },
    // update Brand
    updateBrand: {
      type: BrandType,
      args: {
        id: { type: GraphQLID },
        Brand_name: { type: nonNullIntType },
        Logo: { type: nonNullIntType },
        IPR: { type: nonNullIntType },
        Designation: { type: nonNullIntType },
        Status: { type: nonNullIntType, enum: StatusEnum },
        Status_date: { type: nonNullIntType },
        Number: { type: nonNullIntType },
        Office: { type: nonNullIntType },
        Nice_classification: { type: nonNullIntType },
        Owner: { type: nonNullIntType },
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
