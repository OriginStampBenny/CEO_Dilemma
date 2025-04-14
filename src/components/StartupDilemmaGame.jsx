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
  // Runde 4 (Beispielhafte Knoten, weitere können ergänzt werden)
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
  // Runde 5 (Finale Knoten)
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
  // Weitere finale Knoten (5d bis 5i etc.) können analog ergänzt werden.
};

const CEOGame = () => {
  // Zustand für den Spielstart (Intro-Seite) und den Spielverlauf
  const [gameStarted, setGameStarted] = useState(false);
  const [currentId, setCurrentId] = useState("1");
  const [score, setScore] = useState(0);

  // Startet das Spiel und blendet die Einführungsseite aus
  const startGame = () => {
    setGameStarted(true);
  };

  // Wird eine Option gewählt, wird der Score aktualisiert und zum nächsten Knoten gewechselt
  const handleOptionClick = (option) => {
    setScore(prev => prev + option.score);
    if (gameData[option.next]) {
      setCurrentId(option.next);
    }
  };

  // Falls das Spiel noch nicht gestartet wurde, zeige die Einführungsseite
  if (!gameStarted) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h1>Willkommen beim CEO Dilemma! 🎮</h1>
        <p>
          In diesem Spiel triffst du als angehender CEO schwierige Entscheidungen, die über den Erfolg oder Misserfolg deines Unternehmens entscheiden.
        </p>
        <p>
          Jede Entscheidung beeinflusst deinen <strong>Score</strong>: Falsche Entscheidungen senken ihn, während kluge Züge ihn erhöhen.
          Nach 5 Runden zeigt dir dein Score, ob du als <em>CEO of the Year</em> gefeiert wirst oder ob du entlassen wirst. 
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

  // Hole den aktuellen Knoten aus dem Spielbaum
  const currentNode = gameData[currentId];

  // Wenn ein finaler Knoten erreicht ist, zeige das Endergebnis an
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
