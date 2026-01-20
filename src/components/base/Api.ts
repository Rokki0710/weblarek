// Методы для запросов с телом
type ApiPostMethods = "POST" | "PUT" | "DELETE";

// Класс для работы с API
export class Api {
  readonly baseUrl: string;
  protected options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        ...((options.headers as object) ?? {}),
      },
    };
  }

  // Обработка ответа от сервера
  protected handleResponse<T>(response: Response): Promise<T> {
    console.log(`API Response: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      return response.json();
    } else {
      return response
        .json()
        .then((data) => {
          console.error("API Error Details:", data);
          return Promise.reject(data.error ?? response.statusText);
        })
        .catch(() => {
          console.error("API Error (no JSON):", response.statusText);
          return Promise.reject(response.statusText);
        });
    }
  }

  // GET запрос
  get<T extends object>(uri: string) {
    const url = this.baseUrl + uri;
    console.log(`API GET: ${url}`);
    
    return fetch(url, {
      ...this.options,
      method: "GET",
    })
    .then(this.handleResponse<T>)
    .catch((error) => {
      console.error("API Fetch Error:", error);
      throw error;
    });
  }

  // POST/PUT/DELETE запросы
  post<T extends object>(
    uri: string,
    data: object,
    method: ApiPostMethods = "POST"
  ) {
    const url = this.baseUrl + uri;
    console.log(`API ${method}: ${url}`, data);
    
    return fetch(url, {
      ...this.options,
      method,
      body: JSON.stringify(data),
    })
    .then(this.handleResponse<T>)
    .catch((error) => {
      console.error("API Post Error:", error);
      throw error;
    });
  }
}