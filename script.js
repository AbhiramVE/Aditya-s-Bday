// ===================== HOME SCREEN =====================
const homeScreen = document.getElementById("homeScreen");
const playBtn = document.getElementById("playBtn");
const music = document.getElementById("birthdayMusic");

playBtn.onclick = () => {
  homeScreen.style.display = "none";
  music.volume = 0.3;
  music.play().catch(() => console.log("Music blocked"));
  loadLevel();
};

// ===================== LEVEL DATA =====================
const levels = [
  { name: "Little Dwarf", hp: 100, image: "images/friend1.png", video: "videos/friend1.mp4" },
  { name: "Failed BBall Playa", hp: 110, image: "images/friend2.png", video: "videos/friend2.mp4" },
  { name: "Playa", hp: 120, image: "images/friend3.png", video: "videos/friend3.mp4" },
  { name: "Beethoven's Dog", hp: 130, image: "images/friend4.png", video: "videos/friend4.mp4" },
  { name: "STEM STUD", hp: 140, image: "images/friend5.png", video: "videos/friend5.mp4" },
  { name: "GOLEM SNORLAX GOLEM", hp: 150, image: "images/friend6.png", video: "videos/friend6.mp4" },
  { name: "She Wanted To Be Your Bday Gift", hp: 160, image: "images/friend7.png", video: "videos/friend7.mp4" },
  { name: "Abhi's Dog and Side Hoe", hp: 170, image: "images/friend8.png", video: "videos/friend8.mp4" },
  { name: "FINAL BOSS!", hp: 180, image: "images/friend9.png", video: "videos/friend9.mp4" },
  { name: "Princess 👑", hp: 260, image: "images/princess.png", video: "videos/princess.mp4" }
];

let currentLevel = 0;
let currentHP = 0;
const damage = 10;

const monster = document.getElementById("monster");
const health = document.getElementById("health");
const hpText = document.getElementById("hpText");
const levelTitle = document.getElementById("levelTitle");
const nextBtn = document.getElementById("nextBtn");
const video = document.getElementById("video");
const game = document.getElementById("game");

// ===================== LOAD LEVEL =====================
function loadLevel() {
  const level = levels[currentLevel];
  currentHP = level.hp;

  levelTitle.textContent = `Level ${currentLevel + 1}: ${level.name}`;
  monster.src = level.image;
  monster.style.display = "block";

  health.style.width = "100%";
  hpText.textContent = `${currentHP} HP`;

  video.style.display = "none";
  video.pause();
  video.src = "";

  nextBtn.hidden = true;

  if (level.name.includes("Princess")) {
    document.body.style.background = "linear-gradient(to bottom, #ffb6c1, #ff69b4)";
  } else {
    document.body.style.background = "linear-gradient(120deg, #ffe6f0, #ffcc99, #ffff99)";
  }
}

// ===================== DAMAGE EFFECT =====================
function showDamage() {
  const dmg = document.createElement("div");
  dmg.textContent = `🎂-${damage}`;
  dmg.style.position = "absolute";
  dmg.style.left = "50%";
  dmg.style.top = "45%";
  dmg.style.transform = "translate(-50%, -50%)";
  dmg.style.color = "#ff3399";
  dmg.style.fontSize = "28px";
  dmg.style.fontWeight = "bold";
  dmg.style.pointerEvents = "none";
  dmg.style.opacity = 1;
  dmg.style.transition = "transform 0.7s ease-out, opacity 0.7s ease-out";
  document.body.appendChild(dmg);

  setTimeout(() => {
    dmg.style.transform = "translate(-50%, -120%)";
    dmg.style.opacity = 0;
  }, 50);

  setTimeout(() => dmg.remove(), 800);
}

// ===================== ATTACK =====================
monster.onclick = () => {
  if (currentHP <= 0) return;

  currentHP -= damage;
  if (currentHP < 0) currentHP = 0;

  const percent = (currentHP / levels[currentLevel].hp) * 100;
  health.style.width = percent + "%";
  hpText.textContent = `${currentHP} HP`;

  showDamage();

  monster.style.transform = "scale(0.9)";
  setTimeout(() => monster.style.transform = "scale(1)", 100);

  if (currentHP === 0) defeatMonster();
};

// ===================== DEFEAT MONSTER =====================
function defeatMonster() {
  monster.style.display = "none";
  video.src = levels[currentLevel].video;
  video.style.display = "block";
  video.play();
}

// ===================== VIDEO END =====================
video.onended = () => {
  nextBtn.hidden = false;
};

// ===================== NEXT LEVEL =====================
nextBtn.onclick = () => {
  currentLevel++;
  if (currentLevel >= levels.length) {
    // Hide the game
    game.style.display = "none";

    // Create closing screen
    const closingScreen = document.createElement("div");
    closingScreen.id = "closingScreen";
    closingScreen.innerHTML = `
      <h1>🎉 HE SAVED THE PRINCESS! 👑</h1>
      <img src="${levels[levels.length - 1].image}" alt="Princess Riya" id="closingPrincess">
      <p>She wishes you the best wishes ❤️</p>
      <p>And so does everyone else who you destroyed the curse on! 🎂🎈</p>
      <p>Happy Birthday Aditya! 🎊</p>
      <button id="restartBtn">Play Again</button>
      <div id="confettiParticles"></div>
    `;
    document.body.appendChild(closingScreen);

    // Confetti particles effect
    const confettiContainer = document.getElementById("confettiParticles");
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.textContent = "🎉";
      confetti.style.position = "absolute";
      confetti.style.fontSize = `${Math.random() * 24 + 16}px`;
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = Math.random() * -50 + "px";
      confetti.style.opacity = Math.random();
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.transition = `transform 3s linear, top 3s linear`;
      confettiContainer.appendChild(confetti);

      // Animate falling
      setTimeout(() => {
        confetti.style.top = "110vh";
        confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
      }, 50 + Math.random() * 1000);
    }

    // Restart button logic
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.onclick = () => {
      closingScreen.remove();
      currentLevel = 0;
      game.style.display = "flex";
      loadLevel();
    };

    return;
  }

  loadLevel();
};


