
const displayEnemyStatsHTML = (game) => {
    const enemyStatsDiv = document.getElementById("enemy")
    enemyStatsDiv.innerHTML = ""

    game.enemies.forEach((enemy, index) => {
      enemyStatsDiv.innerHTML +=`
      <div class="enemy_div ${enemy.type}" id="enemy_${index}">
        <div id="stats">
          <h3>${enemy.name}'s Stats</h3>
          <p>type: ${enemy.type}</p>
          <p>Health: ${enemy.health}</p>
          <div class="health_Bar"></div>
          <p>Damage: ${enemy.damage}</p>
          <p>Next move: ${enemy.nextMove.move}<p>
        </div>
        <img src= ${enemy.imgSrc} alt="img"/>
      </div>

    `
    });
  }

export default displayEnemyStatsHTML;