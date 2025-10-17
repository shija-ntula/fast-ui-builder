import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiInterface } from '../../interfaces/api'

/**
 * Generic REST service for reusable CRUD and arbitrary HTTP requests.
 */
export class RestApi implements ApiInterface {

  restClient: AxiosInstance
  constructor(private client: AxiosInstance) {
    this.restClient = client
  }

  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.restClient.get(endpoint, config)
    return response.data
  }

  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.restClient.post(endpoint, data, config)
    return response.data
  }

  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.restClient.put(endpoint, data, config)
    return response.data
  }

  async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.restClient.patch(endpoint, data, config)
    return response.data
  }

  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.restClient.delete(endpoint, config)
    return response.data
  }

  /**
   * Custom request for rare cases where you want to specify method manually.
   */
  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.restClient.request(config)
    return response.data
  }

  async downloadFile(endpoint: string, config?: AxiosRequestConfig, autoSave = true): Promise<Blob> {
    const response: AxiosResponse<Blob> = await this.restClient.get(endpoint, {
      ...config,
      responseType: 'blob',
    })

    const blob = response.data

    if (autoSave && typeof window !== 'undefined') {
      const contentDisposition = response.headers['content-disposition']
      let filename = 'downloaded-file'

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/)
        if (match?.[1]) filename = match[1]
      }

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    }

    return blob
  }
}
