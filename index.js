const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());

app.get("/plants", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const page = req.query.page || 1;
    const apiUrl = `https://trefle.io/api/v1/plants?token=${token}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
});
app.get("/plants/filter", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const { filterParams } = req.query;

    const apiUrl = `https://trefle.io/api/v1/plants?token=${token}&${filterParams}`;

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
