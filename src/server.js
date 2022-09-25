import { createServer, Model } from "miragejs";
import { v4 as uuidv4 } from "uuid";

console.log("render");

export default function () {
  createServer({
    models: {
      project: Model,
      user: Model,
      relation: Model,
      task: Model,
    },

    seeds(server) {
      server.create("project", {
        id: "1",
        name: "Jira clone project",
        description: "React practice project",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("project", {
        id: "2",
        name: "second test",
        description: "still testing this",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("project", {
        id: "3",
        name: "third test",
        description: "still testing this",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      // relations
      server.create("relation", {
        id: "555",
        projectID: "1",
        users: ["1", "2", "3", "100"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("relation", {
        id: "121",
        projectID: "2",
        users: ["1", "2", "3", "100"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("relation", {
        id: "222",
        projectID: "3",
        users: ["1", "100", "2", "3"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("relation", {
        id: "1124",
        projectID: "10",
        users: ["1", "100", "2", "3"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      // tasks
      server.create("task", {
        taskID: "99",
        projectID: "2",
        task: "finish project",
        text: "somet text a co",
        status: "done",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        taskID: "89",
        projectID: "2",
        task: "start",
        text: "some text etc.",
        status: "done",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        taskID: "94",
        projectID: "2",
        task: "plan project",
        text: "some text etc.",
        status: "testing",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        taskID: "99",
        projectID: "1",
        task: "finish project",
        text: "somet text a co",
        status: "done",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        taskID: "89",
        projectID: "2",
        task: "start",
        text: "some text etc.",
        status: "done",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        taskID: "94",
        projectID: "3",
        task: "plan project",
        text: "some text etc.",
        status: "testing",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    },

    routes() {
      //  ############# PROJECTS
      this.get("/api/projects", (schema, request) => {
        return schema.projects.all();
      });

      this.post("/api/projects", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // attrs.id = Math.floor(Math.random() * 100);
        console.log("data dump: ", this.db.dump());
        return schema.projects.create(attrs);
      });

      this.patch("api/projects/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let project = schema.projects.find(id);

        return project.update(newAttrs);
      });

      this.delete("/api/projects/:id", (schema, request) => {
        let id = request.params.id;
        console.log("data dump: ", this.db.dump());
        return schema.projects.find(id).destroy();
      });
      this.get("/api/projects/:id");
      //  ############# USERS
      this.get("/api/users", (schema) => {
        return schema.users.all();
      });
      //  ############# RELATIONS
      this.get("/api/relations", (schema) => {
        return schema.relations.all();
      });

      this.post("/api/relations", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // attrs.id = Math.floor(Math.random() * 100);
        console.log("data dump: ", this.db.dump());
        return schema.relations.create(attrs);
      });

      //  ############# TASKS
      this.get("/api/tasks", (schema, request) => {
        return schema.tasks.all();
      });

      this.post("/api/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // attrs.id = Math.floor(Math.random() * 100);
        console.log("data dump: ", this.db.dump());
        return schema.tasks.create(attrs);
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
}
// uuid, login, hasło, nazwa użytkownika, typ konta, pensja, created at updated at - te dwa ostatnie zawsze wszędzie się dodaje.

// Projekt
// uuid, nazwa, opis, created at updated at

// Zadanie ma
// uuid, nazwa, opis, status, created at updated at

// Komentarz:
// uuid, treść, id zadania do którego należy komentarz, created at updated at

// Timeentry (nie wiem jak to po polsku xD)
// uuid, ile czasu, ID zadania, created at updated at
