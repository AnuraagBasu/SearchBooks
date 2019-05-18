export const searchBooks = (query: string = "") => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = () => {
      resolve(JSON.parse(request.response));
    };
    request.open("GET", `https://openlibrary.org/search.json?q=${query}&limit=10`);
    request.send();
  });
};
