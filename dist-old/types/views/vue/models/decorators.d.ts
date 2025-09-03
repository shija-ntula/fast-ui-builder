import { FieldPropsOptions } from 'src/utils/types';
export declare const COLUMN_METADATA_KEY: unique symbol;
export declare function FieldProps(options?: FieldPropsOptions): (target: any, propertyKey: string) => void;
export declare function getFieldMetadata(modelClass: any): Record<string, FieldPropsOptions>;
