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
  setDate,
}) => {
  return (
    <main>
      {seite === "Startseite" && <Startseite />}
      {seite === "Fragestellung" && (
        <Fragestellung setSeite={setSeite} date={date} setDate={setDate} />
      )}
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
