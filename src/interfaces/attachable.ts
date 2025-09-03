export class Attachable {
  static apiType = 'rest' // or 'graphql'

  constructor(public endpoint: string) {}

  async getAll() {
    // fetch based on apiType
  }

  async create(data: any) {
    // ...
  }

  // add more CRUD as needed
}