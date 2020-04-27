import got from 'got';

export class Fetcher {
  constructor() {
    Object.freeze(this);
  }

  get<T extends any>(url: string, searchParams?: { [key: string]: number | string }) {
    return got.get<T>(url, { responseType: 'json', searchParams });
  }
  post<T extends any>(url: string, body: { [key: string]: number | string } = {}) {
    return got.post<T>(url, { responseType: 'json', body: JSON.stringify(body) });
  }
  delete<T extends any>(url: string, searchParams?: { [key: string]: number | string }) {
    return got.delete<T>(url, { responseType: 'json', searchParams });
  }
  patch<T extends any>(url: string, body: { [key: string]: number | string } = {}) {
    return got.patch<T>(url, { responseType: 'json', body: JSON.stringify(body) });
  }
}
