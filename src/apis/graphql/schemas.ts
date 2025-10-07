import { gql } from '@apollo/client/core';

export const CommonGraphqlFields = `
  code
  message
  status
  errors{
    field
    message
  }
`

export const attachmentFields = `
  attachmentType
  attachmentTypeId
  description
  filePath
  id
  memType
  title
`

const createRequestTuple = (requestFields: string) => {
  return requestFields.replace(/\$([a-zA-Z0-9_]+):\s*([^,]*),?/g, (_, key) => `${key}: $${key},`).replace(/,\s*$/, '');
}

export function createQuery(queryName: string, requestFields: string, responseFields: string) {
  return gql`
    query ${queryName}(${requestFields}) {
      ${queryName}(${createRequestTuple(requestFields)}) {
        data {
          ${responseFields}
        }
        ${CommonGraphqlFields}
      }
    }
  `;
}

export function createQueryWithFilters(queryName: string, queryFields: string) {
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

export function createQueryWithoutFilters(
    variables: Record<string, any> | undefined,
    queryName: string,
    queryFields: string = ''
) {
    const variableDefinitions = variables ? Object.keys(variables)
                                        .map((key) => `$${key}: ${getGraphQLType(variables[key])}`)
                                        .join(', ') : null;

    const variableArgs = variables? Object.keys(variables)
                                        .map((key) => `${key}: $${key}`)
                                        .join(', ') : null;

    return gql`
    query ${queryName} ${variableDefinitions? '('+variableDefinitions+')' : ''} {
      ${queryName}${variableArgs? '('+variableArgs+')' : ''} {
        data {
          ${queryFields}
        }
        code
        message
        status
      }
    }
  `;
}

function getGraphQLType(value: any): string {
    if (typeof value === 'string') return 'String!';
    if (typeof value === 'number') return Number.isInteger(value) ? 'Int!' : 'Float!';
    if (typeof value === 'boolean') return 'Boolean!';
    if (Array.isArray(value)) {
        if (value.length === 0) return '[String!]!'; // default
        return `[${getGraphQLType(value[0]).replace('!', '')}!]!`;
    }
    return 'String!'; // fallback
}

export function createGetByIdQuery(queryName: string, queryFields: string, idType = 'String') {
  return gql`
      query ${queryName}($id: ${idType}!) {
        ${queryName}(id: $id) {
          data {
            ${queryFields}
          }
          code
          message
          status
        }
      }
    `;
}

export const getMutationSchema = (mutationName: string, requestClass: string | null = null, createMultiple: boolean = false, responseFields: string | null = null) => {

  if (createMultiple) {
    requestClass = `[${requestClass}!]`
  }

  return gql`
      mutation ${mutationName}${requestClass? '($inputData: ' + requestClass + '!)' : ''}{
        ${mutationName}${requestClass? '(inputData: $inputData)' : ''}{
          ${responseFields ?
      'data {' +
      responseFields +
      '}'
      : ''
    }
          ${CommonGraphqlFields}
        }
      }
    `
}

export function getDeleteMutation(mutationQueryName: string, idType = 'String') {
  const mutationString = `
      mutation ${mutationQueryName}($id: ${idType}!) {
        ${mutationQueryName}(id: $id) {
          code
          message
          status
        }
      }
    `;
  return gql([mutationString]);
}

export const getAttachmentMutationSchema = (mutationName: string, requestClass: string, resourceName: string, createMultiple: boolean = false, responseFields: string | null = null) => {

  if (createMultiple) {
    requestClass = `[${requestClass}!]`
  }

  return gql`
      mutation ${mutationName}($inputData: ${requestClass}!, $${resourceName}: String!){
        ${mutationName}(inputData: $inputData, ${resourceName}: $${resourceName}){
          ${responseFields ?
      'data {' +
      responseFields +
      '}'
      : ''
    }
          ${CommonGraphqlFields}
        }
      }
    `
}

export function createMutationSchema(mutationName: string, requestFields: string, responseFields: string | null = null) {
  return gql`
      mutation ${mutationName}(${requestFields}) {
        ${mutationName}(${createRequestTuple(requestFields)}) {
          ${responseFields ?
      'data {' +
      responseFields +
      '}'
      : ''
    }
          ${CommonGraphqlFields}
        }
      }
    `;
}

export function getAttachmentQuery(queryName: string, parentIdVariableName: string) {
  return gql`
      query ${queryName}($${parentIdVariableName}: String!) {
        ${queryName}(${parentIdVariableName}: $${parentIdVariableName}) {
          data {
            itemCount
            items {
               ${attachmentFields}
            }
          }
          code
          message
          status
        }
      }
    `;
}


export function createAttachmentMutation(mutationQueryName: string, parentIdVariableName: string, attachmentType: string) {

  const mutationString = `
      mutation ${mutationQueryName}($attachment: ${attachmentType}!, $${parentIdVariableName}: String!) {
        ${mutationQueryName}(inputData: $attachment, ${parentIdVariableName}: $${parentIdVariableName}) {
          data {
             ${attachmentFields}
          }
          code
          message
          status
        }
      }
    `;
  return gql([mutationString]);
}

export function deleteAttachmentMutation(mutationQueryName: string) {

  const mutationString = `
      mutation ${mutationQueryName}($attachmentId: String!) {
        ${mutationQueryName}(attachmentId: $attachmentId) {
          code
          message
          status
        }
      }
    `;
  return gql([mutationString]);
}

export function getGraphQLFields(columns: { field: string }[]): string {
  const fieldMap: Record<string, any> = {};

  columns.forEach(({ field }) => {
    const parts = field.split(".");
    let current = fieldMap;

    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      if (!current[key]) {
        current[key] = i === parts.length - 1 ? true : {};
      }
      current = current[key] as Record<string, any>;
    }
  });

  function formatFields(obj: Record<string, any>): string {
    return Object.entries(obj)
      .map(([key, value]) =>
        value === true ? key : `${key} { ${formatFields(value)} }`
      )
      .join(" ");
  }

  return `${formatFields(fieldMap)}`;
}