import { useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainArea } from "./MainArea";
import { Footer } from "./Footer";

export function App() {
  const [seite, setSeite] = useState("Fragestellung");
  const [zeit, setZeit] = useState("21.04.2024");

  return (
    <div className="app">
      <Header setSeite={setSeite}></Header>
      <MainArea seite={seite} setSeite={setSeite} zeit={zeit}></MainArea>
      {seite === "Erkundung" && <Sidebar setZeit={setZeit}></Sidebar>}
      <Footer>Footer</Footer>
    </div>
  );
}
