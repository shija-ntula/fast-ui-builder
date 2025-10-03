import { FormWapper } from "../utils/types";

export interface CRUDFeatures {
  create?: boolean;
  search?: boolean;
  filter?: boolean;
  sort?: boolean;
  view?: boolean;
  update?: boolean;
  formWrapper: FormWapper;
  delete?: boolean;
  bulk?: boolean;
  import?: boolean;
  export?: boolean;
  attachment?: boolean;
  workflow?: boolean;
  pagination?: boolean;
}