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
    const apiUrl = `https://trefle.io/api/v1/plants?token=${token}&page=1`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
});

// ---------------------------- FILTER BY PARAMS ----------------------------
app.get("/plants/filter", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const { filterParams, params } = req.query;

    const apiUrl = `https://trefle.io/api/v1/plants?token=${token}&filter[${filterParams}]=${params}`;
    //
    // https://trefle.io/api/v1/plants?token=bUqrMeoN_DsqyUuovxf_LYlChfVtmQtvavP804J-B9k&filter[common_name]=Evergreen%20oak

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
    const { query } = req.query;

    const apiUrl = `https://trefle.io/api/v1/plants/search?token=${token}&q=${query}`;
    // https://trefle.io/api/v1/plants?token=bUqrMeoN_DsqyUuovxf_LYlChfVtmQtvavP804J-B9k&filter[common_name]=Evergreen%20oak

    const response = await axios.get(apiUrl);
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
