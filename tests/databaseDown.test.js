const request = require("supertest");
const app = require("../app");

let server;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

jest.mock("../src/model/taskModel.js", () => ({
  getAllTasks: jest.fn().mockRejectedValue(new Error("Database is down")),
  getTaskById: jest.fn().mockRejectedValue(new Error("Database is down")),
  createTask: jest.fn().mockRejectedValue(new Error("Database is down")),
  updateTask: jest.fn().mockRejectedValue(new Error("Database is down")),
  deleteTask: jest.fn().mockRejectedValue(new Error("Database is down")),
}));

describe("Task API - Database down", () => {
  it("should return error if database is down when fetching all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Error fetching tasks");
  });

  it("should return error if database is down when creating a task", async () => {
    const newTask = { title: "Test Task", status: "pendente" };
    const response = await request(app).post("/tasks").send(newTask);
    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Error creating task");
  });
});
