// ========================================
// BATTLEZONE MAIN GAME
// ========================================


// PLAYER

let player = JSON.parse(
  localStorage.getItem("battlezonePlayer")
) || {

  name: "PLAYER",

  level: 1,

  xp: 0,

  coins: 500,

  wins: 0,

  kills: 0,

  completed: 0,

  matches: 0

};


// SAVED DATA

let completedChallenges = JSON.parse(
  localStorage.getItem("battlezoneChallenges")
) || [];


let inventory = JSON.parse(
  localStorage.getItem("battlezoneInventory")
) || [];


let unlockedAchievements = JSON.parse(
  localStorage.getItem("battlezoneAchievements")
) || [];


// ========================================
// NAVIGATION
// ========================================

function showSection(id) {

  document
    .querySelectorAll(".section")
    .forEach(section => {

      section.classList.remove("active");

    });


  const section =
    document.getElementById(id);


  if (section) {

    section.classList.add("active");

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (id === "leaderboard") {

    renderLeaderboard();

  }

}


// ========================================
// XP
// ========================================

function requiredXP() {

  return player.level * 100;

}


function addXP(amount) {

  player.xp += amount;


  while (
    player.xp >= requiredXP()
  ) {

    player.xp -= requiredXP();

    player.level++;

    player.coins += 250;


    notify(
      `🎉 LEVEL UP! You reached Level ${player.level}! +250 🪙`
    );

  }


  updateUI();

  saveGame();

}


// ========================================
// CHALLENGES
// ========================================

function renderChallenges() {

  const container =
    document.getElementById("challengeList");


  container.innerHTML = "";


  challenges.forEach(
    (challenge, index) => {

      const completed =
        completedChallenges.includes(index);


      const card =
        document.createElement("div");


      card.className =
        "challenge" +
        (completed
          ? " completed"
          : "");


      card.innerHTML = `

        <div class="challenge-icon">
          ${challenge.icon}
        </div>

        <h2>
          ${challenge.title}
        </h2>

        <p>
          ${challenge.description}
        </p>

        <div class="reward">

          <span>
            ⭐ ${challenge.xp} XP
            &nbsp;
            🪙 ${challenge.coins}
          </span>

          <button
            onclick="completeChallenge(${index})"
            ${completed ? "disabled" : ""}
          >
            ${
              completed
                ? "✓ DONE"
                : "COMPLETE"
            }
          </button>

        </div>

      `;


      container.appendChild(card);

    }
  );

}


function completeChallenge(index) {

  if (
    completedChallenges.includes(index)
  ) {

    return;

  }


  const challenge =
    challenges[index];


  completedChallenges.push(index);


  player.completed++;


  player.coins += challenge.coins;


  addXP(challenge.xp);


  notify(
    `🎯 ${challenge.title} COMPLETE! +${challenge.xp} XP +${challenge.coins} 🪙`
  );


  renderChallenges();

  updateUI();

  saveGame();

}


// ========================================
// BATTLE
// ========================================

function startMatch() {

  notify(
    "🚌 Match starting... Dropping into BattleZone!"
  );


  setTimeout(() => {

    const kills =
      Math.floor(
        Math.random() * 12
      ) + 1;


    const won =
      Math.random() < 0.25;


    player.matches++;


    player.kills += kills;


    const coinReward =
      kills * 10;


    player.coins += coinReward;


    addXP(
      kills * 20
    );


    if (won) {

      player.wins++;


      player.coins += 300;


      addXP(300);


      notify(
        `🏆 VICTORY! ${kills} eliminations! +300 🪙`
      );

    }

    else {

      notify(
        `💀 Match finished! ${kills} eliminations.`
      );

    }


    checkAchievements();


    updateUI();

    saveGame();

  }, 1500);

}


// ========================================
// MAP
// ========================================

function renderMap() {

  const map =
    document.getElementById(
      "mapContainer"
    );


  map.innerHTML = "";


  locations.forEach(
    location => {

      const button =
        document.createElement("button");


      button.className =
        "location";


      button.onclick = () =>
        dropLocation(location);


      button.innerHTML = `

        <div class="location-icon">
          ${location.icon}
        </div>

        <strong>
          ${location.name}
        </strong>

        <small>
          ${location.description}
        </small>

      `;


      map.appendChild(button);

    }
  );

}


function dropLocation(location) {

  notify(
    `🪂 Dropping into ${location.icon} ${location.name}!`
  );


  setTimeout(() => {

    const baseXP =
      Math.floor(
        Math.random() * 80
      ) + 50;


    const baseCoins =
      Math.floor(
        Math.random() * 60
      ) + 25;


    const xp =
      Math.floor(
        baseXP *
        location.multiplier
      );


    const coins =
      Math.floor(
        baseCoins *
        location.multiplier
      );


    player.coins += coins;


    addXP(xp);


    notify(
      `📦 Loot found! +${xp} XP +${coins} 🪙`
    );


    updateUI();

    saveGame();

  }, 1200);

}


// ========================================
// SHOP
// ========================================

function renderShop() {

  const container =
    document.getElementById(
      "shopList"
    );


  container.innerHTML = "";


  shopItems.forEach(item => {

    const owned =
      inventory.includes(item.id);


    const card =
      document.createElement("div");


    card.className =
      "item-card";


    card.innerHTML = `

      <div class="item-image ${item.className}">
        ${item.icon}
      </div>

      <h2>
        ${item.name}
      </h2>

      <p>
        ${item.rarity} ${item.type}
      </p>

      <button
        onclick="buyItem('${item.id}')"
        ${owned ? "disabled" : ""}
      >

        ${
          owned
            ? "✓ OWNED"
            : `🪙 ${item.price.toLocaleString()}`
        }

      </button>

    `;


    container.appendChild(card);

  });

}


function buyItem(id) {

  const item =
    shopItems.find(
      x => x.id === id
    );


  if (!item) return;


  if (inventory.includes(id)) {

    notify(
      "✅ You already own this item!"
    );

    return;

  }


  if (
    player.coins < item.price
  ) {

    notify(
      "❌ Not enough coins!"
    );

    return;

  }


  player.coins -= item.price;


  inventory.push(id);


  notify(
    `🛒 ${item.name} unlocked!`
  );


  renderShop();

  renderInventory();

  updateUI();

  saveGame();

}


// ========================================
// INVENTORY
// ========================================

function renderInventory() {

  const container =
    document.getElementById(
      "inventoryList"
    );


  container.innerHTML = "";


  if (
    inventory.length === 0
  ) {

    container.innerHTML = `

      <div class="empty">

        🎒 Your inventory is empty.

        <br><br>

        Visit the Item Shop to unlock cosmetics!

      </div>

    `;

    return;

  }


  inventory.forEach(id => {

    const item =
      shopItems.find(
        x => x.id === id
      );


    if (!item) return;


    const card =
      document.createElement("div");


    card.className =
      "inventory-card";


    card.innerHTML = `

      <div class="icon">
        ${item.icon}
      </div>

      <h2>
        ${item.name}
      </h2>

      <p>
        ${item.rarity} ${item.type}
      </p>

    `;


    container.appendChild(card);

  });

}


// ========================================
// LEADERBOARD
// ========================================

function renderLeaderboard() {

  const container =
    document.getElementById(
      "leaderboardList"
    );


  container.innerHTML = "";


  const playerXP =
    ((player.level - 1) * 100)
    + player.xp;


  const board = [

    ...leaderboardPlayers,

    {
      name: player.name,
      xp: playerXP,
      isPlayer: true
    }

  ];


  board.sort(
    (a, b) => b.xp - a.xp
  );


  board.forEach(
    (person, index) => {

      const row =
        document.createElement("div");


      row.className =
        "leader" +
        (
          person.isPlayer
            ? " player-rank"
            : ""
        );


      let rank =
        index + 1;


      if (rank === 1)
        rank = "🥇";

      else if (rank === 2)
        rank = "🥈";

      else if (rank === 3)
        rank = "🥉";


      row.innerHTML = `

        <span>
          ${rank}
        </span>

        <strong>
          ${person.name}
        </strong>

        <span>
          ${person.xp.toLocaleString()} XP
        </span>

      `;


      container.appendChild(row);

    }
  );

}


// ========================================
// ACHIEVEMENTS
// ========================================

function checkAchievements() {

  achievements.forEach(
    achievement => {

      if (
        unlockedAchievements.includes(
          achievement.id
        )
      ) {

        return;

      }


      let unlocked = false;


      if (
        achievement.id === "first-win" &&
        player.wins >= 1
      ) {

        unlocked = true;

      }


      if (
        achievement.id === "killer" &&
        player.kills >= 25
      ) {

        unlocked = true;

      }


      if (
        achievement.id === "veteran" &&
        player.level >= 10
      ) {

        unlocked = true;

      }


      if (
        achievement.id === "champion" &&
        player.wins >= 10
      ) {

        unlocked = true;

      }


      if (unlocked) {

        unlockedAchievements.push(
          achievement.id
        );


        player.coins +=
          achievement.reward;


        notify(
          `🏅 ACHIEVEMENT UNLOCKED: ${achievement.name} +${achievement.reward} 🪙`
        );

      }

    }
  );


  localStorage.setItem(
    "battlezoneAchievements",
    JSON.stringify(
      unlockedAchievements
    )
  );

}


// ========================================
// DAILY REWARD
// ========================================

function claimDaily() {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const lastClaim =
    localStorage.getItem(
      "battlezoneDaily"
    );


  if (
    lastClaim === today
  ) {

    notify(
      "⏰ You already claimed today's reward!"
    );

    return;

  }


  const reward =
    Math.floor(
      Math.random() * 201
    ) + 100;


  player.coins += reward;


  localStorage.setItem(
    "battlezoneDaily",
    today
  );


  addXP(50);


  notify(
    `🎁 DAILY REWARD! +${reward} 🪙 +50 XP`
  );


  updateUI();

  saveGame();

}


// ========================================
// UI
// ========================================

function updateUI() {

  document.getElementById(
    "coins"
  ).textContent =
    player.coins.toLocaleString();


  document.getElementById(
    "level"
  ).textContent =
    player.level;


  document.getElementById(
    "xp"
  ).textContent =
    player.xp;


  document.getElementById(
    "nextXP"
  ).textContent =
    requiredXP();


  document.getElementById(
    "wins"
  ).textContent =
    player.wins;


  document.getElementById(
    "kills"
  ).textContent =
    player.kills;


  document.getElementById(
    "completed"
  ).textContent =
    player.completed;


  document.getElementById(
    "matches"
  ).textContent =
    player.matches;


  document.getElementById(
    "playerName"
  ).textContent =
    player.name;


  const percentage =
    (
      player.xp /
      requiredXP()
    ) * 100;


  document.getElementById(
    "xpFill"
  ).style.width =
    percentage + "%";

}


// ========================================
// NOTIFICATION
// ========================================

function notify(message) {

  const box =
    document.getElementById(
      "notification"
    );


  box.textContent =
    message;


  box.classList.add(
    "show"
  );


  clearTimeout(
    window.notificationTimer
  );


  window.notificationTimer =
    setTimeout(() => {

      box.classList.remove(
        "show"
      );

    }, 3500);

}


// ========================================
// SAVE
// ========================================

function saveGame() {

  localStorage.setItem(
    "battlezonePlayer",
    JSON.stringify(player)
  );


  localStorage.setItem(
    "battlezoneChallenges",
    JSON.stringify(
      completedChallenges
    )
  );


  localStorage.setItem(
    "battlezoneInventory",
    JSON.stringify(
      inventory
    )
  );

}


// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "1")
      showSection("home");

    if (event.key === "2")
      showSection("challenges");

    if (event.key === "3")
      showSection("map");

    if (event.key === "4")
      showSection("shop");

    if (event.key === "5")
      showSection("inventory");

    if (event.key === "6")
      showSection("leaderboard");

  }
);


// ========================================
// AUTO SAVE
// ========================================

setInterval(
  saveGame,
  5000
);


// ========================================
// START GAME
// ========================================

renderChallenges();

renderMap();

renderShop();

renderInventory();

renderLeaderboard();

checkAchievements();

updateUI();
