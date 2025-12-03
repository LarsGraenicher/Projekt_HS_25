import { VegaEmbed } from "react-vega";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";

import fragestellung_json_spec from "./jsons/fragestellung_spec.json";

export const Fragestellung = ({ setSeite }) => {
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
    fetch("http://localhost:8000/v1/pedestrians_count?date=2024-12-10")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <div className="Fragestellung">
      <h2>Inhaltlicher Titel</h2>

      <VegaEmbed spec={spec} />
      <div>
        Wie sieht es an Ihrem Geburtstag aus?
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Basic date picker" />
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
