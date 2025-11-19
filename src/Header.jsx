import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export const Header = ({ setSeite }) => {
  return (
    <header
      style={{
        backgroundColor: "#d1d1e0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <h1>Inhaltlicher Titel</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 3,
          },
        }}
      >
        <ButtonGroup
          variant="text"
          aria-label="Basic button group"
          color="grey"
        >
          <Button
            onClick={() => {
              setSeite("Startseite");
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => {
              setSeite("Fragestellung");
            }}
          >
            Fragestellung
          </Button>
          <Button
            onClick={() => {
              setSeite("Erkundung");
            }}
          >
            Erkundung
          </Button>
        </ButtonGroup>
      </Box>
    </header>
  );
};
