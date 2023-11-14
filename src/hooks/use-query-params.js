import queryString from "query-string";
import { useLocation } from "react-router-dom";

export default function useQueryParams() {
  const { search } = useLocation();
  return queryString.parse(search);
}
