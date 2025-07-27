import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const GameStage3 = ({ onBackToMenu }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const keys = useRef({});
  const navigate = useNavigate();

  const playerRef = useRef({ x: 50, y: 200, width: 60, height: 80, speed: 3 });

  const playerImage = useRef(new Image());
  const interactImage = useRef(new Image());
  const backgroundImage = useRef(new Image());

  const [showInteract, setShowInteract] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [showExitDoor, setShowExitDoor] = useState(false);

  const canvasWidth = 600;
  const canvasHeight = 300;
  const doorImage = useRef(null);

  const interactObj = { x: 300, y: 240, width: 40, height: 40,  }; 
  const rightDoor = { x: 500, y: 200, width: 80, height: 80 };;

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

  useEffect(() => {
    // Load all images
    playerImage.current.src = "/sprite.png";
    interactImage.current.src = "/tablet.png";
    backgroundImage.current.src = "/bali.png";

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

      // Cek interaksi
      const isNearInteract = checkCollision(player, interactObj);
      setShowInteract(isNearInteract);

      // Cek pintu
      if (showExitDoor && checkCollision(player, rightDoor)) {
        navigate("/ucapan");
        return;
      }

      // Gambar ulang
      draw(ctx);
      requestRef.current = requestAnimationFrame(update);
    };

    const draw = (ctx) => {
      // Background
      if (backgroundImage.current.complete) {
        ctx.drawImage(backgroundImage.current, 0, 0, canvasWidth, canvasHeight);
      } else {
        ctx.fillStyle = "#cde";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // Tanah
      ctx.fillStyle = "#532A0F";
      ctx.fillRect(0, 270, canvasWidth, 60);

      // Interact Object
      if (interactImage.current.complete) {
        ctx.drawImage(
          interactImage.current,
          interactObj.x,
          interactObj.y,
          interactObj.width,
          interactObj.height
        );
      } else {
        ctx.fillStyle = "orange";
        ctx.fillRect(
          interactObj.x,
          interactObj.y,
          interactObj.width,
          interactObj.height
        );
      }

      // Exit Door
      if (showExitDoor) {
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
      }

      // Player
      if (playerImage.current.complete) {
        ctx.drawImage(
          playerImage.current,
          playerRef.current.x,
          playerRef.current.y,
          playerRef.current.width,
          playerRef.current.height
        );
      } else {
        ctx.fillStyle = "purple";
        ctx.fillRect(
          playerRef.current.x,
          playerRef.current.y,
          playerRef.current.width,
          playerRef.current.height
        );
      }

      // Interact Prompt
      if (showInteract) {
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText("Tekan E untuk mengambil", interactObj.x - 10, interactObj.y - 10);
      }
    };

    const handleKeyDown = (e) => {
      keys.current[e.code] = true;

      if (e.code === "KeyE" && showInteract) {
        handleInteract();
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
  }, [showExitDoor, showInteract]);

  const handleInteract = () => {
    setShowExitDoor(true);
    setInfoText("Benda berhasil diambil!");
    setTimeout(() => setInfoText(""), 3000);
  };

  // Mobile controls
  const handleButtonDown = (key) => {
    keys.current[key] = true;
    if (key === "KeyE" && showInteract) handleInteract();
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
          backgroundColor: "#fafad2",
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
          style={{ ...styles.controlBtn, backgroundColor: "#ffb347" }}
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

export default GameStage3;
