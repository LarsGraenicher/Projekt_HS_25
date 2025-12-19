import { useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainArea } from "./MainArea";
import { Footer } from "./Footer";
import dayjs from "dayjs";

export function App() {
  const [seite, setSeite] = useState("Startseite");
  const [zeit, setZeit] = useState("21.04.2024");
  const [date, setDate] = useState(dayjs("2024-04-21"));
  const [richtung, setRichtung] = useState("keine");
  const [wetter, setWetter] = useState([]);
  const [alter, setAlter] = useState("Alle");

  return (
    <div className="app">
      <Header setSeite={setSeite}></Header>
      <MainArea
        seite={seite}
        setSeite={setSeite}
        zeit={zeit}
        date={date}
        richtung={richtung}
        wetter={wetter}
        alter={alter}
        setDate={setDate}
      ></MainArea>
      {seite === "Erkundung" && (
        <Sidebar
          date={date}
          setDate={setDate}
          setZeit={setZeit}
          zeit={zeit}
          richtung={richtung}
          setRichtung={setRichtung}
          wetter={wetter}
          setWetter={setWetter}
          alter={alter}
          setAlter={setAlter}
        ></Sidebar>
      )}
      <Footer>Footer</Footer>
    </div>
  );
}
