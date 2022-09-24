import { createServer, Model } from "miragejs";
import { v4 as uuidv4 } from "uuid";

createServer({
  models: {
    projects: Model,
    users: Model,
    relations: Model,
  },

  routes() {
    this.namespace = "api";

    this.get("/projects", (schema, request) => {
      return schema.projects.all();
    });

    this.get("/projects/:id");

    this.get("/users", (schema) => {
      return schema.users.all();
    });

    this.get("relations", (schema) => {
      return schema.relations.all();
    });
  },

  seeds(server) {
    server.create("project", {
      id: "1",
      name: "Jira clone project",
      description: "React practice project",
      createdAt: Date.now(),
    });
    server.create("project", {
      id: "2",
      name: "second test",
      description: "still testing this",
      createdAt: Date.now(),
    });
    server.create("project", {
      id: "3",
      name: "third test",
      description: "still testing this",
      createdAt: Date.now(),
    });
    // relations
    server.create("relation", {
      id: "555",
      projectID: "1",
      users: ["1", "2", "3"],
    });
    server.create("relation", {
      id: "121",
      projectID: "2",
      users: ["1", "2", "3"],
    });
    server.create("relation", {
      id: "222",
      projectID: "3",
      users: ["2", "3"],
    });
  },

  // seeds(server) {
  //   server.create("user", {
  //     id: 1,
  //     name: "Dwight Schrute",
  //     login: "dwight",
  //     image: "",
  //     password: "123123",
  //   });
  // },
});

// uuid, login, hasło, nazwa użytkownika, typ konta, pensja, created at updated at - te dwa ostatnie zawsze wszędzie się dodaje.

// Projekt
// uuid, nazwa, opis, created at updated at

// Zadanie ma
// uuid, nazwa, opis, status, created at updated at

// Komentarz:
// uuid, treść, id zadania do którego należy komentarz, created at updated at

// Timeentry (nie wiem jak to po polsku xD)
// uuid, ile czasu, ID zadania, created at updated at
