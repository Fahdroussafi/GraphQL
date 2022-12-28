import { gql } from "@apollo/client";

const GET_BRANDS = gql`
  query GetBrands {
    brands {
      id
      IPR
      Brand_name
      Designation
      Status
      Number
      Office
      Nice_classification
      Owner
    }
  }
`;

export { GET_BRANDS };
