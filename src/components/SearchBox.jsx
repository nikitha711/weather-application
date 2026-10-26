
import { useState } from "react";
import {
  Box,
  Button,
  TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    if (trimmedCity.length < 2) {
      setError("City name must contain at least 2 characters.");
      return;
    }

    setError("");
    onSearch(trimmedCity);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 1,
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "flex-start" }
      }}
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <TextField
          fullWidth
          size="small"
          label="Enter city name"
          placeholder="e.g. Chennai, Hyderabad, London"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          error={Boolean(error)}
          helperText={
            error || "Search for a city to check its weather"
          }
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          minHeight: 40,
          height: 40,
          minWidth: 110,
          px: 2,
          py: 0.5,
          fontSize: "14px",
          borderRadius: 2,
          alignSelf: { xs: "flex-start", sm: "flex-start" },
          whiteSpace: "nowrap"
        }}
      >
        Search
      </Button>
    </Box>
  );
}
