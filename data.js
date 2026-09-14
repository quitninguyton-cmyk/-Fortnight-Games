// ========================================
// BATTLEZONE GAME DATA
// ========================================


// CHALLENGES

const challenges = [

  {
    id: "eliminations",
    icon: "🔫",
    title: "Elimination Expert",
    description: "Get 10 eliminations.",
    xp: 150,
    coins: 100
  },

  {
    id: "headshots",
    icon: "🎯",
    title: "Deadeye",
    description: "Get 5 headshots.",
    xp: 200,
    coins: 150
  },

  {
    id: "travel",
    icon: "🏃",
    title: "Road Runner",
    description: "Travel 1,000 meters.",
    xp: 100,
    coins: 75
  },

  {
    id: "win",
    icon: "🏆",
    title: "Victory",
    description: "Win a match.",
    xp: 300,
    coins: 250
  },

  {
    id: "treasure",
    icon: "💎",
    title: "Treasure Hunter",
    description: "Collect 500 coins.",
    xp: 125,
    coins: 100
  },

  {
    id: "survivor",
    icon: "⚡",
    title: "Storm Survivor",
    description: "Survive for 10 minutes.",
    xp: 175,
    coins: 125
  }

];


// SHOP

const shopItems = [

  {
    id: "galaxy",
    name: "Galaxy Warrior",
    type: "Outfit",
    icon: "🧑‍🚀",
    price: 2000,
    rarity: "Legendary",
    className: "purple"
  },

  {
    id: "robot",
    name: "Robo Knight",
    type: "Outfit",
    icon: "🤖",
    price: 1500,
    rarity: "Epic",
    className: "blue"
  },

  {
    id: "fire",
    name: "Fire Pickaxe",
    type: "Pickaxe",
    icon: "🔥",
    price: 1000,
    rarity: "Rare",
    className: "red"
  },

  {
    id: "lightning",
    name: "Lightning Glider",
    type: "Glider",
    icon: "⚡",
    price: 2500,
    rarity: "Legendary",
    className: "gold"
  }

];


// MAP

const locations = [

  {
    name: "Frosty Peaks",
    icon: "🏔️",
    description: "High Ground",
    multiplier: 1.3
  },

  {
    name: "Mega City",
    icon: "🏙️",
    description: "High Risk",
    multiplier: 1.8
  },

  {
    name: "Sandy Shores",
    icon: "🏖️",
    description: "Loot Zone",
    multiplier: 1.2
  },

  {
    name: "Shadow Castle",
    icon: "🏰",
    description: "Danger Zone",
    multiplier: 2
  },

  {
    name: "Lonely Woods",
    icon: "🌲",
    description: "Quiet Zone",
    multiplier: 1.1
  },

  {
    name: "Battle Factory",
    icon: "🏭️",
    description: "Loot Zone",
    multiplier: 1.6
  }

];


// ACHIEVEMENTS

const achievements = [

  {
    id: "first-win",
    name: "🏆 First Victory",
    description: "Win your first match.",
    reward: 250
  },

  {
    id: "killer",
    name: "💀 Killer",
    description: "Get 25 eliminations.",
    reward: 500
  },

  {
    id: "veteran",
    name: "⭐ Veteran",
    description: "Reach Level 10.",
    reward: 1000
  },

  {
    id: "champion",
    name: "👑 Champion",
    description: "Win 10 matches.",
    reward: 2000
  }

];


// STARTING LEADERBOARD

const leaderboardPlayers = [

  {
    name: "ShadowKing",
    xp: 12450
  },

  {
    name: "GalaxyPro",
    xp: 10820
  },

  {
    name: "StormRunner",
    xp: 9760
  },

  {
    name: "BattleBeast",
    xp: 8400
  },

  {
    name: "DarkKnight",
    xp: 7920
  }

];
