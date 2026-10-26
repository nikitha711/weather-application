
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeatherInfo(city) {
  if (!API_KEY) {
    throw new Error(
      "API key is missing. Check your .env file and restart the server."
    );
  }

  const url =
    "https://api.openweathermap.org/data/2.5/weather" +
    `?q=${encodeURIComponent(city)}` +
    `&appid=${API_KEY}&units=metric`;

  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "Network error. Check your internet connection and try again."
    );
  }

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "City not found. Check the spelling and try again."
      );
    }

    if (response.status === 401) {
      throw new Error(
        "API key is invalid or not active yet. Check your OpenWeatherMap account."
      );
    }

    if (response.status === 429) {
      throw new Error(
        "API request limit reached. Please try again later."
      );
    }

    throw new Error(
      data.message || "Unable to retrieve weather information."
    );
  }

  if (!data.main || !data.weather?.[0] || !data.sys) {
    throw new Error("The weather service returned incomplete data.");
  }

  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    windSpeed: data.wind?.speed ?? 0,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    condition: data.weather[0].main
  };
}
