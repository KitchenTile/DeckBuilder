const displayPlayerStatsHTML = (game) => {
    const playerStats = document.getElementById("player_stats")
  
    playerStats.innerHTML = `
      <div>
        <h3>${game.player.name}'s stats</h3>
        <p>Health: ${game.player.health}</p>
        <p>Armor: ${game.player.armor}</p>
        <p>Energy: ${game.player.energy}</p>
      </div>
      <img src= ${game.player.imgSrc} alt="img"/>
    `
  }

export default displayPlayerStatsHTML;