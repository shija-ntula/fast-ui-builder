import { ApolloClient, DocumentNode } from "@apollo/client/core";
import { defaultParams, PaginationParams } from '../../models/crud-model';
import { ApiInterface } from '../../interfaces/api';


export class RestApi implements ApiInterface {
  
  constructor(private baseUrl: string) {}

  async create(data: any) {
    const res = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }
}
