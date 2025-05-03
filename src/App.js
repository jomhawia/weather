import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherSlice";

// REACT
import React, { useEffect } from "react";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

//local imports
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

moment.locale("ar");
const theme = createTheme({
  palette: {
    primary: {
      main: "#1c345b",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
      contrastText: "#fff",
    },
  },

  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  // REDUX
  const weather = useSelector((state) => state.weather.data);
  //const loading = useSelector((state) => state.weather.loading);
  const dispatch = useDispatch();

  const [dirState, setdirState] = React.useState("rtl");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchWeather());
    i18n.changeLanguage("ar");
  }, [i18n, dispatch]);

  // HANDLER FOR THE BUTTON
  const handelClickToEn = () => {
    const arlan = i18n.language === "ar";
    if (arlan) {
      setdirState("ltr");
      moment.locale("en");
      i18n.changeLanguage("en");
    } else {
      setdirState("rtl");
      moment.locale("ar");
      i18n.changeLanguage("ar");
    }
  };
  return (
    <div className="App" dir={dirState}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" dir={dirState}>
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir={dirState}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={dirState}
                >
                  <Typography
                    variant="h2"
                    style={{
                      marginRight: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {t("Irbid")}
                  </Typography>

                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {/* {new Date().toLocaleDateString("ar-JO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })} */}

                    {moment().format("ll")}
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {weather.temp}
                      </Typography>

                      <img src={weather.icon} alt="" />
                    </div>
                    {/*== TEMP ==*/}

                    <Typography variant="h6">
                      {t(weather.description)}
                    </Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("minimum")}: {weather.min}
                      </h5>
                      <h5 style={{ margin: "0px 1px " }}>|</h5>
                      <h5>
                        {t("maximum")}: {weather.max}
                      </h5>
                    </div>
                  </div>
                  {/*== DEGREE & DESCRIPTION ==*/}

                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
                {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
              </div>
              {/* == CONTENT == */}
            </div>
            {/*== CARD ==*/}

            {/* TRANSLATION CONTAINER */}
            <div
              dir={dirState === "rtl" ? "ltr" : "rtl"}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              <Button
                style={{ color: "white" }}
                variant="text"
                onClick={handelClickToEn}
              >
                {i18n.language === "ar" ? "انجليزي" : "Arabic"}
                <span
                  style={{
                    marginRight: "5px",
                  }}
                ></span>
              </Button>
            </div>
            {/*== TRANSLATION CONTAINER ==*/}
          </div>
          {/*== CONTENT CONTAINER ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
