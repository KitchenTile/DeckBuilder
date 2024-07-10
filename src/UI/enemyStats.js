const displayEnemyStatsHTML = (game) => {
    const enemyStatsDiv = document.getElementById("enemy_stats")
    enemyStatsDiv.innerHTML = ""

    game.enemies.forEach((enemy, index) => {
      enemyStatsDiv.innerHTML +=`
      <div id="enemy_${index}">
        <h3>${enemy.name}'s Stats</h3>
        <p>type: ${enemy.type}</p>
        <p>Health: ${enemy.health}</p>
        <p>Damage: ${enemy.damage}</p>
      </div>

    `
    });
  }

export default displayEnemyStatsHTML;