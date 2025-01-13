const request = require("supertest");
const app = require("../app");

let server;

beforeAll(() => {
  server = app.listen(8080);
});

afterAll(() => {
  server.close();
});

describe("Task API - Validation errors", () => {
  it("should return error if title is missing when creating a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ status: "pendente" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Title and status are required");
  });

  it("should return error if status is missing when creating a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Title and status are required");
  });

  it("should return error if status is invalid when creating a task", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Test Task",
      status: "invalid_status",
    });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe(
      "Invalid status. Allowed values are: pendente, concluido"
    );
  });
});
