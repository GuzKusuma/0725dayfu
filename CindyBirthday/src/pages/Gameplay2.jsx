import { useEffect, useRef, useState } from "react";

const GameStage2 = ({ onBackToMenu, onToStage3 }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const keys = useRef({});
  const playerRef = useRef({ x: 50, y: 200, width: 60, height: 80, speed: 3 });
  const backgroundImageRef = useRef(null);
  const [showInteract, setShowInteract] = useState(false);
  const [goalVisible, setGoalVisible] = useState(false);
  const [infoText, setInfoText] = useState("");
  const playerImage = useRef(null);
  const interactImage = useRef(null);
  const doorImage = useRef(null);

  const canvasWidth = 600;
  const canvasHeight = 300;

  const interactObj = { x: 300, y: 240, width: 60, height: 40 }; // disesuaikan
  const rightDoor = { x: 500, y: 200, width: 80, height: 80 }; // disesuaikan

  const checkCollision = (a, b) => {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  };

  // door
  
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

  // object

  useEffect(() => {
    const img = new Image();
    img.src = "/diary.png"; // Pastikan file ini ada di /public
    img.onload = () => {
      interactImage.current = img;
      console.log("Gambar storberi berhasil dimuat!");
    };
    img.onerror = () => {
      console.warn("Gagal memuat gambar storberi.png");
    };
  }, []);

    // Load background
    useEffect(() => {
      const img = new Image();
      img.src = "/taipei.png";
      img.onload = () => {
        backgroundImageRef.current = img;
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

      // Clear
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
      ctx.fillStyle = "#374351";
      ctx.fillRect(0, 270, canvasWidth, 60);

      // Interact Object
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

      const near = checkCollision(player, interactObj);
      setShowInteract(near);
      if (near) {
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText(
          "Press [E] to Interact",
          interactObj.x - 20,
          interactObj.y - 10
        );
      }

      // Pintu (muncul setelah interaksi)
    if (goalVisible) {
  if (doorImage.current && doorImage.current.complete) {
    ctx.drawImage(
      doorImage.current,
      rightDoor.x,
      rightDoor.y,
      rightDoor.width,
      rightDoor.height
    );
  } else {
    ctx.fillStyle = "green";
    ctx.fillRect(goalObj.x, goalObj.y, goalObj.width, goalObj.height);
  }

        if (checkCollision(player, rightDoor)) {
          onToStage3();
          return;
        }
      }

      // Player
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

    
      requestRef.current = requestAnimationFrame(update);
    };

    const handleKeyDown = (e) => {
      keys.current[e.code] = true;

      if (e.code === "KeyE" && showInteract) {
        setGoalVisible(true);
        setInfoText("Benda diambil!");
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
  }, [onToStage3, goalVisible, infoText]);

  // Touch / Mouse controls
  const handleButtonDown = (key) => {
    keys.current[key] = true;

    if (key === "KeyE" && showInteract) {
      setGoalVisible(true);
      setInfoText("Benda diambil!");
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
        width={600}
        height={300}
        style={{
          border: "2px solid black",
          backgroundColor: "#f0f8ff",
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

export default GameStage2;
