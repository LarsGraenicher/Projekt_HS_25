import { Button, Menu, MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const Dropdown = ({ label, options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [date, setDate] = useState("21-04-2024");

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        {label}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((opt) => (
          <MenuItem key={opt} onClick={handleClose}>
            {opt}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export const Sidebar = ({ hornusser }) => {
  // HINZUGEFÜGT → jetzt funktioniert der DatePicker korrekt
  const [date, setDate] = useState(dayjs("2024-04-21"));

  return (
    <aside>
      {hornusser ? (
        <div>
          <h2>Hornussen kurz erklärt</h2>
          <div id="Hornusseneinführung"></div>
          <div>Für mehr Infos:</div>
          <a href="https://ehv.ch/hornussen/">EHV Webseite</a>
        </div>
      ) : null}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Datum auswählen"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          minDate={dayjs("2024-01-01")}
          maxDate={dayjs("2024-12-31")}
        />
      </LocalizationProvider>

      <Stack direction="column" spacing={2}>
        <Dropdown label="Ort" options={["Ort A", "Ort B", "Ort C"]} />
        <Dropdown label="Richtung" options={["Bahnhof", "Bürkliplatz"]} />
        <Dropdown label="Wetter" options={["Sonne", "regen", "nebel"]} />
        <Dropdown label="Alter" options={["Erwachsen", "Kind"]} />
      </Stack>

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
