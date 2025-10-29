import { Startseite } from "./Startseite";
import { Fragestellung } from "./Fragestellung";
import { Erkundung } from "./Erkundung";

export const MainArea = ({ seite }) => {
  return (
    <main>
      {seite === "Startseite" && <Startseite />}
      {seite === "Fragestellung" && <Fragestellung />}
      {seite === "Erkundung" && <Erkundung />}
    </main>
  );
};
