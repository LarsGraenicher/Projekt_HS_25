import Button from "@mui/material/Button";
import Uebersicht from "./Uebersicht.png";

export const Startseite = ({ setSeite }) => {
  return (
    <div className="Startseite">
      <h2>
        Wo bewegen sich am 21.04.2024 prozentual die meisten Erwachsenen gegen
        den Zürich HB?
      </h2>
      <div>
        Dies war die Fragestellung für diese Website mit untenstehendem Knopf
        gelangen Sie direkt zum Resultat:
      </div>

      <Button
        className="button_startseite"
        variant="contained"
        onClick={() => {
          setSeite("Fragestellung");
        }}
      >
        Zum Resultat
      </Button>
      <div>
        Diese Website dient weiter dazu um den Datensatz "Passantenfrequenzen an
        der Bahnhofstrasse" der Stadt Zürich zu Erkunden.
      </div>
      <Button
        className="button_startseite"
        variant="contained"
        onClick={() => {
          setSeite("Erkundung");
        }}
      >
        Zur Erkundung
      </Button>
      <div>
        Der Datensatz enthält stündliche Zählungen zu den Fussgängern an der
        Bahnhofstrasse und Lintheschergasse. Für detailiertere Angaben zum
        Datensatz und der Erhebung klicken Sie{" "}
        <a href="https://data.stadt-zuerich.ch/dataset/hystreet_fussgaengerfrequenzen">
          hier
        </a>
        .
      </div>
      <div>
        Als erster Überblick über die Gebiete der Zählungen dient die Abbildung
        unten:
      </div>
      <img src={Uebersicht} className="uebersicht" />
    </div>
  );
};
