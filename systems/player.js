// PLAYER SYSTEM

window.BattleZone = window.BattleZone || {};

BattleZone.player = {
  name: "PLAYER",
  level: 1,
  xp: 0,
  coins: 500,
  wins: 0,
  kills: 0,
  completed: 0,
  matches: 0,
  survivalTime: 0
};

BattleZone.getRequiredXP = function () {
  return BattleZone.player.level * 100;
};

BattleZone.addXP = function (amount) {

  const player = BattleZone.player;

  player.xp += amount;

  let leveledUp = false;

  while (player.xp >= BattleZone.getRequiredXP()) {

    player.xp -= BattleZone.getRequiredXP();

    player.level++;

    player.coins += 250;

    leveledUp = true;
  }

  if (leveledUp) {
    BattleZone.notify(
      `🎉 LEVEL UP! You reached Level ${player.level}! +250 🪙`
    );
  }

  BattleZone.updateUI();
  BattleZone.save();
};
