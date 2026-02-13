import { useState, useEffect, useRef } from 'react'

import confetti from 'canvas-confetti';

import './App.css'

function App() {
  const [noPosition, setNoPosition] = useState({ top: "70%", left: "60%" });
  const [accepted, setAccepted] = useState(false);
  const [wrongClick, setWrongClick] = useState(false);
  const [wrongMessage, setWrongMessage] = useState("");
  const audioRef = useRef(null);

  const wrongMessages = [
    "Ups… click equivocado 😏",
    "No, no es una respuesta 😌",
    "Intento fallido 💕",
    "Esa opción no está disponible 😇",
    "Piénsalo mejor princesa 👀",
  ];

  // Corazones flotando suaves
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "💗";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 15 + 15 + "px";
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 6000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const moveNoButton = () => {
    const buttonWidth = 120;
    const buttonHeight = 50;

    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setNoPosition({
      top: `${randomY}px`,
      left: `${randomX}px`,
    });
  };

  const handleNoClick = () => {
    const randomMessage =
      wrongMessages[Math.floor(Math.random() * wrongMessages.length)];

    setWrongMessage(randomMessage);
    setWrongClick(true);

    setTimeout(() => {
      setWrongClick(false);
    }, 2000);

    setTimeout(() => {
      moveNoButton();
    }, 100);
  };

  const handleYes = () => {
    setAccepted(true);

    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
    });

    audioRef.current.play();
  };

  return (
    <div className="container">
      <audio
        ref={audioRef}
        src="https://www.bensound.com/bensound-music/bensound-romantic.mp3"
      />

      <div className="letter">
        {!accepted ? (
          <>
            <h1 className="title sparkle">
              Valeria Medina Alzate 💕 <br />
              ¿Te gustaría ser mi San Valentín? 💍
            </h1>

            <div className="buttons">
              <button className="yesButton pulse" onClick={handleYes}>
                Sí, obvio 💖
              </button>

            </div>
            <button
              className="noButton"
              style={{
                position: "fixed",
                top: noPosition.top,
                left: noPosition.left,
              }}
              onMouseEnter={moveNoButton}
              onClick={handleNoClick}
            >
              No 😢
            </button>

            {wrongClick && (
              <p className="wrong-message">
                {wrongMessage}
              </p>
            )}
          </>
        ) : (
          <div className="accepted">
            💍 Sabía que dirías que sí 😍 <br /> <br />
            "Si esta vida fuera un libro, serías mi capitulo favorito,
            sin duda si el amor tuviera forma, tendría tu sonrisa." <br /> <br />
            Prepárate para el mejor San valentin ✨
            <div className="ring">💎</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
