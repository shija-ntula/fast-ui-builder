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

export const enumToOptions = (e: Record<string, string>) => {
  return Object.entries(e).map(([key, value]) => ({
    label: value,
    value: key
  }));
}

export const fieldValue = (col: any, row: any) => {
  const value = row[col.field ?? col];
  
  if (col.enum) {
    return col.enum[value] ?? value; // translate enum key
  }

  if (col.format) {
    return col.format(value);
  }

  return value;
}
