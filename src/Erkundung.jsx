import { VegaEmbed } from "react-vega";
import { useEffect, useState } from "react";

import erkundung_json_spec from "./jsons/erkundung_spec.json";

export const Erkundung = ({ date, richtung, wetter, alter, update }) => {
  const [data, setData] = useState([]);
  const [spec, setSpec] = useState(erkundung_json_spec);

  useEffect(() => {
    setSpec({
      ...erkundung_json_spec,
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

    // Wetter nur senden, wenn nicht "keine"
    if (wetter && wetter !== "keine") {
      params.append("weather_condition", wetter);
    }

    // Richtung nur senden, wenn nicht "keine"
    if (richtung && richtung !== "keine") {
      params.append("direction", richtung);
    }

    // Altersgruppe nur senden, wenn nicht "Alle"
    if (alter && alter !== "Alle") {
      params.append("age_group", alter);
    }

    fetch(
      `http://localhost:8000/v1/erkundung/pedestrians_count?${params.toString()}`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [date, richtung, wetter, alter]);

  return (
    <div className="Erkundung">
      <h2>Inhaltlicher Titel</h2>
      <div>Hier kommt die Bombastische Visualisierung</div>
      <VegaEmbed spec={spec} />
    </div>
  );
};
