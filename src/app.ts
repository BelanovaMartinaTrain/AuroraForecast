import "dotenv/config";
import express from "express";
import fetchDataFromApi from "./utils/fetchDataFromApi";
import fetchAndModifyKIndex from "./utils/modifyKIndex";
import { apiPlanetaryKIndex, apiSpaceWeather, apiYRMETWeather10Hours, apiYRMETWeatherComplete, apiSolarWind, apiMagneticField, apiFlux, apiPlanetaryK3h, apiSolarWindDensity5Min, apiSolarWindDensity3Day, api27Day } from "./apis/apiParams";
import cors from "cors";
import { fetchAndSaveOvationImage } from "./scripts/fetchAnOvationImage";
import { imageTransformationHandler } from "./handlers/imageTranformationHandler";

const app = express();

app.use(cors());

// app.use(
//     cors({
//         origin: "https://auroraforecast.online/",
//     })
// );

app.use(express.json());
app.use(express.static("public"));

fetchAndSaveOvationImage("north");
fetchAndSaveOvationImage("south");

setInterval(() => fetchAndSaveOvationImage("north"), 5 * 60 * 1000);
setInterval(() => fetchAndSaveOvationImage("south"), 5 * 60 * 1000);

app.get("/api/planetary-k-index", async (req, res) => {
    const apiData = apiPlanetaryKIndex();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/planetary-k-index-mod", async (req, res) => {
    const apiData = apiPlanetaryKIndex();
    const data = await fetchAndModifyKIndex(apiData);
    res.json(data);
});

app.get("/api/sunstorm-events", async (req, res) => {
    const apiData = apiSpaceWeather();
    const data = await fetchDataFromApi(apiData);
    console.log("sunstorm events");
    res.json(data);
});

// TODO combine wind, field, flux and latest pic to one and send back as object
app.get("/api/solar-wind-density-5min", async (req, res) => {
    const apiData = apiSolarWindDensity5Min();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/solar-wind-density-3day", async (req, res) => {
    const apiData = apiSolarWindDensity3Day();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/solar-wind", async (req, res) => {
    const apiData = apiSolarWind();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/magnetic-field", async (req, res) => {
    const apiData = apiMagneticField();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/flux", async (req, res) => {
    const apiData = apiFlux();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/yr-met-weather-10hours", async (req, res) => {
    const lat = String(req.query.lat);
    const lon = String(req.query.lon);
    const apiData = apiYRMETWeather10Hours(lat, lon);
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/yr-met-weather-complete", async (req, res) => {
    const lat = String(req.query.lat);
    const lon = String(req.query.lon);
    const apiData = apiYRMETWeatherComplete(lat, lon);
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/planetary-k-3h", async (req, res) => {
    const apiData = apiPlanetaryK3h();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/27-days-forecast", async (req, res) => {
    const apiData = api27Day();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/image-ovation", async (req, res, next) => {
    console.log("ovation");
    console.log(req.query);
    imageTransformationHandler(req, res, next);
});

export default app;
