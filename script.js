/* =========================
   BATTLEZONE GAME SYSTEM
========================= */

let player = {
  name: "PLAYER",
  level: 1,
  xp: 0,
  coins: 500,
  wins: 0,
  kills: 0,
  completed: 0
};


/* =========================
   CHALLENGES
========================= */

const challenges = [
  {
    icon: "🔫",
    title: "Elimination Expert",
    description: "Get 10 eliminations.",
    xp: 150,
    coins: 100
  },

  {
    icon: "🎯",
    title: "Deadeye",
    description: "Get 5 headshots.",
    xp: 200,
    coins: 150
  },

  {
    icon: "🏃",
    title: "Road Runner",
    description: "Travel 1,000 meters.",
    xp: 100,
    coins: 75
  },

  {
    icon: "🏆",
    title: "Victory Royale",
    description: "Win 1 BattleZone match.",
    xp: 300,
    coins: 250
  },

  {
    icon: "💎",
    title: "Treasure Hunter",
    description: "Collect 500 coins.",
    xp: 125,
    coins: 100
  },

  {
    icon: "⚡",
    title: "Storm Survivor",
    description: "Survive for 10 minutes.",
    xp: 175,
    coins: 125
  }
];

let completedChallenges = [];


/* =========================
   NAVIGATION
========================= */

function showSection(sectionID) {

  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(sectionID).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   CHALLENGE DISPLAY
========================= */

function loadChallenges() {

  const list = document.getElementById("challengeList");

  list.innerHTML = "";

  challenges.forEach((challenge, index) => {

    const completed = completedChallenges.includes(index);

    const card = document.createElement("div");

    card.className = "challenge";

    if (completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <div class="challenge-icon">
        ${challenge.icon}
      </div>

      <h2>${challenge.title}</h2>

      <p>${challenge.description}</p>

      <div class="reward">
        <span>
          ⭐ ${challenge.xp} XP
          &nbsp; 🪙 ${challenge.coins}
        </span>

        <button
          onclick="completeChallenge(${index})"
          ${completed ? "disabled" : ""}
        >
          ${completed ? "✓ COMPLETED" : "COMPLETE"}
        </button>
      </div>
    `;

    list.appendChild(card);
  });
}


/* =========================
   COMPLETE CHALLENGE
========================= */

function completeChallenge(index) {

  if (completedChallenges.includes(index)) {
    return;
  }

  const challenge = challenges[index];

  completedChallenges.push(index);

  player.completed++;

  player.coins += challenge.coins;

  addXP(challenge.xp);

  showNotification(
    `🎯 Challenge Complete! +${challenge.xp} XP +${challenge.coins} coins`
  );

  updateUI();

  loadChallenges();
}


/* =========================
   XP SYSTEM
========================= */

function addXP(amount) {

  player.xp += amount;

  while (player.xp >= getRequiredXP()) {

    player.xp -= getRequiredXP();

    player.level++;

    player.coins += 250;

    showNotification(
      `🎉 LEVEL UP! You reached Level ${player.level}! +250 coins`
    );
  }

  updateUI();
}


function getRequiredXP() {

  return player.level * 100;
}


/* =========================
   PLAY MATCH
========================= */

function startMatch() {

  showNotification("🚌 Match starting... Dropping into BattleZone!");

  setTimeout(() => {

    const randomKills =
      Math.floor(Math.random() * 8) + 1;

    const won =
      Math.random() < 0.25;

    player.kills += randomKills;

    player.coins += randomKills * 10;

    addXP(randomKills * 20);

    if (won) {

      player.wins++;

      player.coins += 300;

      addXP(300);

      showNotification(
        `🏆 VICTORY! ${randomKills} eliminations! +300 coins`
      );

    } else {

      showNotification(
        `💀 Match finished! ${randomKills} eliminations.`
      );
    }

    updateUI();

  }, 1500);
}


/* =========================
   MAP DROPS
========================= */

function dropLocation(location) {

  showNotification(
    `🪂 Dropping into ${location}!`
  );

  setTimeout(() => {

    const xpReward =
      Math.floor(Math.random() * 100) + 50;

    const coinReward =
      Math.floor(Math.random() * 75) + 25;

    player.coins += coinReward;

    addXP(xpReward);

    showNotification(
      `📦 Loot found! +${xpReward} XP +${coinReward} coins`
    );

    updateUI();

  }, 1200);
}


/* =========================
   SHOP
========================= */

function buyItem(item, price) {

  if (player.coins < price) {

    showNotification(
      "❌ Not enough coins!"
    );

    return;
  }

  player.coins -= price;

  showNotification(
    `🛒 You unlocked ${item}!`
  );

  updateUI();
}


/* =========================
   NOTIFICATIONS
========================= */

function showNotification(message) {

  const notification =
    document.getElementById("notification");

  notification.textContent = message;

  notification.classList.add("show");

  setTimeout(() => {

    notification.classList.remove("show");

  }, 3000);
}


/* =========================
   UPDATE UI
========================= */

function updateUI() {

  document.getElementById("coins").textContent =
    player.coins;

  document.getElementById("totalCoins").textContent =
    player.coins;

  document.getElementById("level").textContent =
    player.level;

  document.getElementById("xp").textContent =
    player.xp;

  document.getElementById("nextXP").textContent =
    getRequiredXP();

  document.getElementById("wins").textContent =
    player.wins;

  document.getElementById("kills").textContent =
    player.kills;

  document.getElementById("completed").textContent =
    player.completed;

  document.getElementById("playerName").textContent =
    player.name;

  document.getElementById("leaderName").textContent =
    player.name;

  document.getElementById("leaderXP").textContent =
    player.xp + " XP";

  const percentage =
    (player.xp / getRequiredXP()) * 100;

  document.getElementById("xpFill").style.width =
    percentage + "%";
}


/* =========================
   SAVE GAME
========================= */

function saveGame() {

  localStorage.setItem(
    "battlezonePlayer",
    JSON.stringify(player)
  );

  localStorage.setItem(
    "battlezoneChallenges",
    JSON.stringify(completedChallenges)
  );
}


/* =========================
   LOAD GAME
========================= */

function loadGame() {

  const savedPlayer =
    localStorage.getItem("battlezonePlayer");

  const savedChallenges =
    localStorage.getItem("battlezoneChallenges");

  if (savedPlayer) {

    player =
      JSON.parse(savedPlayer);

  }

  if (savedChallenges) {

    completedChallenges =
      JSON.parse(savedChallenges);

  }
}


/* =========================
   AUTO SAVE
========================= */

setInterval(() => {

  saveGame();

}, 5000);


/* =========================
   START
========================= */

loadGame();

updateUI();

loadChallenges();
