import { VegaEmbed } from "react-vega";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import fragestellung_json_spec from "./jsons/fragestellung_spec.json";

export const Fragestellung = ({ setSeite, setDate, date }) => {
  const [data, setData] = useState([]);
  const [spec, setSpec] = useState(fragestellung_json_spec);

  useEffect(() => {
    setSpec({
      ...fragestellung_json_spec,
      data: { values: data },
    });
    console.log(spec);
  }, [data]);

  useEffect(() => {
    const params = new URLSearchParams();

    // Datum als ISO String (Tag extrahieren)
    if (date) {
      params.append("date", date.format("YYYY-MM-DD"));
    }

    fetch(
      `http://localhost:8000/v1/fragestellung/pedestrians_count?${params.toString()}`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [date]);

  return (
    <div className="Fragestellung">
      <h2>
        Prozentual liefen während des Zürich Marathons 2024 in der Zone
        Bahnofstrasse (Mitte) am meisten Erwachsene in Richtung Hauptbahnhof
      </h2>
      <h4>
        Prozentuale Angabe der Erwachsenen die in Richtung Hauptbahnhof gehen am{" "}
        {date ? date.format("DD.MM.YYYY") : ""}
      </h4>

      <VegaEmbed spec={spec} />
      <div>
        Wie sieht es an Ihrem Geburtstag aus?
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
        <Button
          variant="outlined"
          onClick={() => {
            setSeite("Erkundung");
          }}
        >
          Datensatz weiter erkunden
        </Button>
      </div>
    </div>
  );
};
