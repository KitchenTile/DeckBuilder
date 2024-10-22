const displayPlayerStatsHTML = (game) => {
  const playerStats = document.getElementById("player_stats")

  playerStats.innerHTML = `
    <div>
      <h3>${game.player.name}'s stats</h3>
      <div class="health_Row">
        <p>Health: </p>
        <div class="health_Bar_Container">
          <p class="health_Info">${game.player.health} / ${game.player.maxHealth} </p>
          <div class="health_Bar red"></div>
          <div class="health_Bar green" id="player_healthbar"></div>
        </div>
      </div>
      <p>Armor: ${game.player.armor}</p>
      <p>Energy: ${game.player.energy}/${game.player.startingEnergy}</p>
    </div>
    <img src=${game.player.imgSrc} alt="img" id="playerImg"/>
    <img src=${game.player.winImgSrc} alt="img" id="playerWinImg"/>
    <img src=${game.player.loseImgSrc} alt="img" id="playerLossingImg"/>

  `

  const healthBar = document.getElementById(`player_healthbar`);

  const barPercentage = game.player.health * 100 / game.player.maxHealth + "%";
  
  healthBar.style.width = barPercentage;
}

export default displayPlayerStatsHTML;