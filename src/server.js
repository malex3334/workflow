import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/movies", () => {
      return {
        movies: [
          { name: "Inception", year: 2010 },
          { name: "Interstellar", year: 2014 },
          { name: "Dunkirk", year: 2017 },
        ],
      };
    });
  },
});
