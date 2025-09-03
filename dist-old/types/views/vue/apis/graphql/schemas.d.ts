export declare const CommonGraphqlFields = "\n  code\n  message\n  status\n  errors{\n    field\n    message\n  }\n";
export declare const attachmentFields = "\n  attachmentType\n  attachmentTypeId\n  description\n  filePath\n  id\n  memType\n  title\n";
export declare function createQuery(queryName: string, requestFields: string, responseFields: string): import('graphql/language/ast').DocumentNode;
export declare function createQueryWithFilters(queryName: string, queryFields: string): import('graphql/language/ast').DocumentNode;
export declare function createQueryWithoutFilters(variables: Record<string, any>, queryName: string, queryFields: string): import('graphql/language/ast').DocumentNode;
export declare function createGetByIdQuery(queryName: string, queryFields: string): import('graphql/language/ast').DocumentNode;
export declare const getMutationSchema: (mutationName: string, requestClass: string, createMultiple?: boolean, responseFields?: string | null) => import('graphql/language/ast').DocumentNode;
export declare function getDeleteMutation(mutationQueryName: string): import('graphql/language/ast').DocumentNode;
export declare const getAttachmentMutationSchema: (mutationName: string, requestClass: string, resourceName: string, createMultiple?: boolean, responseFields?: string | null) => import('graphql/language/ast').DocumentNode;
export declare function createMutationSchema(mutationName: string, requestFields: string, responseFields?: string | null): import('graphql/language/ast').DocumentNode;
export declare function getAttachmentQuery(queryName: string, parentIdVariableName: string): import('graphql/language/ast').DocumentNode;
export declare function createAttachmentMutation(mutationQueryName: string, parentIdVariableName: string, attachmentType: string): import('graphql/language/ast').DocumentNode;
export declare function deleteAttachmentMutation(mutationQueryName: string): import('graphql/language/ast').DocumentNode;
export declare function getGraphQLFields(columns: {
    field: string;
}[]): string;
