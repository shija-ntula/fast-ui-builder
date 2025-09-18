export const toTitle = (str: string) => {
  return (
    str
      // Replace underscores with spaces
      .replace(/_/g, " ")
      // Insert a space before any capital letter (camelCase support)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Lowercase everything first, then uppercase first letter of each word
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
};

export const mergeStaticArray = <T>(cls: any, key: string): T[] => {
  const parent = Object.getPrototypeOf(cls);
  const parentValues: T[] = parent && parent[key] ? parent[key] : [];
  const ownValues: T[] = cls[key] || [];
  return Array.from(new Set([...parentValues, ...ownValues]));
};

export const enumToOptions = <T extends Record<string, string | number>>(e: T) => {
  return Object.entries(e).map(([key, label]) => ({
    value: key,   // the enum key
    label: label, // the enum value
  }))
}

export const fieldValue = (col: any, row: any) => {
  
  let value = row[col.field ?? col];

  if (col.format) {
    return col.format(value, col, row);
  }

  if (col.enum && value in col.enum) {
    return col.enum[value];
  }

  if (col.displayFields && col.displayFields.length > 0) {
    const fields = col.displayFields[0].split(".");
    for (const field of fields) {
      value = value[field];
    }
    return value;
  }

  return value
}

// export const fieldValue = (col: any, row: any) => {
//   // Helper to safely access nested values with dot notation
//   const getNested = (obj: any, path: string) =>
//     path.split(".").reduce((acc, key) => acc?.[key], obj);

//   const value = row[col.field ?? col];

//   if (col.displayFields?.length > 0) {
//     return col.displayFields
//       .map((f: string) => getNested(row, f))
//       .filter((v) => v !== undefined && v !== null)
//       .join(", ");
//   }

//   if (col.enum) {
//     return col.enum[value] ?? value; // translate enum key
//   }

//   if (col.format) {
//     return col.format(value);
//   }

//   return value;
// };
