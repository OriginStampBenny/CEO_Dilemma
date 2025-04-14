import React, { useState } from 'react';

// Definition eines verzweigten Fragenbaums mit 5 Ebenen.
// Jeder Knoten hat drei Antwortoptionen und enthält eine Score-Anpassung sowie einen Pointer zum nächsten Knoten.
// Endknoten (final == true) enthalten zusätzlich einen Schwellenwert und zwei Endnachrichten.
const gameData = {
  "1": {
    question: "Runde 1: Budgetkürzungen stehen an. Wie reagierst du?",
    options: [
      { text: "Personal abbauen zur Kostensenkung", score: -2, next: "2a" },
      { text: "Alternative Sparmaßnahmen einleiten", score: 2, next: "2b" },
      { text: "Trotz Budget in Innovationen investieren", score: 1, next: "2c" }
    ]
  },
  "2a": {
    question: "Runde 2a: Dein Team ist demoralisiert. Was tust du?",
    options: [
      { text: "Motivierender Team-Talk", score: 2, next: "3a" },
      { text: "Neue, strenge Einstellungsvorschriften", score: -1, next: "3b" },
      { text: "Demoralisation ignorieren", score: -2, next: "3c" }
    ]
  },
  "2b": {
    question: "Runde 2b: Investoren äußern Skepsis. Wie gehst du vor?",
    options: [
      { text: "Detaillierten Geschäftsplan präsentieren", score: 2, next: "3d" },
      { text: "Kurzfristige Lösungen anbieten", score: -1, next: "3e" },
      { text: "Auf dein Bauchgefühl vertrauen", score: 1, next: "3f" }
    ]
  },
  "2c": {
    question: "Runde 2c: Die riskante Investition steht zur Debatte. Wie reagierst du?",
    options: [
      { text: "Investition trotzdem durchführen", score: 1, next: "3g" },
      { text: "Zusätzliche Finanzierungsquellen erschließen", score: 2, next: "3h" },
      { text: "Investition vorerst auf Eis legen", score: -2, next: "3i" }
    ]
  },
  // Runde 3
  "3a": {
    question: "Runde 3a: Der motivierende Talk schlägt an. Wie weiter?",
    options: [
      { text: "Neue Markterschließung starten", score: 2, next: "4a" },
      { text: "Bestehende Kundenbeziehungen intensivieren", score: 1, next: "4b" },
      { text: "Ein Reorganisationsteam bilden", score: 0, next: "4c" }
    ]
  },
  "3b": {
    question: "Runde 3b: Die strengen Regeln verunsichern dein Team. Was machst du?",
    options: [
      { text: "Regeln flexibel anpassen", score: 1, next: "4d" },
      { text: "Stur an den Regeln festhalten", score: -2, next: "4e" },
      { text: "Team-Feedback einholen", score: 2, next: "4f" }
    ]
  },
  "3c": {
    question: "Runde 3c: Deine Gleichgültigkeit schlägt sich nieder. Wie reagierst du?",
    options: [
      { text: "Schnell handeln und das Team motivieren", score: 2, next: "4g" },
      { text: "Verantwortung delegieren", score: -1, next: "4h" },
      { text: "Warnungen weiterhin ignorieren", score: -2, next: "4i" }
    ]
  },
  "3d": {
    question: "Runde 3d: Dein Plan beeindruckt die Investoren. Wie nutzt du den Schwung?",
    options: [
      { text: "Expansion des Unternehmens vorantreiben", score: 3, next: "4j" },
      { text: "Neue Partnerschaften eingehen", score: 2, next: "4k" },
      { text: "Vorsichtige Schritte wählen", score: 0, next: "4l" }
    ]
  },
  "3e": {
    question: "Runde 3e: Die kurzfristigen Lösungen wirken unsolide. Wie geht es weiter?",
    options: [
      { text: "Einen langfristigen Plan präsentieren", score: 2, next: "4m" },
      { text: "Vorläufige Erfolge betonen", score: 0, next: "4n" },
      { text: "Alternative Maßnahmen entwickeln", score: 1, next: "4o" }
    ]
  },
  "3f": {
    question: "Runde 3f: Dein Bauchgefühl zahlt sich teils aus. Was kommt als Nächstes?",
    options: [
      { text: "Risikoprojekte weiterverfolgen", score: 1, next: "4p" },
      { text: "Sichere Geschäftsbereiche stärken", score: 2, next: "4q" },
      { text: "Komplette Strategieänderung einleiten", score: -1, next: "4r" }
    ]
  },
  "3g": {
    question: "Runde 3g: Erste Erfolge der riskanten Investition zeigen Wirkung. Wie reagierst du?",
    options: [
      { text: "Weiter in diesen Bereich investieren", score: 2, next: "4s" },
      { text: "Gewinne abwerfen und reinvestieren", score: 1, next: "4t" },
      { text: "Teilverkauf in Erwägung ziehen", score: 0, next: "4u" }
    ]
  },
  "3h": {
    question: "Runde 3h: Zusätzliche Finanzierungsquellen eröffnen neue Chancen. Wie weiter?",
    options: [
      { text: "Fusionen und Akquisitionen vorantreiben", score: 3, next: "4v" },
      { text: "Organisches Wachstum fördern", score: 2, next: "4w" },
      { text: "Strategische Reserve aufbauen", score: 1, next: "4x" }
    ]
  },
  "3i": {
    question: "Runde 3i: Das Auf-Eis-Legen führt zu Unsicherheit. Was ist dein nächster Schritt?",
    options: [
      { text: "Alternative Investitionsoptionen prüfen", score: 1, next: "4y" },
      { text: "Andere Projekte priorisieren", score: 2, next: "4z" },
      { text: "Status Quo beibehalten", score: -1, next: "4aa" }
    ]
  },
  // Runde 4 (Auswahl einiger Verzweigungen; weitere können nach Bedarf ergänzt werden)
  "4a": {
    question: "Runde 4a: Die Expansion zeigt erste Erfolge. Wie planst du weiter?",
    options: [
      { text: "Neue Märkte erobern", score: 2, next: "5a" },
      { text: "Bestehende Märkte festigen", score: 1, next: "5b" },
      { text: "Noch mehr Risiken eingehen", score: -1, next: "5c" }
    ]
  },
  "4b": {
    question: "Runde 4b: Die Kundenbeziehungen blühen. Wie gestaltest du die Zukunft?",
    options: [
      { text: "Loyalitätsprogramme entwickeln", score: 2, next: "5d" },
      { text: "Neue Vertriebswege erschließen", score: 1, next: "5e" },
      { text: "Kostensenkungen durchsetzen", score: -2, next: "5f" }
    ]
  },
  "4c": {
    question: "Runde 4c: Das Reorganisationsteam zeigt wenig Wirkung. Was tust du?",
    options: [
      { text: "Externe Berater hinzuziehen", score: 1, next: "5g" },
      { text: "Internes Feedback intensivieren", score: 2, next: "5h" },
      { text: "Kompletten Kurswechsel vornehmen", score: -1, next: "5i" }
    ]
  },
  "4d": {
    question: "Runde 4d: Flexible Regelanpassungen zeigen Wirkung. Wie geht es weiter?",
    options: [
      { text: "Neue Geschäftsfelder erschließen", score: 2, next: "5j" },
      { text: "Das bestehende Geschäft ausbauen", score: 1, next: "5k" },
      { text: "Innovationsprojekte initiieren", score: 2, next: "5l" }
    ]
  },
  "4e": {
    question: "Runde 4e: Das starre Festhalten an Regeln führt zu Frust. Was machst du?",
    options: [
      { text: "Kompromisse eingehen", score: 1, next: "5m" },
      { text: "Strenge Maßnahmen einleiten", score: -2, next: "5n" },
      { text: "Teamwork fördern", score: 2, next: "5o" }
    ]
  },
  "4f": {
    question: "Runde 4f: Das Einholen von Teamfeedback erzielt positive Änderungen. Wie reagierst du?",
    options: [
      { text: "Feedback in neue Richtlinien umsetzen", score: 2, next: "5p" },
      { text: "Maßnahmen zur Teamentwicklung starten", score: 1, next: "5q" },
      { text: "Kurzfristige Erfolge feiern", score: 1, next: "5r" }
    ]
  },
  // Für weitere Verzweigungen in Runde 4 (4g bis 4l, 4p bis 4r, ... ) können ähnliche Knoten erstellt werden.
  // Im folgenden Beispiel beschränken wir uns auf einige Knoten bis Runde 4; alle Optionen, die in Runde 4 gewählt werden, führen zu einem finalen Knoten in Runde 5.
  
  // Runde 5 (Finale Knoten)
  "5a": {
    question: "Runde 5a (Ende): Deine Expansion war ein voller Erfolg!",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Herzlichen Glückwunsch! Du bist der CEO of the Year!",
    alternativeMessage: "Deine Strategie reichte nicht – du wurdest entlassen."
  },
  "5b": {
    question: "Runde 5b (Ende): Du hast Märkte stabilisiert, aber der Wettbewerb bleibt hart.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Erfolgreich und stabil – du übernimmst als CEO!",
    alternativeMessage: "Der Erfolg blieb aus – das Ruder ging an jemand anderen."
  },
  "5c": {
    question: "Runde 5c (Ende): Dein hohes Risiko führte zu Verlusten.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Trotz Rückschlägen steigst du auf!",
    alternativeMessage: "Die Verluste waren zu hoch – du wurdest gefeuert."
  },
  "5d": {
    question: "Runde 5d (Ende): Deine Loyalitätsprogramme haben das Betriebsklima verbessert.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Als Teamplayer wirst du als CEO gefeiert!",
    alternativeMessage: "Trotz Bemühungen reichte der Erfolg nicht."
  },
  "5e": {
    question: "Runde 5e (Ende): Neue Vertriebswege führen zu einem Umsatzboom.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Innovation zahlt sich aus – du steigst auf!",
    alternativeMessage: "Der Umsatz war nicht ausreichend – das Ergebnis blieb aus."
  },
  "5f": {
    question: "Runde 5f (Ende): Kostensenkungen halfen kurzfristig, langfristig schadeten sie dem Unternehmen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Trotz Rückschlägen meisterst du die Krise als CEO!",
    alternativeMessage: "Die langfristigen Schäden waren zu groß – du wurdest entlassen."
  },
  "5g": {
    question: "Runde 5g (Ende): Externe Berater brachten frischen Wind.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Dein innovativer Ansatz überzeugt – du bist der CEO!",
    alternativeMessage: "Der frische Wind reichte nicht – das Unternehmen ändert die Führung."
  },
  "5h": {
    question: "Runde 5h (Ende): Internes Feedback führte zu einer soliden Umstrukturierung.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Dank Teamgeist übernimmst du als CEO!",
    alternativeMessage: "Die Maßnahmen reichten nicht – du verlierst die Position."
  },
  "5i": {
    question: "Runde 5i (Ende): Dein Kurswechsel brachte unerwartete Wendungen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Deine Anpassungen retten das Unternehmen – du steigst auf!",
    alternativeMessage: "Der Wechsel war zu risikoreich – das Vertrauen schwand."
  },
  "5j": {
    question: "Runde 5j (Ende): Neue Geschäftsfelder bringen enormes Wachstum.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Du wirst als Visionär und erfolgreicher CEO gefeiert!",
    alternativeMessage: "Das Risiko war zu hoch – das Unternehmen scheiterte."
  },
  "5k": {
    question: "Runde 5k (Ende): Das bestehende Geschäft wurde erfolgreich ausgebaut.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Stabilität und Erfolg – du übernimmst als CEO!",
    alternativeMessage: "Stabilität reichte nicht – der Vorstand verlor das Vertrauen."
  },
  "5l": {
    question: "Runde 5l (Ende): Innovationsprojekte revolutionierten den Markt.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Mit Innovationskraft wirst du zum CEO of the Year!",
    alternativeMessage: "Die radikale Veränderung war zu riskant – du wurdest abgesetzt."
  },
  "5m": {
    question: "Runde 5m (Ende): Kompromisse entschärften den Konflikt.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Dein diplomatisches Geschick führt zum Aufstieg!",
    alternativeMessage: "Die Kompromisse reichten nicht – du verlierst deine Position."
  },
  "5n": {
    question: "Runde 5n (Ende): Harte Maßnahmen brachten kurzfristigen Erfolg, langfristig jedoch Probleme.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Trotz Schwierigkeiten behauptest du dich als CEO!",
    alternativeMessage: "Die Konsequenzen waren zu gravierend – das Vertrauen schwand."
  },
  "5o": {
    question: "Runde 5o (Ende): Teamwork führte zu kreativen Lösungen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Mit Teamgeist sicherst du dir den Titel CEO of the Year!",
    alternativeMessage: "Leider reichten die positiven Effekte nicht – der Erfolg blieb aus."
  },
  "5p": {
    question: "Runde 5p (Ende): Offene Kommunikation führte zu nachhaltigen Verbesserungen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Deine Transparenz macht dich zum Vorzeige-CEO!",
    alternativeMessage: "Obwohl gut gemeint, blieb der Durchbruch aus."
  },
  "5q": {
    question: "Runde 5q (Ende): Teamentwicklung stärkte den Zusammenhalt nachhaltig.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Dank des starken Teams behältst du den Posten!",
    alternativeMessage: "Der Zusammenhalt reichte nicht – die Führung wurde neu besetzt."
  },
  "5r": {
    question: "Runde 5r (Ende): Kurzfristige Erfolge motivierten das Team, aber die Zukunft bleibt ungewiss.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Dein Einsatz sicherte den Erfolg – du bist der CEO of the Year!",
    alternativeMessage: "Trotz kurzfristiger Gewinne reichte der Erfolg nicht langfristig."
  },
  // Weitere finale Knoten (5s bis 5aa) können bei Bedarf ergänzt werden.
  "5y": {
    question: "Runde 5y (Ende): Krisenintervention rettet den Tag.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "In der Krise behältst du die Kontrolle – CEO!",
    alternativeMessage: "Die Krise eskalierte – du wurdest entlassen."
  },
  "5z": {
    question: "Runde 5z (Ende): Umstrukturierung brachte langanhaltende Probleme.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Trotz Schwierigkeiten gelingt der Aufstieg!",
    alternativeMessage: "Die Umstrukturierung führte zum Abgang."
  },
  "5aa": {
    question: "Runde 5aa (Ende): Externe Hilfe bringt frischen Wind ins Unternehmen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Flexibilität und Weitblick machen dich zum CEO!",
    alternativeMessage: "Die Unterstützung reichte nicht – das Ruder ging an jemand anderen."
  }
};

const CEOGame = () => {
  // Start im Knoten "1", Score wird von Beginn an hochgezählt.
  const [currentId, setCurrentId] = useState("1");
  const [score, setScore] = useState(0);

  // Wird eine Option gewählt, wird der Score angepasst und zum nächsten Knoten gewechselt.
  const handleOptionClick = (option) => {
    setScore(prev => prev + option.score);
    // Wechsle zum nächsten Knoten, sofern vorhanden.
    if (gameData[option.next]) {
      setCurrentId(option.next);
    }
  };

  // Falls der aktuelle Knoten final ist, bereiten wir den Endbildschirm vor.
  const currentNode = gameData[currentId];
  if (currentNode.final) {
    const finalMessage = score >= currentNode.scoreThreshold ? currentNode.scoreMessage : currentNode.alternativeMessage;
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Spielende</h1>
        <h2>{currentNode.question}</h2>
        <p>Dein Endstand: {score}</p>
        <h3>{finalMessage}</h3>
        <button
          onClick={() => {
            setCurrentId("1");
            setScore(0);
          }}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Neustarten
        </button>
      </div>
    );
  }

  // Anzeige der aktuellen Frage und der drei Antwortoptionen.
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>CEO Dilemma</h1>
      <p>{currentNode.question}</p>
      {currentNode.options && currentNode.options.map((option, index) => (
        <div key={index} style={{ margin: '10px 0' }}>
          <button
            onClick={() => handleOptionClick(option)}
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            {option.text}
          </button>
        </div>
      ))}
      <p>Aktueller Score: {score}</p>
    </div>
  );
};

export default CEOGame;

