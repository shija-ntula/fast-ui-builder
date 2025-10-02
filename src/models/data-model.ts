import { ColumnProps, FieldProps, getColumnMetadata, getFieldMetadata, getModelMetadata, ModelProps } from "./decorators";
import { toTitle } from "../utils/helpers";
import { getGraphQLFields } from "../apis/graphql/schemas";
import { BuiltInAction } from "../utils/types";

export abstract class DataModel<T> {

  @ColumnProps({ hidden: true })
  @FieldProps({
    label: "ID",
    type: "number",
    hidden: true
  })
  id!: string | string

  // Serialize decorated fields
  toJson(action: BuiltInAction): Record<string, any> {
    const meta = getFieldMetadata(this.constructor);
    const result: Record<string, any> = {};

    for (const [field, opts] of Object.entries(meta)) {
      if (
        action === BuiltInAction.Create && !opts.noCreate || 
        action === BuiltInAction.Update && !opts.noUpdate
      ) {
        const value = (this as any)[field];

        // ✅ If value is a subclass of DataModel, use its id
        if (value instanceof DataModel) {
          result[`${field}Id`] = value.id;
        } else {
          result[field] = value;
        }
      }
    }

    return result;
  }
  
  // Create graphql schema
  static getGraphqlFields(moreFields?: { field: string }[]): string {
    const metas = getColumnMetadata(this)
    const fields = []

    for (const [field, opts] of Object.entries(metas)) {
      if (opts.computed) {
        continue
      }

      if (opts.displayFields) {
        fields.push({ field: `${field}.id` });
        for (const displayField of opts.displayFields) {
          fields.push({ field: `${field}.${displayField}` });
        }
      } else {
        fields.push({ field });
      }
    }

    if (moreFields) {
      fields.push(...moreFields);
    }

    return getGraphQLFields(fields);
  }

  // Deserialize and return a new instance
  static fromJson<T extends DataModel<T>>(this: new () => T, json: any): T {
    const instance = new this();
    const meta = getColumnMetadata(this);

    for (const [field, opts] of Object.entries(meta)) {
      // if (!opts.hidden && field in json) {
        // @ts-ignore
        instance[field] = json[field];
      // }
    }

    return instance;
  }


  // Return class name as snake_case
  getEndpoint(): string {
    const className = getModelMetadata(this.constructor).name;
    return '/' + className
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }
  
  getEndpointPlural(): string {
    return this.getEndpoint() + 's';
  }


  static getModelTitle(): string {
    return toTitle(getModelMetadata(this).name);
  }

  static getModelTitlePlural(): string {
    return `${this.getModelTitle()}s`;
  }
  
  static getModelName(): string {
    return getModelMetadata(this).name;
  }

  static getModelNamePlural(): string {
    return `${this.getModelName()}s`;
  }

  static getColumns() {
    return Object.entries(getColumnMetadata(this))
      .filter(([_, opts]) => !opts.hidden) // exclude hidden=true
      // 2) sort by numeric `order` (undefined goes to the end), then by field name
      .sort(([, aOpts], [, bOpts]) => {
        const a = typeof aOpts.order === 'number' ? aOpts.order : Number.POSITIVE_INFINITY;
        const b = typeof bOpts.order === 'number' ? bOpts.order : Number.POSITIVE_INFINITY;
        return a === b ? 0 : a - b;
      })
      // optional stable tie-breaker if orders are equal
      .sort(([aField, aOpts], [bField, bOpts]) => {
        const a = typeof aOpts.order === 'number' ? aOpts.order : Number.POSITIVE_INFINITY;
        const b = typeof bOpts.order === 'number' ? bOpts.order : Number.POSITIVE_INFINITY;
        return a === b ? aField.localeCompare(bField) : 0;
      })
      .map(([field, opts]) => ({
        field,
        header: opts.header || toTitle(field),
        hidden: opts.hidden,
        displayFields: opts.displayFields,
        order: opts.order,
        headerClass: opts.headerClass,
        rowClass: opts.rowClass,
        enum: opts.enum,
        format: opts.format
      }));
  }
  
  static getFields(action: BuiltInAction) {
    return Object.entries(getFieldMetadata(this))
      .filter(([_, opts]) => (
        action === BuiltInAction.Create && !opts.noCreate || 
        action === BuiltInAction.Update && !opts.noUpdate
      ))
      .map(([field, opts]) => ({
        ...opts,
        field: opts.createField || field + (opts.type === 'select' ? 'Id' : ''),
        label: opts.label || toTitle(field),
      }));
  }
}