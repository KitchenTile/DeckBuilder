
const displayEnemyStatsHTML = (game) => {

  // modify div to show enemy stats


  const enemyStatsDiv = document.getElementById("enemy");
  enemyStatsDiv.innerHTML = "";

  game.enemies.forEach((enemy, index) => {

    enemyStatsDiv.innerHTML +=`
      <div class="enemy_div ${enemy.type}" id="enemy_${index}">
        <div id="stats">
          <h3>${enemy.name}'s Stats</h3>
          <p>type: ${enemy.type}</p>
          <div class="health_Row">
            <p>Health: </p>
            <div class="health_Bar_Container">
              <p class="health_Info">${enemy.isAlive ? `${enemy.health} / ${enemy.spawnHealth}` : "☠"} </p>
              <div class="health_Bar red"></div>
              <div class="health_Bar green" id="enemy_${index}_healthbar"></div>
            </div>
          </div>
          <p>Damage: ${enemy.damage}</p>
          <p class="nextMove">Next move: ${enemy.nextMove.move}<p>
        </div>
        <img src=${enemy.isAlive ? enemy.imgSrc : enemy.deadImg} alt="img"/>
      </div>
    ` 

    const healthBar = document.getElementById(`enemy_${index}_healthbar`);

    const barPercentage = enemy.health * 100 / enemy.spawnHealth + "%";
    
    healthBar.style.width = barPercentage;

  });
  }

export default displayEnemyStatsHTML;