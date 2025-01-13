const request = require("supertest");
const app = require("../app");

let server;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

describe("Task API", () => {
  it("should return all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return a task by id", async () => {
    const response = await request(app).get("/tasks/32"); // Substitua pelo id real de uma tarefa existente
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("id");
  });

  it("should create a new task", async () => {
    const newTask = {
      title: "Test Task",
      status: "pendente",
    };

    const response = await request(app).post("/tasks").send(newTask);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.title).toBe(newTask.title);
    expect(response.body.data.status).toBe(newTask.status);
  });

  it("should return error if status is invalid", async () => {
    const newTask = {
      title: "Invalid Task",
      status: "invalid_status",
    };

    const response = await request(app).post("/tasks").send(newTask);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe(
      "Invalid status. Allowed values are: pendente, concluido"
    );
  });

  it("should update a task", async () => {
    const updatedTask = {
      title: "Updated Task",
      status: "concluido",
    };

    const response = await request(app)
      .put("/tasks/37") // Substitua pelo id real de uma tarefa
      .send(updatedTask);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.title).toBe(updatedTask.title);
    expect(response.body.data.status).toBe(updatedTask.status);
  });

  it("should delete a task", async () => {
    const response = await request(app).delete("/tasks/49"); // Substitua pelo id real de uma tarefa
    expect(response.status).toBe(204);
  });
});
