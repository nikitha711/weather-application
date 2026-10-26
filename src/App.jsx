
import { useEffect, useRef, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  CircularProgress,
  Button
} from "@mui/material";

import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import SearchBox from "./components/SearchBox";
import InfoBox from "./components/InfoBox";
import { getWeatherInfo } from "./weatherService";

const DEFAULT_CITY = "Chennai";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [unit, setUnit] = useState("C");

  const latestRequest = useRef(0);

  async function handleSearch(city) {
    const requestId = ++latestRequest.current;

    setLoading(true);
    setError("");

    try {
      const result = await getWeatherInfo(city);

      // Ignore older responses if a newer search has started.
      if (requestId !== latestRequest.current) return;

      setWeather(result);

      setLastUpdated(
        new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short"
        }).format(new Date())
      );
    } catch (err) {
      if (requestId !== latestRequest.current) return;

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      if (requestId === latestRequest.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    handleSearch(DEFAULT_CITY);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 6 },
        background:
          "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)"
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 5 },
            borderRadius: 5,
            border: "1px solid #e0e7ff",
            textAlign: "center"
          }}
        >
          <CloudOutlinedIcon
            sx={{ fontSize: 48, color: "#4f46e5" }}
          />

          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              color: "#172554",
              mb: 1
            }}
          >
            Weather Application
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Search any city to view its current weather.
          </Typography>

          <SearchBox onSearch={handleSearch} />

          {/* Celsius and Fahrenheit toggle */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              my: 2
            }}
          >
            <Button
              variant={unit === "C" ? "contained" : "outlined"}
              onClick={() => setUnit("C")}
            >
              °C
            </Button>

            <Button
              variant={unit === "F" ? "contained" : "outlined"}
              onClick={() => setUnit("F")}
            >
              °F
            </Button>
          </Box>

          {loading && (
            <Box sx={{ mt: 4 }}>
              <CircularProgress />
              <Typography sx={{ mt: 1 }}>
                Fetching weather information...
              </Typography>
            </Box>
          )}

          {!loading && error && (
            <Alert
              severity="error"
              sx={{ mt: 3, textAlign: "left" }}
            >
              {error}
            </Alert>
          )}

          {!loading && weather && !error && (
            <>
              <InfoBox weather={weather} unit={unit} />

              {lastUpdated && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Last updated: {lastUpdated}
                </Typography>
              )}
            </>
          )}

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 3 }}
          >
            Powered by Nikitha 
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
