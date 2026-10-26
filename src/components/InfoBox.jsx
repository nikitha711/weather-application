import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip
} from "@mui/material";

import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";

// Convert Celsius to Celsius or Fahrenheit for display
function displayTemperature(value, unit) {
  const temperature =
    unit === "F" ? (value * 9) / 5 + 32 : value;

  return `${Math.round(temperature)}°${unit}`;
}

export default function InfoBox({ weather, unit = "C" }) {
  // Handle missing weather information safely
  if (!weather) {
    return null;
  }

  // Convert the main temperature for color selection
  const temperature =
    unit === "F"
      ? (weather.temp * 9) / 5 + 32
      : weather.temp;

  const temperatureColor =
    temperature > (unit === "F" ? 86 : 30)
      ? "#d84343"
      : temperature < (unit === "F" ? 50 : 10)
      ? "#1976d2"
      : "#172554";

  const details = [
    {
      label: "Feels like",
      value: displayTemperature(weather.feelsLike, unit),
      icon: <DeviceThermostatOutlinedIcon />
    },
    {
      label: "Humidity",
      value: `${weather.humidity}%`,
      icon: <WaterDropOutlinedIcon />
    },
    {
      label: "Wind speed",
      value: `${weather.windSpeed} m/s`,
      icon: <AirOutlinedIcon />
    },
    {
      label: "Country",
      value: weather.country,
      icon: <WbSunnyOutlinedIcon />
    }
  ];

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        borderRadius: 4,
        border: "1px solid #e0e7ff",
        overflow: "hidden"
      }}
    >
      {/* Weather summary */}
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          textAlign: "center",
          color: "#ffffff",
          background:
            "linear-gradient(135deg, #2563eb, #7c3aed)"
        }}
      >
        <Typography variant="overline">
          CURRENT WEATHER
        </Typography>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ overflowWrap: "anywhere" }}
        >
          {weather.city}, {weather.country}
        </Typography>

        {/* Weather condition icon */}
        <Box
          component="img"
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description || "Weather condition"}
          sx={{
            width: 90,
            height: 90,
            objectFit: "contain",
            my: 0.5
          }}
        />

        {/* Main temperature */}
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{
            color: "#ffffff",
            fontSize: { xs: "3rem", sm: "3.75rem" }
          }}
        >
          {displayTemperature(weather.temp, unit)}
        </Typography>

        <Typography
          variant="h6"
          sx={{ textTransform: "capitalize" }}
        >
          {weather.description}
        </Typography>

        {/* Minimum and maximum temperatures */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 2,
            flexWrap: "wrap"
          }}
        >
          <Chip
            label={`Min ${displayTemperature(weather.tempMin, unit)}`}
            sx={{
              bgcolor: "#ffffff",
              color: "#172554"
            }}
          />

          <Chip
            label={`Max ${displayTemperature(weather.tempMax, unit)}`}
            sx={{
              bgcolor: "#ffffff",
              color: "#172554"
            }}
          />
        </Box>
      </Box>

      {/* Additional weather information */}
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          {details.map((item) => (
            <Grid
              key={item.label}
              size={{ xs: 6 }}
            >
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  height: "100%",
                  bgcolor: "#f8faff",
                  borderRadius: 3
                }}
              >
                <Box sx={{ color: "#4f46e5", mb: 1 }}>
                  {item.icon}
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.label}
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    overflowWrap: "anywhere",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    color:
                      item.label === "Feels like"
                        ? temperatureColor
                        : "text.primary"
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
