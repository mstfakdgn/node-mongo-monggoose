const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { send } = require("@sendgrid/mail");
const { userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test("Signup user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Mustafa",
      email: "mustafa.akiler@gmail.com",
      password: "123456789",
    })
    .expect(201);

  // Assert that the database changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about hte response
  expect(response.body).toMatchObject({
    user: {
      name: "Mustafa",
      email: "mustafa.akiler@gmail.com"
    },
    token: user.tokens[0].token
  });

  // Password should not be return
  expect(user.password).not.toBe('asdas')
});

test("login", async () => {
  const response = await request(app)
    .post("/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
});

test("login failure", async () => {
  await request(app)
    .post("/login")
    .send({
      email: "asd",
      password: "asd",
    })
    .expect(400);
});

test("/users/me", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("unsuccesfull login", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("delete user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
});

test('upload profile picture', async () => {
    await request(app)
        .post('/upload/profilPicture')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach('picture', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.picture).toEqual(expect.any(Buffer))
})

test('update user', async () => {
    await request(app)
        .put('/users/me')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name:"updatedName"
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual("updatedName")
})

test('update user with wrong parameter should fail', async () => {
    await request(app)
        .put('/users/me')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            wrongParameter:"updatedName"
        })
        .expect(400)

})