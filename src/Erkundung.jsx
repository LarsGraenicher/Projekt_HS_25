import { VegaEmbed } from "react-vega";
import { useEffect, useState } from "react";

import erkundung_json_spec from "./jsons/erkundung_spec.json";
import Uebersicht from "./Uebersicht.png";

export const Erkundung = ({
  date,
  richtung,
  wetter,
  alter,
  laden,
  setLaden,
  error,
  setError,
}) => {
  const [data, setData] = useState([]);
  const [spec, setSpec] = useState(erkundung_json_spec);

  useEffect(() => {
    setSpec({
      ...erkundung_json_spec,
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
  }, [date, richtung, wetter, alter]);

  if (error !== "") {
    return <div>Fehler: {error}</div>;
  }

  //ausgeben wie viele Stunden in den gelieferten Daten sind
  const anzahlgelieferteStunden = data.length / 4;

  //Berechnung der Durchschnittstemperatur
  const temperaturen = data.map((d) => d.temperature);
  const sum = temperaturen.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / temperaturen.length;
  const gerundetAvg = Math.round(avg);

  return (
    <div className="Erkundung">
      <h2>Erkundungsvisualisierung zum selbst entdecken</h2>
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
                clear: "sonnigem / klarem Wetter",
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
        {!isNaN(gerundetAvg) && (
          <> bei einer Durschnittstemperatur von {gerundetAvg} ° Celsius.</>
        )}
        {anzahlgelieferteStunden !== 24 && (
          <div>
            {" "}
            Es treffen {anzahlgelieferteStunden} Stunden auf die Einstellungen
            zu.{" "}
          </div>
        )}
      </h4>
      {laden === 0 ? (
        <div className="ladeMeldung">Daten werden geladen!</div>
      ) : data.length === 0 ? (
        <div className="erkundung_fehlermeldung">
          Für diese Einstellungen sind keine Daten vorhanden.
        </div>
      ) : (
        <VegaEmbed spec={spec} />
      )}

      <div>Für die Zuordnung der Gebiete sehen Sie Abbildung unten:</div>
      <img src={Uebersicht} className="uebersicht" />
    </div>
  );
};
