import { VegaEmbed } from "react-vega";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import fragestellung_json from "./jsons/fragestellung_json.json";

export const Fragestellung = ({ setSeite }) => {
  return (
    <div className="Fragestellung">
      <h2>Inhaltlicher Titel</h2>

      <VegaEmbed spec={fragestellung_json} />
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
