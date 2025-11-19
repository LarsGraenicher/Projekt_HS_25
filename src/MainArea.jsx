import { Startseite } from "./Startseite";
import { Fragestellung } from "./Fragestellung";
import { Erkundung } from "./Erkundung";

export const MainArea = ({ seite, setSeite }) => {
  return (
    <main>
      {seite === "Startseite" && <Startseite />}
      {seite === "Fragestellung" && <Fragestellung setSeite={setSeite} />}
      {seite === "Erkundung" && <Erkundung />}
    </main>
  );
};
