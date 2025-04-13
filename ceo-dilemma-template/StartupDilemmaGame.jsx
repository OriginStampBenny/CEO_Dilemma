
import { useState } from "react";

const scenarios = [
  // ... (die Szenarien bleiben unverändert)
];

export default function StartupDilemmaGame() {
  const [round, setRound] = useState(0);
  const [log, setLog] = useState([]);
  const [finance, setFinance] = useState(0);
  const [ethics, setEthics] = useState(0);
  const [morale, setMorale] = useState(0);

  const handleChoice = (choice) => {
    setLog([...log, { round: scenarios[round].title, choice: choice.label, effect: choice.effect }]);
    setFinance(finance + choice.score.finance);
    setEthics(ethics + choice.score.ethics);
    setMorale(morale + choice.score.morale);
    setRound(round + 1);
  };

  const restartGame = () => {
    setRound(0);
    setLog([]);
    setFinance(0);
    setEthics(0);
    setMorale(0);
  };

  const isGameOver = () => {
    return morale <= -3 || ethics <= -3;
  };

  const isWinner = () => {
    return round === scenarios.length && finance >= 5 && ethics >= 5 && morale >= 3;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">CEO Survival – Das Startup-Dilemma</h1>
        <p className="text-sm text-gray-500">Simulation mit ChatGPT, entwickelt von OriginStamp – Benny</p>
      </div>

      {round < scenarios.length && !isGameOver() ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">{scenarios[round].title}</h2>
          <p className="mb-4">{scenarios[round].description}</p>
          <div className="space-y-2">
            {scenarios[round].choices.map((choice, idx) => (
              <button
                key={idx}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleChoice(choice)}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isGameOver()
              ? "Spiel beendet – Du wurdest als CEO abgesetzt!"
              : isWinner()
              ? "🎉 Glückwunsch – Du bist CEO of the Year!"
              : "Spiel beendet"}
          </h2>
          <p className="mb-2">Hier ist dein Entscheidungslog:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            {log.map((entry, idx) => (
              <li key={idx}>
                <strong>{entry.round}</strong>: {entry.choice} → <em>{entry.effect}</em>
              </li>
            ))}
          </ul>
          <div className="mb-4">
            <p><strong>Finanzen:</strong> {finance}</p>
            <p><strong>Ethik/Reputation:</strong> {ethics}</p>
            <p><strong>Team-Moral:</strong> {morale}</p>
          </div>
          <button
            onClick={restartGame}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            🔁 Neustart
          </button>
        </div>
      )}
    </div>
  );
}
