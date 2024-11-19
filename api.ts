import { rest } from "msw";
import { setupServer } from "msw/native";

export interface WeatherData {
  city: string;
  summary: string; // "Sunny", "Cloudy", "Rainy"
  maxTemperature: number;
  minTemperature: number;
  windSpeed: number;
  windDirection: string; // "N", "S", "E", "W"
}

const london = {
  city: "London",
  summary: "Cloudy",
  maxTemperature: 20,
  minTemperature: 10,
  windSpeed: 15,
  windDirection: "E",
};

const sydney = {
  city: "Sydney",
  summary: "Sunny",
  maxTemperature: 40,
  minTemperature: 30,
  windSpeed: 5,
  windDirection: "W",
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handlers = [
  rest.get("https://localhost:3000/london", async (_, res, ctx) =>
    res(ctx.status(200), ctx.json<WeatherData>(london))
  ),

  rest.get("https://localhost:3000/sydney", async (_, res, ctx) => {
    await wait(2000);

    return res(ctx.status(200), ctx.json<WeatherData>(sydney));
  }),

  rest.get("https://localhost:3000/cities", async (_, res, ctx) => {
    return res();
  }),
];

export const server = setupServer(...handlers);
