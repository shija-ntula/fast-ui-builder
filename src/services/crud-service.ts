import { DataModel } from '../models/data-model';
import { ApiInterface } from '../interfaces/api';
import { RestApi } from 'src/apis/rest-api';
import { CRUDModel } from 'src/models/crud-model';

export class CRUDService<
  T extends DataModel<T>,
  C extends typeof DataModel = typeof DataModel
> {

  constructor(
    private endpoint: string,
    private Model: C & (new () => T),
    private api: ApiInterface
  ) {
  }

  async list(params?: any): Promise<T[]> {
    const rawData = await this.api.get<any[]>(this.endpoint, params);
    return rawData.map((item) => this.Model.fromJson(item));
  }

  async get(id: string): Promise<T> {
    const rawData = await this.api.get<any>(`${this.endpoint}/${id}`);
    return this.Model.fromJson(rawData);
  }

  async create(data: Partial<T>): Promise<T> {
    const rawData = await this.api.post<any>(this.endpoint, data);
    return this.Model.fromJson(rawData);
  }

  async update(data: Partial<T>): Promise<T> {
    const rawData = await this.api.put<any>(`${this.endpoint}`, data);
    return this.Model.fromJson(rawData);
  }

  async delete(id: number | string): Promise<boolean> {
    await this.api.delete(this.endpoint, id);
    return true;
  }
}