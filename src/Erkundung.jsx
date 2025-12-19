import { VegaEmbed } from "react-vega";
import { useEffect, useState } from "react";

import erkundung_json_spec from "./jsons/erkundung_spec.json";

export const Erkundung = ({ date, richtung, wetter, alter }) => {
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

    // Wetter nur senden, wenn >0
    if (wetter && wetter.length > 0) {
      wetter.forEach((e) => params.append("weather_condition", e));
    }

    // Richtung nur senden, wenn nicht "keine"
    if (richtung && richtung !== "keine") {
      params.append("direction", richtung);
    }

    // Altersgruppe nur senden, wenn nicht "Alle"
    if (alter && alter !== "Alle") {
      params.append("age", alter);
    }

    fetch(
      `http://localhost:8000/v1/erkundung/pedestrians_count?${params.toString()}`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [date, richtung, wetter, alter]);

  console.log("Test" + Object.keys(data).length);

  return (
    <div className="Erkundung">
      <h2>Erkundungsvisualisierung zum selbst endecken</h2>
      <h4>
        Anzahl
        {alter !== "Alle" && <> {alter}er </>}
        {alter === "Alle" && <> aller Altersgruppen </>}
        {wetter.length > 0 && (
          <>
            bei{" "}
            {
              {
                fog: "Nebel",
                rain: "Regen",
                cloudy: "bewölktem Wetter",
                "clear-day": "sonnigem / klarem Wetter",
                snow: "Schnee",
                wind: "Wind",
              }[wetter[0]]
            }{" "}
          </>
        )}
        {richtung !== "keine" && <> in Richtung </>}
        {richtung === "Bahnhof" && <>{richtung} </>}
        {richtung === "bürkliplatz" && <>Bürkliplatz/Uraniastrasse </>}
        {date && <>am {date.format("DD.MM.YYYY")}</>}
      </h4>
      <VegaEmbed spec={spec} />
    </div>
  );
};
