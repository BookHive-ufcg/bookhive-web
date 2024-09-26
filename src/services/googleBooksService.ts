const baseURL = "https://www.googleapis.com/books/v1";
const apiKey =
  process.env.NEXT_PUBLIC_API_KEY || "AIzaSyBHaYZS1VLIRubf1Tl5XSQGBInPpAPsUVk";

const googleBooksService = {
  searchBooks: async (query: string) => {
    const queryParams = new URLSearchParams({ q: query });
    queryParams.set("orderBy", "relevance");
    queryParams.set("key", apiKey);
    queryParams.set("maxResults", "40");

    try {
      const response = await fetch(
        `${baseURL}/volumes?${queryParams.toString()}`,
      );
      const data = await response.json();
      return Promise.resolve(data);
    } catch (res: any) {
      return Promise.reject(res.data);
    }
  },

  getBookById: async (id: string) => {
    try {
      const response = await fetch(`${baseURL}/volumes/${id}`);
      const data = await response.json();
      return Promise.resolve(data);
    } catch (res: any) {
      return Promise.reject(res.data);
    }
  },
};

export default googleBooksService;
