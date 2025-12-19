import { Startseite } from "./Startseite";
import { Fragestellung } from "./Fragestellung";
import { Erkundung } from "./Erkundung";

export const MainArea = ({
  seite,
  setSeite,
  date,
  richtung,
  wetter,
  alter,
  setDate,
  laden,
  setLaden,
  error,
  setError,
}) => {
  return (
    <main>
      {seite === "Startseite" && <Startseite setSeite={setSeite} />}
      {seite === "Fragestellung" && (
        <Fragestellung
          setSeite={setSeite}
          date={date}
          setDate={setDate}
          laden={laden}
          setLaden={setLaden}
          error={error}
          setError={setError}
        />
      )}
      {seite === "Erkundung" && (
        <Erkundung
          date={date}
          richtung={richtung}
          wetter={wetter}
          alter={alter}
          laden={laden}
          setLaden={setLaden}
          error={error}
          setError={setError}
        />
      )}
    </main>
  );
};
