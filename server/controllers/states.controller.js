const { states } = require("../api");

const validateDayDifference = (date) => {
  const fileDate = new Date(date);
  const currentDate = new Date();
  const difference = Math.ceil(
    (currentDate - fileDate) / (1000 * 60 * 60 * 24)
  );
  return difference <= 3 ? true : false;
};

const filterResponse = (data) => {
  const response = [];

  data.forEach((dt) => {
    const {
      state,
      hospitalizedCurrently,
      dateChecked,
      death,
      deathIncrease,
    } = dt;

    if (validateDayDifference(dateChecked)) {
      const existingState = response.find((st) => st.state === dt.state);
      if (existingState) {
        const index = response.indexOf(existingState);

        return (response[index] = {
          ...response[index],
          hospitalized:
            response[index].hospitalized > hospitalizedCurrently
              ? response[index].hospitalized
              : hospitalizedCurrently,
          death: response[index].death > death ? response[index].death : death,
          deathIncrease: response[index].deathIncrease + deathIncrease,
        });
      }

      return response.push({
        state: dt.state,
        date: dateChecked,
        hospitalized: hospitalizedCurrently,
        death,
        deathIncrease,
      });
    }
  });
  return response;
};

const getTotalDeaths = (data) => {
  let total = 0;
  data.forEach((st) => {
    total = total + st.deathIncrease;
  });
  return total;
};

const get = async (_req, res) => {
  try {
    const statesData = await states.getDaily();
    const organizedData = filterResponse(statesData);
    const recentDeaths = getTotalDeaths(organizedData);
    res.send({ statesData: organizedData, recentDeaths });
  } catch (error) {
    console.debug(error);
  }
};

module.exports = {
  get,
};
