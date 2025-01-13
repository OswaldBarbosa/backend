const request = require("supertest");
const app = require("../app");

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});

describe("Task API - Error handling", () => {
  it("should return error if task is not found by id", async () => {
    const response = await request(app).get("/tasks/99");
    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Task not found");
  });

  it("should return error if trying to update a non-existing task", async () => {
    const updatedTask = { title: "Updated Task", status: "concluido" };
    const response = await request(app).put("/tasks/99").send(updatedTask);
    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Task not found");
  });

  it("should return error if trying to delete a non-existing task", async () => {
    const response = await request(app).delete("/tasks/99");
    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Task not found");
  });
});
