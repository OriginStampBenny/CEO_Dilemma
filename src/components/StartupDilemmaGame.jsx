import React, { useState } from 'react';

const gameData = {
  // Runde 1
  "1": {
    question: "Runde 1: Budgetkürzungen stehen an. Wie reagierst du?",
    options: [
      { text: "Personal abbauen zur Kostensenkung", score: -2, next: "2a" },
      { text: "Alternative Sparmaßnahmen einleiten", score: 2, next: "2b" },
      { text: "Trotz Budget in Innovationen investieren", score: 1, next: "2c" }
    ]
  },
  // Runde 2
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
  // Runde 4 – Alle Verzweigungen führen zu einem finalen Knoten in Runde 5
  "4a": {
    question: "Runde 4a: Die Expansion zeigt erste Erfolge. Wie planst du weiter?",
    options: [
      { text: "Neue Märkte erobern", score: 2, next: "5a" },
      { text: "Bestehende Märkte festigen", score: 1, next: "5b" },
      { text: "Noch mehr Risiken eingehen", score: -1, next: "5c" }
    ]
  },
  "4b": {
    question: "Runde 4b: Kundenbeziehungen blühen auf. Wie gestaltest du die Zukunft?",
    options: [
      { text: "Innovative Vertriebsstrategien", score: 2, next: "5d" },
      { text: "Kundenbindung intensivieren", score: 1, next: "5e" },
      { text: "Preisaktionen starten", score: -2, next: "5f" }
    ]
  },
  "4c": {
    question: "Runde 4c: Ein Reorganisationsteam wird gebildet. Wie geht es weiter?",
    options: [
      { text: "Effizienzsteigerung forcieren", score: 1, next: "5g" },
      { text: "Interne Prozesse optimieren", score: 2, next: "5h" },
      { text: "Radikal umstrukturieren", score: -1, next: "5i" }
    ]
  },
  "4d": {
    question: "Runde 4d: Flexible Regelanpassungen zeigen Wirkung. Wie reagierst du?",
    options: [
      { text: "Neue Geschäftsfelder erschließen", score: 2, next: "5j" },
      { text: "Das Kerngeschäft ausbauen", score: 1, next: "5k" },
      { text: "Innovative Projekte starten", score: 2, next: "5l" }
    ]
  },
  "4e": {
    question: "Runde 4e: Starres Festhalten an Regeln führt zu Frust. Was machst du?",
    options: [
      { text: "Kompromissbereitschaft zeigen", score: 1, next: "5m" },
      { text: "Strenge Maßnahmen einleiten", score: -2, next: "5n" },
      { text: "Teamwork fördern", score: 2, next: "5o" }
    ]
  },
  "4f": {
    question: "Runde 4f: Team-Feedback bewirkt positive Änderungen. Wie reagierst du?",
    options: [
      { text: "Neue Richtlinien umsetzen", score: 2, next: "5p" },
      { text: "Weiter Teamentwicklung fördern", score: 1, next: "5q" },
      { text: "Kurzfristige Erfolge feiern", score: 1, next: "5r" }
    ]
  },
  "4g": {
    question: "Runde 4g: Motivation steigt – aber der Weg ist noch lang. Wie planst du?",
    options: [
      { text: "Innovationsprojekte starten", score: 2, next: "5a" },
      { text: "Marktanalysen intensivieren", score: 1, next: "5b" },
      { text: "Risiken minimieren", score: -1, next: "5c" }
    ]
  },
  "4h": {
    question: "Runde 4h: Verantwortung wird delegiert. Wie setzt du Prioritäten?",
    options: [
      { text: "Effizienz steigern", score: 2, next: "5d" },
      { text: "Kosten senken", score: 1, next: "5e" },
      { text: "Innovativ bleiben", score: 1, next: "5f" }
    ]
  },
  "4i": {
    question: "Runde 4i: Ignoranz führt zu Problemen. Wie rüttelst du das Ruder auf?",
    options: [
      { text: "Schnell reagieren", score: 2, next: "5g" },
      { text: "Strategie anpassen", score: 1, next: "5h" },
      { text: "Externe Hilfe holen", score: 1, next: "5i" }
    ]
  },
  "4j": {
    question: "Runde 4j: Expansion beeindruckt die Investoren. Wie weiter?",
    options: [
      { text: "Weiter aggressiv expandieren", score: 2, next: "5j" },
      { text: "Konsolidierung einleiten", score: 1, next: "5k" },
      { text: "Risikoreiche Investitionen", score: -1, next: "5l" }
    ]
  },
  "4k": {
    question: "Runde 4k: Neue Partnerschaften entstehen. Wie nutzt du den Schwung?",
    options: [
      { text: "Strategische Allianzen formen", score: 2, next: "5m" },
      { text: "Erweiterte Kooperationen starten", score: 1, next: "5n" },
      { text: "Konservativ bleiben", score: -1, next: "5o" }
    ]
  },
  "4l": {
    question: "Runde 4l: Vorsichtige Schritte werden gewählt. Wie planst du weiter?",
    options: [
      { text: "Neue Märkte erschließen", score: 2, next: "5p" },
      { text: "Risiken minimieren", score: 1, next: "5q" },
      { text: "Innovationen fördern", score: 0, next: "5r" }
    ]
  },
  "4m": {
    question: "Runde 4m: Dein langfristiger Plan überzeugt. Wie setzt du ihn um?",
    options: [
      { text: "Strategisch vorgehen", score: 2, next: "5a" },
      { text: "Plan weiter verfeinern", score: 1, next: "5b" },
      { text: "Auf kurzfristigen Erfolg setzen", score: -1, next: "5c" }
    ]
  },
  "4n": {
    question: "Runde 4n: Vorläufige Erfolge motivieren. Wie nutzt du den Moment?",
    options: [
      { text: "Kontinuität sichern", score: 1, next: "5d" },
      { text: "Neue Strategien einführen", score: 2, next: "5e" },
      { text: "Risikoanalysen durchführen", score: -1, next: "5f" }
    ]
  },
  "4o": {
    question: "Runde 4o: Alternative Maßnahmen eröffnen Perspektiven. Was tust du?",
    options: [
      { text: "Innovative Ansätze verfolgen", score: 2, next: "5g" },
      { text: "Kooperationen stärken", score: 1, next: "5h" },
      { text: "Risiken verringern", score: -1, next: "5i" }
    ]
  },
  "4p": {
    question: "Runde 4p: Risikoprojekte zeigen erste Erfolge. Wie weiter?",
    options: [
      { text: "Mehr Risiko wagen", score: 2, next: "5j" },
      { text: "Ausbalancieren und erweitern", score: 1, next: "5k" },
      { text: "Zurückhaltend agieren", score: -1, next: "5l" }
    ]
  },
  "4q": {
    question: "Runde 4q: Sicherer Geschäftsbereich wächst. Wie planst du?",
    options: [
      { text: "Weiter investieren", score: 2, next: "5m" },
      { text: "Innovative Projekte starten", score: 1, next: "5n" },
      { text: "Risiken evaluieren", score: -1, next: "5o" }
    ]
  },
  "4r": {
    question: "Runde 4r: Eine komplette Strategieänderung sorgt für Unruhe. Was ist dein Schritt?",
    options: [
      { text: "Neue Führungskräfte ins Boot holen", score: 2, next: "5p" },
      { text: "Interne Umstrukturierung einleiten", score: 1, next: "5q" },
      { text: "Externen Berater engagieren", score: 0, next: "5r" }
    ]
  },
  "4s": {
    question: "Runde 4s: Investitionen fließen, der Markt ist volatil. Wie reagierst du?",
    options: [
      { text: "Weiter investieren", score: 2, next: "5a" },
      { text: "Markt beobachten und anpassen", score: 1, next: "5b" },
      { text: "Teilverkauf in Erwägung ziehen", score: 0, next: "5c" }
    ]
  },
  "4t": {
    question: "Runde 4t: Gewinne steigen, der Wettbewerb zieht nach. Wie planst du?",
    options: [
      { text: "Reinvestition in Innovationen", score: 2, next: "5d" },
      { text: "Preisstrategien anpassen", score: 1, next: "5e" },
      { text: "Diversifikation erwägen", score: -1, next: "5f" }
    ]
  },
  "4u": {
    question: "Runde 4u: Teilverkauf führt zu kurzfristigem Cashflow. Was tust du?",
    options: [
      { text: "Stabilisieren durch Reinvestition", score: 1, next: "5g" },
      { text: "Neue Investoren anlocken", score: 2, next: "5h" },
      { text: "Risiken minimieren", score: 0, next: "5i" }
    ]
  },
  "4v": {
    question: "Runde 4v: Fusionen und Akquisitionen bringen frischen Wind. Wie weiter?",
    options: [
      { text: "Neue Märkte erobern", score: 2, next: "5j" },
      { text: "Firmen restrukturieren", score: 1, next: "5k" },
      { text: "Aggressiv akquirieren", score: -1, next: "5l" }
    ]
  },
  "4w": {
    question: "Runde 4w: Organisches Wachstum stärkt das Unternehmen. Wie reagierst du?",
    options: [
      { text: "Weiter auf Wachstum setzen", score: 2, next: "5m" },
      { text: "In neue Technologien investieren", score: 2, next: "5n" },
      { text: "Risiken minimieren", score: -1, next: "5o" }
    ]
  },
  "4x": {
    question: "Runde 4x: Aufbau einer strategischen Reserve stabilisiert den Betrieb. Wie geht's weiter?",
    options: [
      { text: "Reserve für Investitionen nutzen", score: 1, next: "5p" },
      { text: "Liquidität erhöhen", score: 1, next: "5q" },
      { text: "Mit Reserve Risiken eingehen", score: -1, next: "5r" }
    ]
  },
  "4y": {
    question: "Runde 4y: Alternative Investitionsoptionen eröffnen Perspektiven. Wie weiter?",
    options: [
      { text: "Innovationsprojekte starten", score: 2, next: "5a" },
      { text: "Neue Märkte erschließen", score: 1, next: "5b" },
      { text: "Risiken eingehen", score: -1, next: "5c" }
    ]
  },
  "4z": {
    question: "Runde 4z: Priorisierung anderer Projekte zeigt Erfolge. Wie planst du?",
    options: [
      { text: "Strategisch investieren", score: 2, next: "5d" },
      { text: "Team reorganisieren", score: 1, next: "5e" },
      { text: "Nachhaltig planen", score: 1, next: "5f" }
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
  // Runde 5 – Finale Knoten
  "5a": {
    question: "Ende 5a: Deine Expansion war ein voller Erfolg!",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Super gemacht! Du bist der CEO of the Year! 🏆",
    alternativeMessage: "Leider ging die Expansion nach hinten los – du wurdest entlassen. 😞"
  },
  "5b": {
    question: "Ende 5b: Deine Marktstrategie zeigt Wirkung.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Dein Gespür für Märkte zahlt sich aus – Glückwunsch!",
    alternativeMessage: "Ohne den nötigen Schliff bleibt der Erfolg aus."
  },
  "5c": {
    question: "Ende 5c: Hohe Risiken führten zu Verlusten.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Trotz Risiken hast du den Erfolg gerettet!",
    alternativeMessage: "Die Risiken waren zu hoch – Abschied vom CEO-Titel."
  },
  "5d": {
    question: "Ende 5d: Teamarbeit und Innovation zählen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Mit Teamgeist und Innovation bist du der CEO! 🎉",
    alternativeMessage: "Ohne Teamkraft bleibt der Erfolg aus."
  },
  "5e": {
    question: "Ende 5e: Deine Ideen beflügeln das Unternehmen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Kreativität zahlt sich aus – du führst das Unternehmen!",
    alternativeMessage: "Die Ideen reichten nicht – der Erfolg blieb aus."
  },
  "5f": {
    question: "Ende 5f: Vorsichtige Strategien versus Risiko.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Konservativ und erfolgreich – du bist der CEO!",
    alternativeMessage: "Zu vorsichtig – der nötige Mut fehlte."
  },
  "5g": {
    question: "Ende 5g: Investitionen in die Zukunft zeigten Wirkung.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Zukunftsweisend und erfolgreich – Glückwunsch!",
    alternativeMessage: "Ohne den nötigen Schub blieb der Erfolg aus."
  },
  "5h": {
    question: "Ende 5h: Strategische Weitsicht führte zum Erfolg.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Mit Weitblick und Strategie wurdest du gekrönt!",
    alternativeMessage: "Der Blick in die Zukunft reichte nicht – du verlierst den Titel."
  },
  "5i": {
    question: "Ende 5i: Risiko und Innovation im Gleichgewicht.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Perfekte Balance – du bist der CEO of the Year!",
    alternativeMessage: "Das Gleichgewicht fehlte – Misserfolg besiegelt."
  },
  "5j": {
    question: "Ende 5j: Fusionen haben den Kurs verändert.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Deine Strategie bei Fusionen war Gold wert!",
    alternativeMessage: "Die Fusionen brachten zu viel Chaos – du wurdest entlassen."
  },
  "5k": {
    question: "Ende 5k: Restrukturierungen zahlten sich aus.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Mit klugen Restrukturierungen hast du's geschafft!",
    alternativeMessage: "Die Restrukturierung blieb wirkungslos – der Erfolg blieb aus."
  },
  "5l": {
    question: "Ende 5l: Aggressive Akquisitionen waren riskant.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Trotz Risiken wurdest du belohnt – CEO!",
    alternativeMessage: "Die Akquisitionen waren zu riskant – das Ruder ging verloren."
  },
  "5m": {
    question: "Ende 5m: Organisches Wachstum führt zu nachhaltigem Erfolg.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Nachhaltiger Erfolg – du bist der CEO!",
    alternativeMessage: "Ohne zusätzliches Wachstum blieb der Erfolg aus."
  },
  "5n": {
    question: "Ende 5n: Neue Technologien brachten frischen Wind.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Innovation triumphiert – CEO of the Year!",
    alternativeMessage: "Die Technologiebereitschaft reichte nicht – der Erfolg blieb aus."
  },
  "5o": {
    question: "Ende 5o: Stabilität durch risikobegrenzte Entscheidungen.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Konservativ und sicher – du führst das Unternehmen!",
    alternativeMessage: "Die Risikoaversion kostete dich den Titel."
  },
  "5p": {
    question: "Ende 5p: Kluges Finanzmanagement zahlt sich aus.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Mit Weitsicht und Management bist du gekrönt!",
    alternativeMessage: "Finanzielle Unsicherheiten führten zum Scheitern."
  },
  "5q": {
    question: "Ende 5q: Liquiditätsmanagement sichert die Zukunft.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Liquidität und Weitsicht – du bist der CEO!",
    alternativeMessage: "Ohne ausreichende Liquidität blieb der Erfolg aus."
  },
  "5r": {
    question: "Ende 5r: Risikobereitschaft und Strategie im Einklang.",
    final: true,
    scoreThreshold: 8,
    scoreMessage: "Deine Balance aus Mut und Planung führt zum Erfolg!",
    alternativeMessage: "Die Balance war nicht optimal – Abschied vom Posten."
  }
};

const CEOGame = () => {
  // Zustand: Intro-Seite, aktueller Knoten, Score
  const [gameStarted, setGameStarted] = useState(false);
  const [currentId, setCurrentId] = useState("1");
  const [score, setScore] = useState(0);

  // Spielstart: Übergang von Einführungsseite zum Spiel
  const startGame = () => {
    setGameStarted(true);
  };

  // Option gewählt: Score aktualisieren und nächsten Knoten laden
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
          Als angehender CEO musst du schwierige Entscheidungen treffen – jede Wahl beeinflusst deinen Score.
        </p>
        <p>
          Kluge Entscheidungen führen zum Erfolg, während falsche Züge dich ins Straucheln bringen. Nach 5 Runden zeigt dein Score, ob du als <em>CEO of the Year</em> gefeiert wirst oder den Abschied erlebst.
        </p>
        <p>
          Bist du bereit, das Ruder in die Hand zu nehmen? 🚀
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

  // Endbildschirm, falls ein finaler Knoten erreicht wurde
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
