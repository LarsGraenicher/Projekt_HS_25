import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export const Sidebar = () => {
  const [date, setDate] = useState(dayjs("2024-04-21"));
  const [ort, setOrt] = useState("keine");
  const [richtung, setRichtung] = useState("keine");
  const [wetter, setWetter] = useState("keine");
  const [alter, setAlter] = useState("keine");

  return (
    <aside>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Datum auswählen"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          minDate={dayjs("2024-01-01")}
          maxDate={dayjs("2024-12-31")}
        />
      </LocalizationProvider>

      {/* ORT */}
      <h3 style={{ marginTop: 16, marginBottom: 8, marginLeft: 10 }}>Ort</h3>
      <ToggleButtonGroup variant="contained" orientation="vertical" fullWidth>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setOrt("A")}
          selected={ort === "A"}
        >
          A
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setOrt("B")}
          selected={ort === "B"}
        >
          B
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setOrt("C")}
          selected={ort === "C"}
        >
          C
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setOrt("D")}
          selected={ort === "D"}
        >
          D
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setOrt("keine")}
          selected={ort === "keine"}
        >
          keine
        </ToggleButton>
      </ToggleButtonGroup>

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
          onClick={() => setRichtung("Bürkliplatz")}
          selected={richtung === "Bürkliplatz"}
        >
          Bürkliplatz
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
          onClick={() => setWetter("Sonne")}
          selected={wetter === "Sonne"}
        >
          Sonne
        </ToggleButton>
        <ToggleButton
          sx={{ height: 25 }}
          onClick={() => setWetter("Regen")}
          selected={wetter === "Regen"}
        >
          Regen
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
          onClick={() => setAlter("keine")}
          selected={alter === "keine"}
        >
          keine
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: "16px" }}
        fullWidth
        size="large"
      >
        Auswahl Speichern
      </Button>
    </aside>
  );
};
