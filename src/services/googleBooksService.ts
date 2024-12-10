import axios from "axios";

const googleBooksApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});

googleBooksApi.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.key = process.env.NEXT_PUBLIC_API_KEY;
  return config;
});

const googleBooksService = {
  searchBooks: async (query: string) => {
    try {
      const response = await googleBooksApi.get("/volumes", {
        params: {
          q: query,
          orderBy: "relevance",
          maxResults: 40,
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getBookById: async (id: string) => {
    try {
      const response = await googleBooksApi.get(`/volumes/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getBookByIsbn: async (isbn: string) => {
    try {
      const response = await googleBooksApi.get("/volumes", {
        params: {
          q: `isbn:${isbn}`,
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// Função genérica para tratar erros
function handleApiError(error: unknown): Promise<never> {
  if (axios.isAxiosError(error)) {
    console.error("Erro na API:", error.response || error.message);
    return Promise.reject(error.response ? error.response.data : error.message);
  } else {
    console.error("Erro inesperado:", error);
    return Promise.reject("Erro inesperado");
  }
}

export default googleBooksService;
