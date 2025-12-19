import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FoggyIcon from "@mui/icons-material/FilterDrama";

export const Sidebar = ({
  date,
  setDate,
  richtung,
  setRichtung,
  wetter,
  setWetter,
  alter,
  setAlter,
}) => {
  return (
    <aside>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Datum auswählen"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          format="DD.MM.YYYY"
          minDate={dayjs("2021-09-28")}
          maxDate={dayjs("2025-07-30")}
        />
      </LocalizationProvider>
      {/* RICHTUNG */}
      <h3 style={{ marginTop: 16, marginBottom: 8, marginLeft: 10 }}>
        Richtung
      </h3>
      <ToggleButtonGroup variant="contained" orientation="vertical" fullWidth>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setRichtung("Bahnhof");
          }}
          selected={richtung === "Bahnhof"}
        >
          Bahnhof
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setRichtung("bürkliplatz");
          }}
          selected={richtung === "bürkliplatz"}
        >
          Bürkliplatz/Uraniastrasse
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setRichtung("keine");
          }}
          selected={richtung === "keine"}
        >
          keine
        </ToggleButton>
      </ToggleButtonGroup>

      {/* WETTER */}
      <h3 style={{ marginTop: 16, marginBottom: 8, marginLeft: 10 }}>Wetter</h3>
      <ToggleButtonGroup variant="contained" orientation="vertical" fullWidth>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setWetter(["clear-day", "clear-night", "wind"]);
          }}
          selected={wetter.includes("clear-day")}
        >
          <WbSunnyIcon
            fontSize="small"
            sx={{
              mr: 0.5,
              color: wetter.includes("clear-day") ? "orange" : "gray",
            }}
          />
          Sonne/Klar
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setWetter(["rain"]);
          }}
          selected={wetter.includes("rain")}
        >
          <GrainIcon
            fontSize="small"
            sx={{ mr: 0.5, color: wetter.includes("rain") ? "blue" : "gray" }}
          />
          Regen
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setWetter(["cloudy", "partly-cloudy-day", "partly-cloudy-night"]);
          }}
          selected={wetter.includes("cloudy")}
        >
          <CloudIcon
            fontSize="small"
            sx={{
              mr: 0.5,
              color: wetter.includes("cloudy") ? "lightgray" : "gray",
            }}
          />
          bewölkt
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setWetter(["fog"]);
          }}
          selected={wetter.includes("fog")}
        >
          <FoggyIcon
            fontSize="small"
            sx={{
              mr: 0.5,
              color: wetter.includes("fog") ? "lightgray" : "gray",
            }}
          />
          Nebel
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setWetter(["snow"]);
          }}
          selected={wetter.includes("snow")}
        >
          <AcUnitIcon
            fontSize="small"
            sx={{
              mr: 0.5,
              color: wetter.includes("snow") ? "lightblue" : "gray",
            }}
          />
          Schnee
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setWetter([]);
          }}
          selected={wetter.length === 0}
        >
          keine
        </ToggleButton>
      </ToggleButtonGroup>

      {/* ALTER */}
      <h3 style={{ marginTop: 16, marginBottom: 8, marginLeft: 10 }}>Alter</h3>
      <ToggleButtonGroup variant="contained" orientation="vertical" fullWidth>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setAlter("Kind");
          }}
          selected={alter === "Kind"}
        >
          Kind
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setAlter("Erwachsen")}
          selected={alter === "Erwachsen"}
        >
          Erwachsen
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => {
            setAlter("Alle");
          }}
          selected={alter === "Alle"}
        >
          Alle
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: "16px" }}
        fullWidth
        size="large"
        onClick={() => {
          setAlter("Alle");
          setWetter([]);
          setRichtung("keine");
          setDate(dayjs("2024-04-21"));
        }}
      >
        Reset
      </Button>
    </aside>
  );
};
