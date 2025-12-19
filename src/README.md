Finalisierung:

- Die Applikation ist in einer README.md-Datei auf GitHub beschrieben, sodass auch
  Aussenstehende (z.B. Dozierende) den Inhalt und Fokus des Projekts verstehen.
- Mithilfe der in der README.md angegebenen Informationen (Anweisungen, Befehle)
  können Aussenstehende (z.B. Dozierende) Frontend und Backend als Prozess(e) auf
  “localhost” starten und die App(s) testen.

##

# Fokus:

Die Applikation visualisiert Fussgängerzählungen in Abhängigkeit von Datum, Richtung, Wetter und Altersgruppe. Nutzer können über eine Sidebar Filter setzen und die Daten nach ihren Kriterien aktualisieren. Der Hauptfokus liegt darin, die Personen am 21.04.2024 die in Richtung Bahnhof gingen prozentual an den verschiedenen Messstandorten zu visualisieren. Die vier Messstationen bilden dabei das Grundgerüst für die Erkundung und werden als Basis verwendet.
Die Maximalanzahl Passantender jeweligen Messstation wird rot eingefärbt.

# Betriebsanleitung

Um das Projekt zu öffnen, muss zuerst in einer Umgebung die beiden Pakete "fastapi" und "pandas" installiert werden. Im Code muss dann in einem neuen Terminal mit "fastapi dev main.py" und mit "npm run dev" ebenfalls in einem neuen Terminal der Server und das Frontend gestartet werden. Mit dem Klick (+Ctrl) auf den Link "http://localhost:5173/" von "npm run dev" wird die Website aufgerufen. Darin ist unter Home die Fragestellung inklusive Karte? der Observationsstandorte ersichtlich. Unter Fragestellung ist die Visualisierung zur Fragestellung zu finden. In diesem Tab kann unter anderem das Datum der Visualisierung interaktiv geändert werden und es kann mit dem aktuellen Datum in den Tab der Erkundung gewechselt werden über den Button mit "Datensatz weiter erkunden". In der Erkundung gibt es die Möglichkeit über die verschiedenen Filter, das Wetter, das Alter, das Datum wie zuvor und die Richtung einzustellen. Es ist nicht möglich mehrere Wetterbedingungen auf einmal auszuwählen. Die Visualisierung ändert sich dabei bei jeder Änderung und die Zahlen können in der Visualisierung angeschaut werden. Falls man von Null anfangen will, gibt es den Reset-Knopf, der die Standart-Werte wiederherstellt.
