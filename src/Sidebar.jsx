import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const Sidebar = ({
  date,
  setDate,
  richtung,
  setRichtung,
  wetter,
  setWetter,
  alter,
  setAlter,
  update,
  setUpdate,
}) => {
  return (
    <aside>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Datum auswählen"
          value={date}
          onChange={(newValue) => setDate(newValue)}
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
          onClick={() => setRichtung("Bahnhof")}
          selected={richtung === "Bahnhof"}
        >
          Bahnhof
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setRichtung("Bürkliplatz/Uraniastrasse")}
          selected={richtung === "Bürkliplatz/Uraniastrasse"}
        >
          Bürkliplatz/Uraniastrasse
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setRichtung("keine")}
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
          onClick={() => setWetter("Sonne/Klar")}
          selected={wetter === "Sonne/Klar"}
        >
          Sonne/Klar
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setWetter("rain")}
          selected={wetter === "rain"}
        >
          Regen
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setWetter("cloudy")}
          selected={wetter === "cloudy"}
        >
          bewölkt
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setWetter("Sturm/Hagel")}
          selected={wetter === "Sturm/Hagel"}
        >
          Sturm/Hagel
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setWetter("Schnee")}
          selected={wetter === "Schnee"}
        >
          Schnee
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setWetter("keine")}
          selected={wetter === "keine"}
        >
          keine
        </ToggleButton>
      </ToggleButtonGroup>

      {/* ALTER */}
      <h3 style={{ marginTop: 16, marginBottom: 8, marginLeft: 10 }}>Alter</h3>
      <ToggleButtonGroup variant="contained" orientation="vertical" fullWidth>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setAlter("Kind")}
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
          onClick={() => setAlter("Alle")}
          selected={alter === "Alle"}
        >
          Alle
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "16px" }}
        fullWidth
        size="large"
        onClick={() => setUpdate(true)}
      >
        Daten aktualisieren
      </Button>

      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: "16px" }}
        fullWidth
        size="large"
        onClick={() => {
          setAlter("Alle");
          setWetter("keine");
          setRichtung("keine");
          setDate(dayjs("2024-04-21"));
        }}
      >
        Reset
      </Button>
    </aside>
  );
};
