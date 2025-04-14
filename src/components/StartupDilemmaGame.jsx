import React, { useState } from 'react';

// Definition des verzweigten Fragenbaums mit 5 Ebenen
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
  // Runde 4 – Ergänzung der fehlenden Verzweigungen
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
    question: "Runde 4f: Team-Feedback hat positive Änderungen bewirkt. Wie reagierst du?",
    options: [
      { text: "Feedback in neue Richtlinien umsetzen", score: 2, next: "5p" },
      { text: "Teamentwicklung vorantreiben", score: 1, next: "5q" },
      { text: "Kurzfristige Erfolge feiern", score: 1, next: "5r" }
    ]
  },
  "4g": {
    question: "Runde 4g: Der motivierende Impuls wirkt – aber es steht noch viel an. Wie weiter?",
    options: [
      { text: "Neue Innovationsprojekte starten", score: 2, next: "5a" },
      { text: "Marktanalysen intensivieren", score: 1, next: "5b" },
      { text: "Risiken minimieren", score: -1, next: "5c" }
    ]
  },
  "4h": {
    question: "Runde 4h: Verantwortung delegieren zeigt Wirkung. Was machst du als Nächstes?",
    options: [
      { text: "Effizienzsteigerung vorantreiben", score: 2, next: "5d" },
      { text: "Kosten senken", score: 1, next: "5e" },
      { text: "Innovativ bleiben", score: 1, next: "5f" }
    ]
  },
  "4i": {
    question: "Runde 4i: Ignoranz führt zu Problemen. Wie versuchst du das Ruder rumzureißen?",
    options: [
      { text: "Schnell reagieren", score: 2, next: "5g" },
      { text: "Strategie anpassen", score: 1, next: "5h" },
      { text: "Externe Hilfe holen", score: 1, next: "5i" }
    ]
  },
  // Fehlende Knoten aus Runde 3h ergänzen:
  "4v": {
    question: "Runde 4v: Fusionen und Akquisitionen bringen frischen Wind ins Unternehmen. Wie weiter?",
    options: [
      { text: "Neue Märkte erobern", score: 2, next: "5j" },
      { text: "Bestehende Firmen restrukturieren", score: 1, next: "5k" },
      { text: "Aggressiv akquirieren", score: -1, next: "5l" }
    ]
  },
  "4w": {
    question: "Runde 4w: Organisches Wachstum stärkt das Unternehmen nachhaltig. Wie reagierst du?",
    options: [
      { text: "Weiter auf organisches Wachstum setzen", score: 2, next: "5m" },
      { text: "In neue Technologien investieren", score: 2, next: "5n" },
      { text: "Risiken minimieren", score: -1, next: "5o" }
    ]
  },
  "4x": {
    question: "Runde 4x: Aufbau einer strategischen Reserve stabilisiert den Betrieb. Wie geht es weiter?",
    options: [
      { text: "Reserve für zukünftige Investitionen nutzen", score: 1, next: "5p" },
      { text: "Reservierende Liquidität erhöhen", score: 1, next: "5q" },
      { text: "Mit Reserve Risiken eingehen", score: -1, next: "5r" }
    ]
  },
  // Zusätzliche Knoten für Runde 3i:
  "4y": {
    question: "Runde 4y: Alternative Investitionsoptionen eröffnen neue Perspektiven. Wie weiter?",
    options: [
      { text: "Innovationsprojekte starten", score: 2, next: "5a" },
      { text: "Neue Märkte erschließen", score: 1, next: "5b" },
      { text: "Risiken eingehen", score: -1, next: "5c" }
    ]
  },
  "4z": {
    question: "Runde 4z: Priorisierung anderer Projekte zeigt erste Erfolge. Wie gehst du vor?",
    options: [
      { text: "Strategisch investieren", score: 2, next: "5d" },
      { text: "Team neu organisieren", score: 1, next: "5e" },
      { text: "Nachhaltige Planung einleiten", score: 1, next: "5f" }
    ]
  },
  "4aa": {
    question: "Runde 4aa: Der Status Quo birgt Risiken. Wie entscheidest du dich?",
    options: [
      { text: "Kritische Projekte überdenken", score: 2, next: "5g" },
      { text: "Auf Nummer sicher gehen", score: 1, next: "5h" },
      { text: "Risiken in Kauf nehmen", score: -1, next: "5i" }
    ]
  },
  // Runde 5 – Finale Knoten (Beispiele für Endpunkte)
  "5a": {
    question: "Runde 5a (Ende): Deine Expansion war ein voller Erfolg! 🎉",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Herzlichen Glückwunsch! Du bist der CEO of the Year! 🏆",
    alternativeMessage: "Deine Strategie reichte nicht – du wurdest entlassen. 😞"
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
    question: "Runde 5d (Ende): Deine Loyalitätsprogramme verbessern das Betriebsklima.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Teamplayer und strategisch – du bist der CEO!",
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
    question: "Runde 5f (Ende): Kostensenkungen schadet langfristig dem Unternehmen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Trotz Schwierigkeiten behältst du den Posten!",
    alternativeMessage: "Langfristig zu riskant – du wurdest entlassen."
  },
  "5g": {
    question: "Runde 5g (Ende): Externe Berater brachten frischen Wind.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Innovativ und entscheidungsfreudig – du bist der CEO!",
    alternativeMessage: "Der frische Wind reichte nicht – Führung blieb aus."
  },
  "5h": {
    question: "Runde 5h (Ende): Internes Feedback führte zu einer soliden Umstrukturierung.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Teamgeist und Weitblick sichern den Erfolg – du bist der CEO!",
    alternativeMessage: "Die Maßnahmen reichten nicht – du verlierst die Position."
  },
  "5i": {
    question: "Runde 5i (Ende): Dein Kurswechsel brachte unerwartete Wendungen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Anpassungsfähigkeit zahlt sich aus – CEO of the Year!",
    alternativeMessage: "Der Wechsel war zu riskant – das Vertrauen sank."
  },
  "5j": {
    question: "Runde 5j (Ende): Deine Expansion in neue Märkte war ein Erfolg! 🎉",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Herzlichen Glückwunsch, du bist ein innovativer CEO!",
    alternativeMessage: "Trotz Expansion reichte der Erfolg nicht – Entlassung bleibt."
  },
  "5k": {
    question: "Runde 5k (Ende): Die Restrukturierung führte zu Stabilität.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Stabile Führung zahlt sich aus – du bist der CEO!",
    alternativeMessage: "Die Restrukturierung brachte nicht den erhofften Erfolg."
  },
  "5l": {
    question: "Runde 5l (Ende): Aggressive Akquisitionen erwiesen sich als riskant.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Trotz Risiken zeigt dein Durchhaltevermögen Wirkung – CEO!",
    alternativeMessage: "Die Risiken waren zu groß – das Unternehmen scheiterte."
  },
  "5m": {
    question: "Runde 5m (Ende): Dein organisches Wachstum führt zu nachhaltigem Erfolg.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Nachhaltiger Erfolg macht dich zum CEO!",
    alternativeMessage: "Erfolg blieb aus – das Unternehmen zittert."
  },
  "5n": {
    question: "Runde 5n (Ende): Investitionen in neue Technologien zahlen sich aus.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Innovation triumphiert – CEO of the Year!",
    alternativeMessage: "Die Technologiebereitschaft reichte nicht."
  },
  "5o": {
    question: "Runde 5o (Ende): Risiken wurden minimiert, aber Chancen verpasst.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Konservativer Erfolg führt zur Chefetage!",
    alternativeMessage: "Wenig Risiko, wenig Belohnung – der Titel bleibt unerreicht."
  },
  "5p": {
    question: "Runde 5p (Ende): Mit der Reserve klug investiert, sicherst du den Fortbestand.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Vorausschauend und strategisch – du bist der CEO!",
    alternativeMessage: "Die Reserve half nicht genug – es kam zum Rückschlag."
  },
  "5q": {
    question: "Runde 5q (Ende): Mehr Liquidität sichert den Fortbestand deines Unternehmens.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Liquiditätsstark und erfolgreich – CEO des Jahres!",
    alternativeMessage: "Die zusätzliche Liquidität reichte nicht – das Risiko blieb hoch."
  },
  "5r": {
    question: "Runde 5r (Ende): Risikospiel mit der Reserve bringt das Unternehmen ins Wanken.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Mut zum Risiko führt – du kletterst an die Spitze!",
    alternativeMessage: "Ohne ausreichende Absicherung scheitert der Kurs – Entlassung."
  }
};

const CEOGame = () => {
  // Zustand: Intro-Seite, aktueller Knoten, Score
  const [gameStarted, setGameStarted] = useState(false);
  const [currentId, setCurrentId] = useState("1");
  const [score, setScore] = useState(0);

  // Spielstart: Übergang von der Einführungsseite zum Spiel
  const startGame = () => {
    setGameStarted(true);
  };

  // Beim Klicken auf eine Option wird der Score angepasst und der nächste Knoten geladen
  const handleOptionClick = (option) => {
    setScore(prev => prev + option.score);
    if (gameData[option.next]) {
      setCurrentId(option.next);
    }
  };

  // Intro-Seite anzeigen, falls das Spiel noch nicht gestartet wurde
  if (!gameStarted) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h1>Willkommen beim CEO Dilemma! 🎮</h1>
        <p>
          In diesem Spiel triffst du als angehender CEO schwierige Entscheidungen, die über den Erfolg oder Misserfolg deines Unternehmens entscheiden.
        </p>
        <p>
          Jede Entscheidung verändert deinen <strong>Score</strong>: Kluge Züge erhöhen ihn, falsche Entscheidungen senken ihn.
          Nach 5 Runden entscheidet dein Score, ob du als <em>CEO of the Year</em> gefeiert wirst oder ob der Abschied aussteht. 
        </p>
        <p>
          Bist du bereit, die Herausforderungen eines echten CEOs anzunehmen? 🚀
        </p>
        <button 
          onClick={startGame}
          style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
        >
          🚀 Starte das Spiel!
        </button>
      </div>
    );
  }

  // Aktueller Knoten
  const currentNode = gameData[currentId];

  // Endbildschirm anzeigen, falls ein finaler Knoten erreicht wurde
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
            setGameStarted(false);
          }}
          style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}
        >
          🔄 Neustarten
        </button>
      </div>
    );
  }

  // Anzeige der aktuellen Frage und der drei Antwortoptionen
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
