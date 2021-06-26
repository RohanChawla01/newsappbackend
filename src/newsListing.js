const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY);
const { country, queriedNewsSortType } = require("./constants");

const getTopHealines = (page) =>
  newsapi.v2.topHeadlines({
    country,
    page,
  });

const getQueriedNews = (page, qInTitle, to, from) =>
  newsapi.v2.everything({
    qInTitle,
    from,
    to,
    sortBy: queriedNewsSortType,
    page,
  });

module.exports = {
  getTopHealines,
  getQueriedNews,
};
