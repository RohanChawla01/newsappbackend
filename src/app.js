const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// load config
dotenv.config();
const app = express();
const port = process.env.PORT || 8082;
app.use(cors());

const { getQueriedNews, getTopHealines } = require("./newsListing");

const defaultPage = 1;

const error = (res, err) => {
  const message = err.name ? err.name : err;
  res
    .status(400)
    .send({
      message,
    })
    .end();
};

app.get(`/topheadlines`, (req, res) => {
  const { page } = req.query;
  const payload = page ? page : defaultPage;
  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  getTopHealines(payload)
    .then((response) => {
      res.status(200).send(response).end();
    })
    .catch((err) => {
      error(res, err);
    });
});

app.get(`/everything`, (req, res) => {
  const { page, qInTitle, to, from } = req.query;
  if (!qInTitle) {
    return error(res, "Search value not received!");
  }
  // to, from not necessary for newsApi
  const _page = page ? page : defaultPage;
  const _to = to ? to : "";
  const _from = from ? from : "";
  // To query /v2/everything
  // Must include at least one q, source, or domain
  getQueriedNews(_page, qInTitle, _to, _from)
    .then((response) => {
      res.status(200).send(response).end();
    })
    .catch((err) => error(res, err));
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}!`);
});
