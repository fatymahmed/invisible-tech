const zipCodeAPI =
  "https://api.zip-codes.com/ZipCodesAPI.svc/1.0/QuickGetZipCodeDetails/";
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";

function main(locations) {
  locations.forEach((location) => {
    findWeatherForLocation(location);
  });
}

const findWeatherForLocation = async (location) => {
  if (typeof location === "number") {
    const city = await getCityName(location);
    if (city) {
      getWeatherAndTime(city);
    }
  } else {
    getWeatherAndTime(location);
  }
};

const getCityName = async (postalCode) => {
  try {
    const response = await fetch(
      `${zipCodeAPI}${postalCode}?key=3U7NI37W63J526BVXBS1`
    );
    const result = await response.json();
    let city = result.City;
    return city.replace(/ /g, "+");
  } catch (err) {
    alert(postalCode + " not found");
  }
};

const getWeatherAndTime = async (city) => {
  try {
    const response = await fetch(
      `${weatherAPI}?q=${city}&units=metric&APPID=e35c92eefa655c7d2e50f8101fc984ca`
    );
    const result = await response.json();
    const weatherDescription = result.weather[0].description;
    const temperature = result.main.temp;
    const UTCtimeOffsetInHours = result.timezone / 3600;
    const currentUserDate = new Date();
    const currentUTCTime =
      currentUserDate.getTime() + currentUserDate.getTimezoneOffset() * 60000;

    const currentDateAndTime = new Date(
      currentUTCTime + 3600000 * UTCtimeOffsetInHours
    );

    city = city.replace(/\+/g, " ");

    console.log(
      "The weather in " +
        city +
        " is " +
        weatherDescription +
        " with a temperature of " +
        temperature +
        " degrees celcius"
    );
    console.log(
      "The local date and time in " +
        city +
        " is " +
        currentDateAndTime.toLocaleString()
    );
  } catch (error) {
    alert(city + " not found");
  }
};

main([10005, "mombasga", "turin"]);
