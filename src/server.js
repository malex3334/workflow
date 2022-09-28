import { createServer, Model } from "miragejs";

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
      // PROJECTS
      server.create("project", {
        id: "1",
        name: "Jira clone project",
        description:
          "Etiam dictum velit nisi, eget posuere risus molestie ut. Etiam eleifend, sem et aliquet convallis, sem urna tempor erat, ac iaculis turpis augue id tellus.",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("project", {
        id: "2",
        name: "Project",
        description:
          "aliquet convallis, sem urna tempor erat, ac iaculis turpis augue id tellus.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Dunder_Mifflin%2C_Inc.svg/1920px-Dunder_Mifflin%2C_Inc.svg.png",
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
      server.create("project", {
        id: "4",
        name: "secret project",
        description: "you cant see it dwight",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      // relations
      server.create("relation", {
        id: "555",
        projectID: "1",
        users: ["1", "2", "3", "5", "100"],
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
      server.create("relation", {
        id: "1124",
        projectID: "4",
        users: ["100", "1"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      // tasks
      server.create("task", {
        id: "99",
        projectID: "2",
        task: "finish project",
        text: "somet text a co",
        status: "done",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "89",
        projectID: "2",
        task: "start",
        text: "Etiam dictum velit nisi, eget posuere risus molestie ut. Etiam eleifend, sem et aliquet convallis, sem urna tempor erat, ac iaculis turpis augue id tellus.",
        status: "done",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "94",
        projectID: "2",
        task: "plan project",
        text: "some text etc.",
        status: "testing",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "51",
        projectID: "1",
        task: "finish project",
        text: "somet text a co",
        status: "done",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "894",
        projectID: "2",
        task: "start",
        text: "some text etc.",
        status: "done",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "924",
        projectID: "3",
        task: "plan project",
        text: "some text etc.",
        status: "testing",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      // USERS

      server.create("user", {
        id: "1",
        nick: "michael",
        name: "Michael Scott",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/MichaelScott.png/220px-MichaelScott.png",
      });
      server.create("user", {
        id: "2",
        nick: "tuna",
        name: "Jim Halpert",
        img: "https://www.looper.com/img/gallery/was-jim-halpert-from-the-office-secretly-a-sociopath/intro-1565015060.jpg",
      });
      server.create("user", {
        id: "100",
        name: "Dunder Mifflin",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Dunder_Mifflin%2C_Inc.svg/1920px-Dunder_Mifflin%2C_Inc.svg.png",
        nick: "nasa_1",
        type: "company",
      });
      server.create("user", {
        id: "5",
        name: "Pam Halpert",
        img: "https://wallpapercave.com/wp/wp10346398.jpg",
        nick: "pam",
        type: "user",
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

      this.delete("/api/tasks/:id", (schema, request) => {
        let id = request.params.id;
        console.log("xxxxxxxxxxxxxxxdata dump: ", this.db.dump());
        return schema.tasks.find(id).destroy();
      });

      this.patch("/api/tasks/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let task = schema.tasks.find(id);

        return task.update(newAttrs);
      });

      // users

      this.get("/api/users", (schema, request) => {
        return schema.users.all();
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
