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

  // Correção na assinatura da função
  getBookById: async (id: string) => {
    try {
      const response = await googleBooksApi.get(`/volumes/${id}`);
      console.log("depurando", id);
      console.log(response);
      return response.data; // Retorno simplificado
    } catch (error) {
      console.error("Erro ao obter o livro:", error); // Log do erro
      return Promise.reject(
        error.response ? error.response.data : error.message
      ); // Garantir que retornamos a mensagem de erro correta
    }
  },

  getBookByIsbn: async (isbn: string) => {
    try {
      const response = await googleBooksApi.get(
        `/volumes?q=isbn:${isbn}&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      return response.data; // Retorno simplificado
    } catch (res: any) {
      return Promise.reject(res.data);
    }
  },
};

export default googleBooksService;
