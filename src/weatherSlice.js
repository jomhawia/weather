import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=32.5711096&lon=35.8483622&appid=61cba647bed3005c1ced4027b8733922"
    );
    console.log("response", response.data);
    const temp = Math.round(response.data.main.temp - 273.15);
    const description = response.data.weather[0].description;
    const min = Math.round(response.data.main.temp_min - 273.15);
    const max = Math.round(response.data.main.temp_max - 273.15);
    const icon = response.data.weather[0].icon;
    const pathIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return { temp, description, min, max, pathIcon };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    loading: false,
  },
  reducers: {
    setWeather: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
