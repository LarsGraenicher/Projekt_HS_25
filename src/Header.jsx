export const Header = ({ setSeite }) => {
  return (
    <header
      style={{
        "background-color": "#d1d1e0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <h1>Inhaltlicher Titel</h1>
      <button
        onClick={() => {
          setSeite("Startseite");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          setSeite("Fragestellung");
        }}
      >
        Fragestellung
      </button>
      <button
        onClick={() => {
          setSeite("Erkundung");
        }}
      >
        Erkundung
      </button>
    </header>
  );
};
