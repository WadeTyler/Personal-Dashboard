import {useEffect, useState} from 'react';
import {Forecast, LastForecast} from "../types/weather.types.ts";

const Weather = () => {

  const [temperature, setTemperature] = useState<number | undefined>();

  const fetchTemp = async (pos: GeolocationPosition) => {
    // Fetch forecast
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?current=temperature_2m&temperature_unit=fahrenheit&latitude=${lat}&longitude=${lon}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const forecast: Forecast = await response.json();

    if (!forecast) return;

    // Update values
    setTemperature(forecast.current.temperature_2m || undefined);

    // Store latest forecast in localstorage
    const latestForecast: LastForecast = {
      timestamp: new Date().toUTCString(),
      forecast: forecast
    };

    localStorage.setItem('lastForecast', JSON.stringify(latestForecast));
  }

  async function loadTemp() {

    // Check when last forecast occurred
    const lastForecastStr = localStorage.getItem('lastForecast');
    if (lastForecastStr) {
      const lastForecast: LastForecast = JSON.parse(lastForecastStr);

      const forecastTimestamp = new Date(lastForecast.timestamp);
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 3);

      // If last forecast was less than 5 minutes ago, set to last values and early return
      if (forecastTimestamp > fiveMinutesAgo) {
        setTemperature(lastForecast.forecast.current.temperature_2m);
        return;
      }
    }

    // Fetch current temp
    navigator.geolocation.getCurrentPosition(fetchTemp);
  }

  useEffect(() => {
    loadTemp();
    setInterval(() => {
      loadTemp();
    }, 60000);
  }, []);

  if (temperature) return (
    <div>
      <span className="text-lg text-end">{temperature}°F</span>
    </div>
  );
};

export default Weather;