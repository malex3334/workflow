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
      task: RestSerializer.extend({
        include: ["user"],
      }),
    },
    models: {
      project: Model.extend({
        relation: belongsTo(),
      }),

      user: Model.extend({
        comment: hasMany(),
        task: hasMany(),
      }),

      relation: Model.extend({
        project: belongsTo(),
      }),

      task: Model.extend({
        comments: hasMany(),
        user: belongsTo(),
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
        email: "michael@dunder.com",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/MichaelScott.png/220px-MichaelScott.png",
        salary: 1500,
        type: "user",
      });
      let dwight = server.create("user", {
        id: "2",
        login: "dwight",
        name: "Dwight Schrute",
        email: "dwight@dunder.com",
        password: "dwight11",
        img: "https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg",
        type: "user",
        salary: 1500,
      });
      let tuna = server.create("user", {
        id: "3",
        login: "tuna",
        name: "Jim Halpert",
        img: "https://www.looper.com/img/gallery/was-jim-halpert-from-the-office-secretly-a-sociopath/intro-1565015060.jpg",
        email: "jim@dunder.com",
        salary: 1500,
        type: "user",
      });
      let dm = server.create("user", {
        id: "100",
        login: "dunder",
        password: "michael1",
        name: "Dunder Mifflin",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Dunder_Mifflin%2C_Inc.svg/1920px-Dunder_Mifflin%2C_Inc.svg.png",
        type: "company",
        email: "dunder@dunder.com",
      });
      let pam = server.create("user", {
        id: "5",
        name: "Pam Beasley",
        img: "https://wallpapercave.com/wp/wp10346398.jpg",
        login: "pam",
        type: "user",
        email: "pam@dunder.com",
        salary: 1500,
      });

      // PROJECTS
      let project1 = server.create("project", {
        id: "1",
        name: "Jira clone project?",
        description:
          "Check this project's content to see avaliable features of this workflow organiser.",
        img: "https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        createdAt: 1664728152418,
        updatedAt: 1664729152418,
      });
      let project2 = server.create("project", {
        id: "2",
        name: "Dunder Project",
        description:
          "aliquet convallis, sem urna tempor erat, ac iaculis turpis augue id tellus.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Dunder_Mifflin%2C_Inc.svg/1920px-Dunder_Mifflin%2C_Inc.svg.png",
        createdAt: 1664728152418,
        updatedAt: 1664728652418,
      });
      let project3 = server.create("project", {
        id: "3",
        name: "Third test",
        description: "still testing this",
        img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        createdAt: 1664728152418,
        updatedAt: 1664728188418,
      });
      let project4 = server.create("project", {
        id: "4",
        name: "Secret project",
        description: "you cant see it dwight",
        img: "https://images.unsplash.com/photo-1664466935816-4cf27816333e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        createdAt: 1664728152418,
        updatedAt: 1664778152418,
      });
      // relations
      let relation1 = server.create("relation", {
        id: "555",
        project: project1,

        users: ["1", "2", "3", "5", "100"],
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      let relation2 = server.create("relation", {
        id: "121",
        project: project2,

        users: ["1", "2", "3", "100"],
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      let relation3 = server.create("relation", {
        id: "222",
        project: project3,

        users: ["1", "100", "2", "3"],
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      let relation4 = server.create("relation", {
        id: "1124",
        project: project4,

        users: ["1", "100", "3"],
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      // let relation5 = server.create("relation", {
      //   id: "1124",
      //   projectId: "4",
      //   users: ["100", "1"],
      //   createdAt: 1664728152418,
      //   updatedAt: 1664728152418,
      // });

      // tasks
      server.create("task", {
        id: "99",
        projectId: "2",
        task: "finish project",
        text: "somet text a co",
        status: "done",
        priority: "high",
        reportedTime: "1",
        estaminatedTime: "10",
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "89",
        projectId: "2",
        task: "start",
        text: "Etiam dictum velit nisi, eget posuere risus molestie ut. Etiam eleifend, sem et aliquet convallis, sem urna tempor erat, ac iaculis turpis augue id tellus.",
        status: "done",
        priority: "normal",
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "94",
        projectId: "2",
        task: "plan project",
        text: "some text etc.",
        status: "testing",
        priority: "low",
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "51",
        projectId: "1",
        task: "add new task",
        text: "Click on the green button below the project deatils to add new Project",
        status: "todo",
        priority: "very high",
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "58",
        projectId: "1",
        task: "edit tasks properties",
        text: "You could assign priority, status and report time to each task of your project. Click on title or description to open edit mode.",
        status: "progress",
        priority: "normal",
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "70",
        projectId: "1",
        task: "try to add a comment",
        text: "After opening single task card you could list, add, delete or edit comment that is assigned to the task. You could only edit or delete your own comments.",
        status: "testing",
        priority: "high",
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "77",
        projectId: "1",
        task: "edit project",
        text: "You could edit project info or assigned users by clicking on edit icon near the title or in the projects list. ",
        status: "done",
        priority: "low",
        createdAt: 1668728152418,
        updatedAt: 1664928157600,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "78",
        projectId: "1",
        task: "projects",
        text: "You only see projects which you are assigned to.",
        status: "done",
        priority: "normal",
        createdAt: 1664728152418,
        updatedAt: 1668728152558,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "79",
        projectId: "1",
        task: "change status",
        text: "To change project's status simply drag it to another container or open task card and select desired status from the list.",
        status: "done",
        priority: "high",
        createdAt: 1664728152418,
        updatedAt: 1667728152490,
        users: ["1", "100", "3"],
      });

      server.create("task", {
        id: "894",
        projectId: "2",
        task: "start",
        text: "some text etc.",
        status: "done",
        priority: "low",
        createdAt: 1664728152418,
        updatedAt: 1666728152418,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "924",
        projectId: "3",
        task: "plan project",
        text: "some text etc.",
        status: "testing",
        priority: "normal",
        createdAt: 1664728152418,
        updatedAt: 1694928152418,
        users: ["1", "100", "3"],
      });
      server.create("task", {
        id: "924",
        projectId: "4",
        task: "secret task for project",
        text: "some text etc.",
        status: "testing",
        priority: "normal",
        createdAt: 1664728152418,
        updatedAt: 1664729152418,
        users: ["1", "100", "3"],
      });

      // comments
      server.create("comment", {
        id: "888",
        taskID: "89",
        text: "this is my firs comment in this app",
        user: dwight,
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      server.create("comment", {
        id: "61541",
        taskID: "70",
        text: "Random comment passing by - try to add yours.",
        user: dwight,
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      server.create("comment", {
        id: "1111",
        taskID: "70",
        text: "Please report time on time tracker.",
        user: dm,
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      server.create("comment", {
        id: "555",
        taskID: "89",
        text: "does it work",
        user: pam,
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      server.create("comment", {
        id: "888",
        taskID: "89",
        text: "this is my firs comment in this app",
        user: dwight,
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
      });
      server.create("comment", {
        id: "777",
        taskID: "94",
        text: "this is my second comment",
        user: dwight,
        createdAt: 1664728152418,
        updatedAt: 1664728152418,
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

      this.patch("api/comments/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let project = schema.comments.find(id);

        return project.update(newAttrs);
      });

      // this.post("comments");
      // // users

      this.get("/api/users", (schema, request) => {
        return schema.users.all();
      });

      this.patch("api/users/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let project = schema.users.find(id);

        return project.update(newAttrs);
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
