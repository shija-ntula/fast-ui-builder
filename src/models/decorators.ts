// decorators.ts
import 'reflect-metadata';
import { ColumnPropsOptions, FieldPropsOptions } from 'src/utils/types';

export const COLUMN_METADATA_KEY = Symbol('column_metadata');

const COLUMN_METADATA = 'column_metadata'
const FIELD_METADATA = 'field_metadata'

const getMetadataKey = ( type: string, target: any) => `${type}_${target}`;

export function ColumnProps(options: ColumnPropsOptions = {}) {
  return function (target: any, propertyKey: string) {
    const ctor = target.constructor;
    const existing = Reflect.getMetadata(getMetadataKey(COLUMN_METADATA, ctor.name), ctor) || {};
    existing[propertyKey] = { field: propertyKey, ...options };
    Reflect.defineMetadata(getMetadataKey(COLUMN_METADATA, ctor.name), existing, ctor);
  };
}

export function getColumnMetadata(modelClass: any): Record<string, ColumnPropsOptions> {
  return Reflect.getMetadata(getMetadataKey(COLUMN_METADATA, modelClass.name), modelClass) || {};
}

export function FieldProps(options: FieldPropsOptions) {
  return function (target: any, propertyKey: string) {
    const ctor = target.constructor;
    const existing = Reflect.getMetadata(getMetadataKey(FIELD_METADATA, ctor.name), ctor) || {};
    existing[propertyKey] = { field: propertyKey, ...options };
    Reflect.defineMetadata(getMetadataKey(FIELD_METADATA, ctor.name), existing, ctor);
  };
}

export function getFieldMetadata(modelClass: any): Record<string, FieldPropsOptions> {
  return Reflect.getMetadata(getMetadataKey(FIELD_METADATA, modelClass.name), modelClass) || {};
}
