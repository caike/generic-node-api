const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("responds with success", (done) => {
    request(app).get("/").expect("Content-Type", /json/).expect(200, done);
  });
});
