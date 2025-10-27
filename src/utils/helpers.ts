export const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 500) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

export const toCamelCase = (name: string): string => {
  if (!name) return name

  return name
    // Replace underscores, dashes, or spaces followed by a letter → uppercase that letter
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    // Ensure the first letter is lowercase
    .replace(/^[A-Z]/, c => c.toLowerCase())
}

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

export const toSnakeCase = (str: string): string => {
  return (
    str
      // Replace spaces and hyphens with underscores
      .replace(/[\s-]+/g, "_")
      // Insert underscore before any capital letter (except first)
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
      // Lowercase everything
      .toLowerCase()
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

export const isObject = (val: any): val is Record<string, unknown> => {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
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
      value = isObject(value) ? value[field] : value;
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

export const clearObject = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].length = 0
    } else if (obj[key] !== null && typeof obj[key] === 'object') {
      clearObject(obj[key]) // recursive clear
    } else {
      obj[key] = '' // set scalar fields to empty string
    }
  }
}