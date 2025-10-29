import { useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainArea } from "./MainArea";
import { Footer } from "./Footer";

export function App() {
  const [seite, setSeite] = useState("Startseite");

  return (
    <div className="app">
      <Header setSeite={setSeite}></Header>
      <MainArea seite={seite}></MainArea>
      {seite === "Fragestellung" && <Sidebar></Sidebar>}
      {seite === "Erkundung" && <Sidebar></Sidebar>}
      <Footer>Footer</Footer>
    </div>
  );
}

//export default App;
