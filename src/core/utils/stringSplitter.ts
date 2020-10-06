export function splitField(fieldName: string) {
  const cappedFieldName =
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  return cappedFieldName.match(/[A-Z][a-z]+|[0-9]+/g)?.join(" ");
}

export function splitFieldCustom(fieldName: string) {
  if (fieldName === "serialNumber") {
    return "S/N";
  }
  return splitField(fieldName);
}
