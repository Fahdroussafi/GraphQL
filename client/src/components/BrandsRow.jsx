import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_BRAND } from "../mutations/brandMutations";
import { GET_BRANDS } from "../queries/brandQueries";

export default function BrandsRow({ brand }) {
  const [deleteBrand] = useMutation(DELETE_BRAND, {
    variables: { id: brand.id },
    // refetchQueries: [{ query: GET_BRANDS }],
    update(cache, { data: { deleteBrand } }) {
      const { brands } = cache.readQuery({ query: GET_BRANDS });
      cache.writeQuery({
        query: GET_BRANDS,
        data: { brands: brands.filter((b) => b.id !== deleteBrand.id) },
      });
    },
  });
  return (
    <tr>
      <td>{brand.IPR}</td>
      <td>{brand.Brand_name}</td>
      <td>{brand.Designation}</td>
      <td>{brand.Status}</td>
      <td>{brand.Number}</td>
      <td>{brand.Office}</td>
      <td>{brand.Nice_classification}</td>
      <td>{brand.Owner}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteBrand}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
