const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());

// ---------------------------- GET ALL PLANTS BY PAGE ----------------------------
app.get("/plants", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const page = req.query.page || 1;
    const apiUrl = `https://trefle.io/api/v1/plants?token=${token}&page=${page}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
});

// ---------------------------- GET SPECIFIC PLANTS ----------------------------
app.get("/plants/id", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const id = req.query.id;
    const apiUrl = `https://trefle.io/api/v1/plants/${id}?token=${token}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
});

// ---------------------------- SORT BY PARAMS ----------------------------
app.get("/plants/sort", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const page = req.query.page || 1;
    const { params } = req.query;

    const apiUrl = `https://trefle.io/api/v1/plants?token=${token}&order[${params}]=asc&page=${page}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
});

// ---------------------------- GET ALL DISTRIBUTIONS ----------------------------
app.get("/countries", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const page = req.query.page || 1;

    const apiUrl = `https://trefle.io/api/v1/distributions?token=${token}&page=${page}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
});

// ---------------------------- GET SPECIFIC DISTRIBUTIONS ----------------------------
app.get("/countries/id", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const id = req.query.id;
    const apiUrl = `https://trefle.io/api/v1/distributions/${id}?token=${token}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
});

// ---------------------------- SEARCH BY PLANT ----------------------------
app.get("/plants/search", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const { query, page } = req.query;

    const apiUrl = `https://trefle.io/api/v1/plants/search?token=${token}&q=${query}&page=${page}`;
    // https://trefle.io/api/v1/plants/search?token=YOUR_TREFLE_TOKEN&q=coconut
    // https://trefle.io/api/v1/plants?token=bUqrMeoN_DsqyUuovxf_LYlChfVtmQtvavP804J-B9k&filter[common_name]=Evergreen%20oak

    const response = await axios.get(apiUrl);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
