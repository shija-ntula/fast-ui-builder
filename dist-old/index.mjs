var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/models/decorators.ts
import "reflect-metadata";
var COLUMN_METADATA_KEY = Symbol("column_metadata");
var getMetadataKey = (target) => `column_metadata_${target}`;
function FieldProps(options = {}) {
  return function(target, propertyKey) {
    const ctor = target.constructor;
    const existing = Reflect.getMetadata(getMetadataKey(ctor.name), ctor) || {};
    existing[propertyKey] = { field: propertyKey, ...options };
    Reflect.defineMetadata(getMetadataKey(ctor.name), existing, ctor);
  };
}
function getFieldMetadata(modelClass) {
  return Reflect.getMetadata(getMetadataKey(modelClass.name), modelClass) || {};
}

// src/utils/helpers.ts
var toTitle = (str) => {
  return str.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

// src/apis/graphql/schemas.ts
import { gql } from "@apollo/client/core";
function createQueryWithFilters(queryName, queryFields) {
  return gql`
      query ${queryName}(
        $filters: [String!],
        $page: Int!,
        $pageSize: Int!,
        $searchColumns: [String!],
        $searchQuery: String,
        $sortBy: String,
        $sortOrder: String
      ) {
        ${queryName}(
          filters: $filters,
          page: $page,
          pageSize: $pageSize,
          searchColumns: $searchColumns,
          searchQuery: $searchQuery,
          sortBy: $sortBy,
          sortOrder: $sortOrder
        ) {
          data {
            itemCount
            items {
              ${queryFields}
            }
          }
          code
          message
          status
        }
      }
    `;
}
function getGraphQLFields(columns) {
  const fieldMap = {};
  columns.forEach(({ field }) => {
    const parts = field.split(".");
    let current = fieldMap;
    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      if (!current[key]) {
        current[key] = i === parts.length - 1 ? true : {};
      }
      current = current[key];
    }
  });
  function formatFields(obj) {
    return Object.entries(obj).map(
      ([key, value]) => value === true ? key : `${key} { ${formatFields(value)} }`
    ).join(" ");
  }
  return `${formatFields(fieldMap)}`;
}

// src/models/data-model.ts
var DataModel = class {
  id;
  createdAt;
  updatedAt;
  // Serialize decorated fields
  toJson() {
    const meta = getFieldMetadata(this.constructor);
    const result = {};
    for (const [field, opts] of Object.entries(meta)) {
      if (!opts.hidden) {
        result[field] = this[field];
      }
    }
    return result;
  }
  // Create graphql schema
  getGraphqlFields() {
    const meta = getFieldMetadata(this.constructor);
    const columns = [];
    for (const [field, opts] of Object.entries(meta)) {
      if (!opts.hidden) {
        columns.push({ field: this[field] });
      }
    }
    return getGraphQLFields(columns);
  }
  // Deserialize and return a new instance
  static fromJson(json) {
    const instance = new this();
    const meta = getFieldMetadata(this);
    for (const [field, opts] of Object.entries(meta)) {
      if (!opts.hidden && field in json) {
        instance[field] = json[field];
      }
    }
    return instance;
  }
  // Return class name as snake_case
  getEndpoint() {
    const className = this.constructor.name;
    return "/" + className.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
  }
  static getModelTitle() {
    return toTitle(this.name);
  }
  static getModelTitlePlural() {
    return `${this.getModelTitle()}s`;
  }
  static getColumns() {
    return Object.entries(getFieldMetadata(this)).filter(([_, opts]) => !opts.hidden).sort(([, aOpts], [, bOpts]) => {
      const a = typeof aOpts.order === "number" ? aOpts.order : Number.POSITIVE_INFINITY;
      const b = typeof bOpts.order === "number" ? bOpts.order : Number.POSITIVE_INFINITY;
      return a === b ? 0 : a - b;
    }).sort(([aField, aOpts], [bField, bOpts]) => {
      const a = typeof aOpts.order === "number" ? aOpts.order : Number.POSITIVE_INFINITY;
      const b = typeof bOpts.order === "number" ? bOpts.order : Number.POSITIVE_INFINITY;
      return a === b ? aField.localeCompare(bField) : 0;
    }).map(([field, opts]) => ({
      field,
      header: opts.header || toTitle(field),
      hidden: opts.hidden,
      order: opts.order,
      headerClass: opts.headerClass,
      rowClass: opts.rowClass,
      format: opts.format
    }));
  }
};
__decorateClass([
  FieldProps({ hidden: true })
], DataModel.prototype, "id", 2);
__decorateClass([
  FieldProps({ order: 99 })
], DataModel.prototype, "createdAt", 2);
__decorateClass([
  FieldProps({ hidden: true })
], DataModel.prototype, "updatedAt", 2);

// src/services/crud-service.ts
var CRUDService = class {
  constructor(endpoint, Model, api) {
    this.endpoint = endpoint;
    this.Model = Model;
    this.api = api;
  }
  async list(params) {
    const rawData = await this.api.get(this.endpoint, params);
    return rawData.map((item) => this.Model.fromJson(item));
  }
  async get(id) {
    const rawData = await this.api.get(`${this.endpoint}/${id}`);
    return this.Model.fromJson(rawData);
  }
  async create(data) {
    const rawData = await this.api.post(this.endpoint, data);
    return this.Model.fromJson(rawData);
  }
  async update(data) {
    const rawData = await this.api.put(`${this.endpoint}`, data);
    return this.Model.fromJson(rawData);
  }
  async delete(id) {
    await this.api.delete(this.endpoint, id);
    return true;
  }
};

// src/models/crud-model.ts
var CRUDModel = class _CRUDModel extends DataModel {
  static features = {
    create: true,
    search: true,
    filter: true,
    sort: true,
    view: true,
    update: true,
    delete: true,
    bulk: true,
    export: true
  };
  service;
  api;
  constructor(api, endpoint) {
    super();
    this.api = api || activeApi;
    this.service = new CRUDService(
      endpoint || this.getEndpoint(),
      this.constructor,
      api || activeApi
    );
  }
  async fetchAll(paginationParams = defaultParams, options) {
    if (this.api instanceof GraphQLApi) {
      return await this.api.query(
        `getAll${_CRUDModel.getModelTitlePlural()}`,
        createQueryWithFilters(
          `getAll${_CRUDModel.getModelTitlePlural()}`,
          this.getGraphqlFields()
        ),
        paginationParams,
        options
      );
    } else if (this.api instanceof RestApi) {
      const result = await this.api.get(paginationParams);
    }
    return [];
  }
  async create(data) {
    return await this.service.create(data);
  }
  async update(data) {
    return await this.service.update(data);
  }
  async delete(id) {
    return await this.service.delete(id);
  }
};
var PaginationParams = class {
  page = 1;
  pageSize = 10;
  sortBy;
  sortOrder;
  search;
  filters;
  constructor(init) {
    Object.assign(this, init);
  }
};
var defaultParams = new PaginationParams();

// src/interfaces/attachable.ts
var Attachable = class {
  // or 'graphql'
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  static apiType = "rest";
  async getAll() {
  }
  async create(data) {
  }
  // add more CRUD as needed
};

// src/interfaces/workfloable.ts
var Workfloable = class {
  // or 'graphql'
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  static apiType = "rest";
  async getAll() {
  }
  async create(data) {
  }
  // add more CRUD as needed
};

// src/apis/rest/api.ts
var RestApi = class {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async create(data) {
    const res = await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

// src/apis/graphql/api.ts
var GraphQLApi = class {
  constructor(client) {
    this.client = client;
  }
  async mutate(mutationName, mutation, variables, options) {
    try {
      const { data } = await this.client.mutate({
        mutation,
        variables: { inputData: variables },
        context: {
          ...options
        }
      });
      return data[mutationName];
    } catch (error) {
      console.error("GraphQL error:", error);
      throw error;
    }
  }
  async query(queryName, query, params = defaultParams, options = {}) {
    try {
      const { data } = await this.client.query({
        query,
        variables: { ...params },
        context: {
          ...options
        }
      });
      return data[queryName];
    } catch (error) {
      console.error("GraphQL error:", error);
      throw error;
    }
  }
};

// src/utils/types.ts
var BuiltInAction = /* @__PURE__ */ ((BuiltInAction2) => {
  BuiltInAction2["Create"] = "create";
  BuiltInAction2["Update"] = "update";
  BuiltInAction2["Delete"] = "delete";
  BuiltInAction2["Export"] = "export";
  return BuiltInAction2;
})(BuiltInAction || {});

// src/index.ts
var activeApi;
function setApi(api) {
  activeApi = api;
}
function getApi() {
  return activeApi;
}
export {
  Attachable,
  BuiltInAction,
  COLUMN_METADATA_KEY,
  CRUDModel,
  DataModel,
  FieldProps,
  GraphQLApi,
  PaginationParams,
  RestApi,
  Workfloable,
  activeApi,
  defaultParams,
  getApi,
  getFieldMetadata,
  setApi
};
