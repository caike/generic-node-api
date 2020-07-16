const request = require("supertest");
const app = require("../app");
const assert = require("assert");
const jwt = require("jsonwebtoken");

describe("GET /", () => {
  it("responds with success", (done) => {
    request(app).get("/").expect("Content-Type", /json/).expect(200, done);
  });
});

describe("Protected resources", () => {
  describe("with missing token", () => {
    it("returns 401", (done) => {
      request(app).get("/protected").expect(401, done);
    });
  });

  describe("with invalid token", () => {
    const token = jwt.sign({ user: "foo" }, "TEST_SECRET");
    it("returns 403", (done) => {
      request(app)
        .get("/protected")
        .set("authorization", `Bearer ${token}+blah`)
        .expect(403, done);
    });
  });

  describe("with valid token", () => {
    const token = jwt.sign({ user: "foo" }, "TEST_SECRET");
    it("returns 200", (done) => {
      request(app)
        .get("/protected")
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          assert.equal(res.body, "hello, foo");
          done();
        })
        .catch((error) => {
          if (error) done(error);
        });
    });
  });
});
