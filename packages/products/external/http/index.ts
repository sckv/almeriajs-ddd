import got from 'got';

export class Fetcher {
  constructor() {
    Object.freeze(this);
  }

  static async get(url: string, searchParams?: { [key: string]: number | string }) {
    return got.get(url, { searchParams });
  }
  static async post(url: string, body: { [key: string]: number | string } = {}) {
    return got.post(url, { body: JSON.stringify(body) });
  }
  static async delete(url: string, searchParams?: { [key: string]: number | string }) {
    return got.delete(url, { searchParams });
  }
  static async patch(url: string, body: { [key: string]: number | string } = {}) {
    return got.patch(url, { body: JSON.stringify(body) });
  }
}
