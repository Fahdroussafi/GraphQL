import { gql } from "@apollo/client";

// This is the mutation that will be used to delete a brand

const DELETE_BRAND = gql`
  mutation DeleteBrand($id: ID!) {
    deleteBrand(id: $id) {
      id
    }
  }
`;

export { DELETE_BRAND };
