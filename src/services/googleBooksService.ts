import axios from "axios";

const googleBooksApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});

const googleBooksService = {
  searchBooks: async (query: string) => {
    const queryParams = new URLSearchParams({ q: query });
    queryParams.set("orderBy", "relevance");
    queryParams.set("key", String(process.env.NEXT_PUBLIC_API_KEY));
    queryParams.set("maxResults", "40");

    try {
      const response = await googleBooksApi.get(
        `/volumes?${queryParams.toString()}`
      );
      return response.data; // Retorno simplificado
    } catch (res: any) {
      return Promise.reject(res.data);
    }
  },

  getBookById: async (id: string) => {
    try {
      const response = await googleBooksApi.get(`/volumes/${id}`);
      console.log("depurando", id);
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao obter o livro:", error);
        return Promise.reject(
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Erro inesperado:", error);
        return Promise.reject("Erro inesperado ao obter o livro");
      }
    }
  },

  getBookByIsbn: async (isbn: string) => {
    try {
      const response = await googleBooksApi.get(
        `/volumes?q=isbn:${isbn}&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      return response.data;
    } catch (res: any) {
      return Promise.reject(res.data);
    }
  },
};

export default googleBooksService;
