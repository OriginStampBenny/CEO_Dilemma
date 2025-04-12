
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
        <Card className="mb-4">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">{scenarios[round].title}</h2>
            <p>{scenarios[round].description}</p>
            <div className="space-y-2">
              {scenarios[round].choices.map((choice, idx) => (
                <Button key={idx} className="w-full" onClick={() => handleChoice(choice)}>
                  {choice.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">
              {isGameOver()
                ? "Spiel beendet – Du wurdest als CEO abgesetzt!"
                : isWinner()
                ? "🎉 Glückwunsch – Du bist CEO of the Year!"
                : "Spiel beendet"}
            </h2>
            <p>Hier ist dein Entscheidungslog:</p>
            <ul className="list-disc list-inside space-y-1">
              {log.map((entry, idx) => (
                <li key={idx}>
                  <strong>{entry.round}</strong>: {entry.choice} → <em>{entry.effect}</em>
                </li>
              ))}
            </ul>
            <div>
              <p><strong>Finanzen:</strong> {finance}</p>
              <p><strong>Ethik/Reputation:</strong> {ethics}</p>
              <p><strong>Team-Moral:</strong> {morale}</p>
            </div>
            <Button className="mt-4" onClick={restartGame}>🔁 Neustart</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
