export const Sidebar = ({ hornusser }) => {
  return (
    <aside>
      {hornusser ? (
        <div>
          <h2>Hornussen kurz erklärt</h2>
          <div id="Hornusseneinführung">
            Hornussen ist ein traditioneller Schweizer Mannschaftssport.
            Gespielt wird mit einer kleinen Kunststoffscheibe, dem Nouss. Diese
            wird mit einer langen Rute so weit wie möglich ins Spielfeld
            geschlagen. Die gegnerische Mannschaft versucht, den Nouss mit
            flachen Holzschaufeln, den Schindeln, abzufangen. Ziel ist es, weite
            Schläge zu erzielen und gleichzeitig gegnerische Treffer zu
            verhindern. Das Spiel verlangt Kraft, Reaktionsfähigkeit und
            Teamarbeit. Hornussen verbindet sportlichen Wettkampf mit geselligem
            Vereinsleben und ist fest in der Schweizer Kultur verankert.
            (erstellt mit ChatGPT)
          </div>
          <div>Für mehr Infos:</div>
          <a href="https://ehv.ch/hornussen/">EHV Webseite</a>
        </div>
      ) : null}
    </aside>
  );
};
