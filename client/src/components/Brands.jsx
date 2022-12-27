import { gql, useQuery } from "@apollo/client";
import BrandsRow from "./BrandsRow";

const GET_BRANDS = gql`
  query GetBrands {
    brands {
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

export default function Brands() {
  const { loading, error, data } = useQuery(GET_BRANDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>IPR</th>
              <th>Brand Name</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Number</th>
              <th>Office</th>
              <th>Nice Classification</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {data.brands.map((brand, _id) => (
              <BrandsRow key={_id} brand={brand} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
