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
  update,
}) => {
  return (
    <main>
      {seite === "Startseite" && <Startseite />}
      {seite === "Fragestellung" && <Fragestellung setSeite={setSeite} />}
      {seite === "Erkundung" && (
        <Erkundung
          date={date}
          richtung={richtung}
          wetter={wetter}
          alter={alter}
          update={update}
        />
      )}
    </main>
  );
};
