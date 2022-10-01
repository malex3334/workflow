import {
  createServer,
  hasMany,
  Model,
  belongsTo,
  RestSerializer,
} from "miragejs";

export default function () {
  createServer({
    serializers: {
      application: RestSerializer,
      comment: RestSerializer.extend({
        include: ["user"],
        embed: true,
      }),
      relation: RestSerializer.extend({
        include: ["user"],
      }),
    },
    models: {
      project: Model.extend({
        relation: belongsTo(),
      }),

      user: Model.extend({
        comment: hasMany(),
      }),

      relation: Model.extend({
        project: belongsTo(),
      }),

      task: Model.extend({
        comments: hasMany(),
      }),

      comment: Model.extend({
        user: belongsTo(),
      }),
    },

    seeds(server) {
      // USERS

      let michael = server.create("user", {
        id: "1",
        login: "michael",
        name: "Michael Scott",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/MichaelScott.png/220px-MichaelScott.png",
      });
      let dwight = server.create("user", {
        id: "2",
        login: "dwight",
        name: "Dwight Schrute",
        email: "dwight@dunder.com",
        password: "dwight11",
        img: "https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg",
        type: "user",
      });
      let tuna = server.create("user", {
        id: "3",
        login: "tuna",
        name: "Jim Halpert",
        img: "https://www.looper.com/img/gallery/was-jim-halpert-from-the-office-secretly-a-sociopath/intro-1565015060.jpg",
      });
      let dm = server.create("user", {
        id: "100",
        login: "nasa1",
        name: "Dunder Mifflin",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Dunder_Mifflin%2C_Inc.svg/1920px-Dunder_Mifflin%2C_Inc.svg.png",
        type: "company",
      });
      let pam = server.create("user", {
        id: "5",
        name: "Pam Beasley",
        img: "https://wallpapercave.com/wp/wp10346398.jpg",
        login: "pam",
        type: "user",
      });

      // PROJECTS
      let project1 = server.create("project", {
        id: "1",
        name: "Jira clone project",
        description:
          "Etiam dictum velit nisi, eget posuere risus molestie ut. Etiam eleifend, sem et aliquet convallis, sem urna tempor erat, ac iaculis turpis augue id tellus.",
        img: "https://images.unsplash.com/photo-1574717024757-c1ec4d86ae82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      let project2 = server.create("project", {
        id: "2",
        name: "Project",
        description:
          "aliquet convallis, sem urna tempor erat, ac iaculis turpis augue id tellus.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Dunder_Mifflin%2C_Inc.svg/1920px-Dunder_Mifflin%2C_Inc.svg.png",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      let project3 = server.create("project", {
        id: "3",
        name: "third test",
        description: "still testing this",
        img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      let project4 = server.create("project", {
        id: "4",
        name: "secret project",
        description: "you cant see it dwight",
        img: "https://images.unsplash.com/photo-1664466935816-4cf27816333e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      // relations
      let relation1 = server.create("relation", {
        id: "555",
        project: project1,

        users: ["1", "2", "3", "5", "100"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      let relation2 = server.create("relation", {
        id: "121",
        project: project2,

        users: ["1", "2", "3", "100"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      let relation3 = server.create("relation", {
        id: "222",
        project: project3,

        users: ["1", "100", "2", "3"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      let relation4 = server.create("relation", {
        id: "1124",
        project: project4,

        users: ["1", "100", "2", "3"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      // let relation5 = server.create("relation", {
      //   id: "1124",
      //   projectId: "4",
      //   users: ["100", "1"],
      //   createdAt: Date.now(),
      //   updatedAt: Date.now(),
      // });

      // tasks
      server.create("task", {
        id: "99",
        projectId: "2",
        task: "finish project",
        text: "somet text a co",
        status: "done",
        priority: "high",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "89",
        projectId: "2",
        task: "start",
        text: "Etiam dictum velit nisi, eget posuere risus molestie ut. Etiam eleifend, sem et aliquet convallis, sem urna tempor erat, ac iaculis turpis augue id tellus.",
        status: "done",
        priority: "normal",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "94",
        projectId: "2",
        task: "plan project",
        text: "some text etc.",
        status: "testing",
        priority: "low",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "51",
        projectId: "1",
        task: "finish project",
        text: "somet text a co",
        status: "done",
        priority: "very high",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "894",
        projectId: "2",
        task: "start",
        text: "some text etc.",
        status: "done",
        priority: "low",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("task", {
        id: "924",
        projectId: "3",
        task: "plan project",
        text: "some text etc.",
        status: "testing",
        priority: "normal",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      // comments
      server.create("comment", {
        id: "888",
        taskID: "89",
        text: "this is my firs comment in this app",
        user: dwight,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("comment", {
        id: "555",
        taskID: "89",
        text: "does it work",
        user: pam,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("comment", {
        id: "888",
        taskID: "89",
        text: "this is my firs comment in this app",
        user: dwight,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      server.create("comment", {
        id: "777",
        taskID: "94",
        text: "this is my second comment",
        user: dwight,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    },

    routes() {
      this.resource("user");
      this.resource("comments");
      this.resource("relations");
      this.resource("projects");
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
        return [schema.relations.all(), schema.users.all()];
      });

      this.post("/api/relations", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // attrs.id = Math.floor(Math.random() * 100);
        console.log("data dump: ", this.db.dump());
        return schema.relations.create(attrs);
      });

      this.patch("api/relations/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let project = schema.relations.find(id);

        return project.update(newAttrs);
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

      // ########## COMMENTS
      this.get("/api/comments", (schema, request) => {
        return schema.comments.all();
      });

      this.post("/api/comments", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // attrs.id = Math.floor(Math.random() * 100);
        console.log("data dump: ", this.db.dump());
        return schema.comments.create(attrs);
      });

      this.delete("/api/comments/:id", (schema, request) => {
        let id = request.params.id;
        console.log("xxxxxxxxxxxxxxxdata dump: ", this.db.dump());
        return schema.comments.find(id).destroy();
      });

      // this.post("comments");
      // // users

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
