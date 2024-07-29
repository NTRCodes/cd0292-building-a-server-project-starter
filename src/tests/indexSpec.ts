import { app } from "../index";
import request from "supertest";

describe("Image Processing Endpoint Tests", () => {
  it("should process and return the image", async () => {
    const response = await request(app)
      .get("/image")
      .query({ imageName: "palmtunnel", width: 100, height: 100 });
    expect(response.status).toBe(200);
  });
});
