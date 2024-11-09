const request = require("supertest");
const app = require("../server");

describe("Events API", () => {
  it("Створення нової події", async () => {
    const response = await request(app).post("/api/events/create").send({
      name: "Тестова подія",
      date: "2024-11-15",
      location: "Львів",
      description: "Опис тестової події",
      organizer_id: 1,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Тестова подія");
  });
});
