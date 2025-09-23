// decorators.ts
import 'reflect-metadata';
import { ColumnPropsOptions, FieldPropsOptions, ModelDefOptions } from 'src/utils/types';

const MODEL_METADATA = 'model_metadata';
const COLUMN_METADATA = 'column_metadata';
const FIELD_METADATA = 'field_metadata';

const getMetadataKey = (type: string, target: any) => `${type}_${target}`;

export function ModelProps(options: ModelDefOptions = { name: 'Unknown' }) {
  return function (target: Function) {  // <-- single argument, class constructor
    const existing = Reflect.getMetadata(MODEL_METADATA, target) || {};
    existing['__modelOptions'] = options; // store options under a special key
    Reflect.defineMetadata(MODEL_METADATA, existing, target);
  };
}

export function getModelMetadata(modelClass: any): ModelDefOptions {
  const meta = Reflect.getMetadata(MODEL_METADATA, modelClass) || {};
  return meta['__modelOptions'] || { name: 'Unknown' };
}

export function ColumnProps(options: ColumnPropsOptions = {}) {
  return function (target: any, propertyKey: string) {
    const ctor = target.constructor;
    const existing = Reflect.getMetadata(getMetadataKey(COLUMN_METADATA, ctor.name), ctor) || {};
    existing[propertyKey] = { field: propertyKey, ...options };
    Reflect.defineMetadata(getMetadataKey(COLUMN_METADATA, ctor.name), existing, ctor);
  };
}

export function getColumnMetadata(modelClass: any): Record<string, ColumnPropsOptions> {
  return getAllMetadata(modelClass, COLUMN_METADATA);
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
  return getAllMetadata(modelClass, FIELD_METADATA);
}

// Helper function to traverse prototype chain and collect metadata
function getAllMetadata(modelClass: any, metadataType: string): Record<string, any> {
  const metadata: Record<string, any> = {};
  
  // Traverse the prototype chain
  let currentClass = modelClass;
  while (currentClass && currentClass !== Object.prototype.constructor) {
    const classMetadata = Reflect.getMetadata(
      getMetadataKey(metadataType, currentClass.name), 
      currentClass
    ) || {};
    
    // Merge metadata, with child class properties overriding parent class properties
    Object.assign(metadata, classMetadata);
    
    // Move up the prototype chain
    currentClass = Object.getPrototypeOf(currentClass);
    
    // Stop if we reach the base Object class or a class without a prototype
    if (!currentClass || currentClass === Object || currentClass.name === 'Object') {
      break;
    }
  }
  
  return metadata;
}

// Alternative: More robust version that handles anonymous classes
function getAllMetadataRobust(modelClass: any, metadataType: string): Record<string, any> {
  const metadata: Record<string, any> = {};
  
  const visited = new Set();
  let current = modelClass;
  
  while (current && current !== Function.prototype && !visited.has(current)) {
    visited.add(current);
    
    // Get class name safely
    const className = current.name || 'AnonymousClass';
    const classMetadata = Reflect.getMetadata(
      getMetadataKey(metadataType, className), 
      current
    ) || {};
    
    // Merge metadata (child classes override parent classes)
    Object.assign(metadata, classMetadata);
    
    // Move up the prototype chain
    current = Object.getPrototypeOf(current);
    
    // Break if we reach the end of the chain
    if (!current || current === Object.prototype.constructor) {
      break;
    }
  }
  
  return metadata;
}