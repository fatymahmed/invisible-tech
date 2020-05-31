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

main([10005, "mombasga", "turin"]);
