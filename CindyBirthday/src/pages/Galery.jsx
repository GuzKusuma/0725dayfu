import { useState } from "react";
import GameCanvas from "./Gameplay";
import GameStage2 from "./Gameplay2";
import GameStage3 from "./Gameplay3";

function App() {
  const [stage, setStage] = useState("menu");


  return (
    <>
      {stage === "menu" && (
        <div style={{ textAlign: "center" }}>
          <h1>Secret Gallery 🔎</h1>
          <p>Kumpulkan 3 Benda untuk menuju galeri!</p>
          <button style={{ backgroundColor: "#ff69b4", color: "black", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }} onClick={() => setStage("stage1")}>Start Game</button>
        </div>
      )}

      {stage === "stage1" && (
        <GameCanvas
          onBackToMenu={() => setStage("menu")}
          onNextStage={() => setStage("stage2")}
        />
      )}

      {stage === "stage2" && (
        <GameStage2
          onBackToMenu={() => setStage("menu")}
          onToStage3={() => setStage("stage3")}
        />
      )}
      {stage === "stage3" && (
        <GameStage3
          onBackToMenu={() => setStage("menu")}
        />
      )}
    </>
  );
}

export default App;
