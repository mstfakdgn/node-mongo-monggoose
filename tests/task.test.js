const request = require("supertest");
const Task = require("../src/models/task");
const User = require("../src/models/user");
const app = require("../src/app");
const { userOneId, userOne, setupDatabase, taskOne, taskOneId } = require("./fixtures/db");

beforeEach(setupDatabase);

test("create task", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Test Description",
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("get all tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toHaveLength(1);
});

test('delete task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOneId}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})
