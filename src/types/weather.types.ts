export type Forecast = {
  current: {
    interval: number,
    temperature_2m: number,
    time: string
  },
  current_units: {
    interval: string;
    temperature_2m: string;
    time: string;
  },
  elevation: number;
  generationtime_ms: number;
  longitude: number;
  latitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: string;
}

export type LastForecast = {
  timestamp: string,
  forecast: Forecast
};