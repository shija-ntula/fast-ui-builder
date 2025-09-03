import { ApiInterface } from '../interfaces/api';

export class RestApi implements ApiInterface {
  constructor(private baseUrl: string) {}

  async get<T>(url: string, params?: any): Promise<T> {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await fetch(`${this.baseUrl}${url}${query}`);
    return res.json();
  }

  async post<T>(url: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.json();
  }

  async put<T>(url: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.json();
  }

  async delete<T>(url: string, id: string | number): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, { method: 'DELETE' });
    return res.json();
  }
}