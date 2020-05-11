const fetch = require("node-fetch");

const apiPath = "https://covidtracking.com/api/v1/states/";

const getDaily = async () => {
  try {
    const data = await fetch(`${apiPath}daily.json`);
    const parsed = await data.json();
    return parsed;
  } catch (error) {
    console.debug(error);
  }
};

module.exports = {
  getDaily,
};
