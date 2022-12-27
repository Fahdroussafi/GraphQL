import { FaTrash } from "react-icons/fa";

export default function BrandsRow({ brand }) {
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
        <button className="btn btn-danger btn-sm">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
