import { rest } from "msw";
import { setupServer } from "msw/native";

interface WeatherData {
  city: string;
  summary: string; // "Sunny", "Cloudy", "Rainy"
  maxTemperature: number;
  minTemperature: number;
  windSpeed: number;
  windDirection: string; // "N", "S", "E", "W"
}

const handlers = [
  rest.get("https://localhost:3000/london", (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<WeatherData>({
        city: "London",
        summary: "Cloudy",
        maxTemperature: 20,
        minTemperature: 10,
        windSpeed: 15,
        windDirection: "E",
      })
    )
  ),

  rest.get("https://localhost:3000/sydney", (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<WeatherData>({
        city: "Sydney",
        summary: "Sunny",
        maxTemperature: 40,
        minTemperature: 30,
        windSpeed: 5,
        windDirection: "W",
      })
    )
  ),
];

export const server = setupServer(...handlers);
