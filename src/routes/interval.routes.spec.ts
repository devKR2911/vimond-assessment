import app from "@/app";
import request from "supertest";
import { input_data_one, output_data_one } from "@/testdata/testdata-one";
import { input_data_two, output_data_two } from "@/testdata/testdata-two";
import { input_data_three, output_data_three } from "@/testdata/testdata-three";
import { input_data_four, output_data_four } from "@/testdata/testdata-four";
import { input_data_five, output_data_five } from "@/testdata/testdata-five";

describe("API Endpoint testing", () => {
  test("testing the interval checker endpoint - payload 1", async () => {
    const response = await request(app)
      .post("/api/interval-checker")
      .send(input_data_one);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: output_data_one });
  });
  test("testing the interval checker endpoint - payload 2", async () => {
    const response = await request(app)
      .post("/api/interval-checker")
      .send(input_data_two);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: output_data_two });
  });
  test("testing the interval checker endpoint - payload 3", async () => {
    const response = await request(app)
      .post("/api/interval-checker")
      .send(input_data_three);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: output_data_three });
  });
  test("testing the interval checker endpoint - payload 4", async () => {
    const response = await request(app)
      .post("/api/interval-checker")
      .send(input_data_four);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: output_data_four });
  });
  test("testing the interval checker endpoint - payload 1", async () => {
    const response = await request(app)
      .post("/api/interval-checker")
      .send(input_data_five);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: output_data_five });
  });
});
