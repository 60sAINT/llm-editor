export function useDocId(
  queryString:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined
) {
  const params = new URLSearchParams(queryString);
  return params.get("doc_id");
}
