import { useEffect, useRef, useState } from "react";

const GameCanvas = ({ onBackToMenu, onNextStage }) => {
  
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const keys = useRef({});
  const playerRef = useRef({ x: 50, y: 200, width: 60, height: 80, speed: 3 });
  const showInteract = useRef(false);
  const backgroundImageRef = useRef(null);
  const interactImage = useRef(null);

  const [infoText, setInfoText] = useState("");
  const [goalVisible, setGoalVisible] = useState(false);
  const playerImage = useRef(null);
  const doorImage = useRef(null);
  

  

  const canvasWidth = 600;
  const canvasHeight = 300;

  const interactObj = { x: 300, y: 240, width: 40, height: 40,  }; 
  const goalObj = { x: 500, y: 200, width: 80, height: 80 }; // disesuaikan
  

  const checkCollision = (a, b) => {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/door.png"; // pastikan file ini ada di /public
    img.onload = () => {
      doorImage.current = img;
      console.log("Gambar pintu berhasil dimuat!");
    };
    img.onerror = () => {
      console.warn("Gagal memuat gambar door.png");
    };
  }, []);
  //Object
  useEffect(() => {
    const img = new Image();
    img.src = "/stoberi.png"; // Pastikan file ini ada di /public
    img.onload = () => {
      interactImage.current = img;
      console.log("Gambar storberi berhasil dimuat!");
    };
    img.onerror = () => {
      console.warn("Gagal memuat gambar storberi.png");
    };
  }, []);
  // player
  useEffect(() => {
    const img = new Image();
    img.src = "/sprite.png"; // path dari folder public
    img.onload = () => {
      playerImage.current = img;
    };
  }, []);

  // Load background
  useEffect(() => {
    const img = new Image();
    img.src = "/mcut.png";
    img.onload = () => {
      backgroundImageRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const update = () => {
      const player = playerRef.current;

      // Movement
      if (keys.current["ArrowRight"]) player.x += player.speed;
      if (keys.current["ArrowLeft"]) player.x -= player.speed;

      // Batas layar
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > canvasWidth)
        player.x = canvasWidth - player.width;

      // Bersihkan canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Gambar background jika ada
      if (backgroundImageRef.current) {
        ctx.drawImage(
          backgroundImageRef.current,
          0,
          0,
          canvasWidth,
          canvasHeight
        );
      }

      // Tanah (280 - 300)
      ctx.fillStyle = "#d2b48c";
      ctx.fillRect(0, 270, canvasWidth, 60);
// Objek interaksi
      if (
        interactImage.current &&
        interactImage.current.complete
      ) {
        ctx.drawImage(
          interactImage.current,
          interactObj.x,
          interactObj.y,
          interactObj.width,
          interactObj.height
        );
      } else {
        // fallback kalau belum ready
        ctx.fillStyle = "orange";
        ctx.fillRect(
          interactObj.x,
          interactObj.y,
          interactObj.width,
          interactObj.height
        );
      }
      // Player
      if (playerImage.current) {
        ctx.drawImage(
          playerImage.current,
          player.x,
          player.y,
          player.width,
          player.height
        );
      } else {
        // fallback kalau gambar belum load
        ctx.fillStyle = "royalblue";
        ctx.fillRect(player.x, player.y, player.width, player.height);
      }

      // Cek interaksi
      const near = checkCollision(player, interactObj);
      showInteract.current = near;

      if (near) {
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText(
          "Tekan [E] untuk interaksi",
          interactObj.x - 20,
          interactObj.y - 10
        );
      }

     // Goal (pintu)
if (goalVisible) {
  if (doorImage.current && doorImage.current.complete) {
    ctx.drawImage(
      doorImage.current,
      goalObj.x,
      goalObj.y,
      goalObj.width,
      goalObj.height
    );
  } else {
    ctx.fillStyle = "green";
    ctx.fillRect(goalObj.x, goalObj.y, goalObj.width, goalObj.height);
  }

        if (checkCollision(player, goalObj)) {
          onNextStage();
          return;
        }
      }

      requestRef.current = requestAnimationFrame(update);
    };

    const handleKeyDown = (e) => {
      keys.current[e.code] = true;

      if (e.code === "KeyE" && showInteract.current) {
        setInfoText("Benda diambil!");
        setGoalVisible(true);
        setTimeout(() => setInfoText(""), 3000);
      }
    };

    const handleKeyUp = (e) => {
      keys.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    requestRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onNextStage, goalVisible]);

  const handleButtonDown = (key) => {
    keys.current[key] = true;

    if (key === "KeyE" && showInteract.current) {
      setInfoText("Benda diambil!");
      setGoalVisible(true);
      setTimeout(() => setInfoText(""), 3000);
    }
  };

  const handleButtonUp = (key) => {
    keys.current[key] = false;
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{
          border: "2px solid black",
          backgroundColor: "#f5f5f5",
          touchAction: "none",
        }}
      />

      {infoText && <div style={styles.infoBox}>{infoText}</div>}

      <div style={{ marginTop: 20 }}>
        <button onClick={onBackToMenu} style={styles.btnBack}>
          ⬅ Back to Menu
        </button>
      </div>

      <div style={styles.controls}>
        <button
          onTouchStart={() => handleButtonDown("ArrowLeft")}
          onTouchEnd={() => handleButtonUp("ArrowLeft")}
          onMouseDown={() => handleButtonDown("ArrowLeft")}
          onMouseUp={() => handleButtonUp("ArrowLeft")}
          style={styles.controlBtn}
        >
          ←
        </button>

        <button
          onTouchStart={() => handleButtonDown("KeyE")}
          onMouseDown={() => handleButtonDown("KeyE")}
          style={{
            ...styles.controlBtn,
            backgroundColor: "#ffb347",
          }}
        >
          E
        </button>

        <button
          onTouchStart={() => handleButtonDown("ArrowRight")}
          onTouchEnd={() => handleButtonUp("ArrowRight")}
          onMouseDown={() => handleButtonDown("ArrowRight")}
          onMouseUp={() => handleButtonUp("ArrowRight")}
          style={styles.controlBtn}
        >
          →
        </button>
      </div>
    </div>
  );
};

const styles = {
  infoBox: {
    position: "absolute",
    top: 20,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#000000cc",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    zIndex: 10,
  },
  controls: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  controlBtn: {
    width: 60,
    height: 60,
    fontSize: "24px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  btnBack: {
    padding: "10px 16px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#d9534f",
    color: "white",
    cursor: "pointer",
  },
};

export default GameCanvas;
