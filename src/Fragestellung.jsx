import { VegaEmbed } from "react-vega";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Uebersicht from "./Uebersicht.png";

import fragestellung_json_spec from "./jsons/fragestellung_spec.json";

export const Fragestellung = ({
  setSeite,
  setDate,
  date,
  laden,
  setLaden,
  error,
  setError,
}) => {
  const [data, setData] = useState([]);
  const [spec, setSpec] = useState(fragestellung_json_spec);

  useEffect(() => {
    setSpec({
      ...fragestellung_json_spec,
      data: { values: data },
    });
  }, [data]);

  useEffect(() => {
    setLaden(0);
    const params = new URLSearchParams();

    // Datum als ISO String (Tag extrahieren)
    if (date) {
      params.append("date", date.format("YYYY-MM-DD"));
    }

    fetch(
      `http://localhost:8000/v1/fragestellung/pedestrians_count?${params.toString()}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // da das Backend mit FastAPI kein sauberes JSON liefert ist hier res immer noch String nach res.json
      })
      .then((res) => {
        const parsed = JSON.parse(res); // hier nochmal parsen das wirklich sauberes JSON
        setData(parsed);
        setLaden(1);
      })
      .catch((err) => {
        setLaden(1);
        setError(err.message);
      });
  }, [date]);

  if (laden === 0)
    return (
      <div className="Fragestellung">
        <h2>
          Prozentual liefen während des Zürich Marathons 2024 in der Zone
          Bahnofstrasse (Mitte) am meisten Erwachsene in Richtung Hauptbahnhof
        </h2>
        <h4>
          Prozentuale Angabe der Erwachsenen die in Richtung Hauptbahnhof gehen
          am {date ? date.format("DD.MM.YYYY") : ""}
        </h4>
        <div>Daten werden geladen!</div>
        <VegaEmbed spec={spec} />
        <div>
          <div className="text_fragestellung">
            Möchten Sie wissen wie es an Ihrem Geburtstag aussah? (Geben Sie
            bitte ein Datum an)
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="button_fragestellung"
              label="Datum auswählen"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
                setLaden(0);
              }}
              format="DD.MM.YYYY"
              minDate={dayjs("2021-09-28")}
              maxDate={dayjs("2025-07-30")}
            />
          </LocalizationProvider>
          <div>
            Möchten Sie noch andere Einsellungen für den Datensatz ausprobieren,
            klicken sie unten:
          </div>
          <Button
            className="button_fragestellung"
            variant="contained"
            onClick={() => {
              setSeite("Erkundung");
            }}
          >
            Zur Erkundung
          </Button>
          <div>Für die Zuordnung der Gebiete sehen Sie Abbildung unten:</div>
          <img src={Uebersicht} className="uebersicht" />
        </div>
      </div>
    );

  if (error !== "") {
    return <div>Fehler: {error}</div>;
  }

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
        <div className="text_fragestellung">
          Möchten Sie wissen wie es an Ihrem Geburtstag aussieht? (Geben Sie
          bitte ein Datum an)
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="button_fragestellung"
            label="Datum auswählen"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
              setLaden(0);
            }}
            format="DD.MM.YYYY"
            minDate={dayjs("2021-09-28")}
            maxDate={dayjs("2025-07-30")}
          />
        </LocalizationProvider>
        <div>
          Möchten Sie noch andere Einsellungen für den Datensatz ausprobieren,
          klicken sie unten:
        </div>
        <Button
          className="button_fragestellung"
          variant="contained"
          onClick={() => {
            setSeite("Erkundung");
          }}
        >
          Zur Erkundung
        </Button>
        <div>Für die zu Ordnung der Gebiete sehen Sie Abbildung unten:</div>
        <img src={Uebersicht} className="uebersicht" />
      </div>
    </div>
  );
};
