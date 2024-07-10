const displayDeckHTML = (game) => {
    const deckDiv = document.getElementById("deck")
  
    deckDiv.innerHTML = `Cards in Deck: ${game.player.deck.length}`
  }


const displayDiscardHTML = (game) => {
    const discardDiv = document.getElementById("discard")
  
    discardDiv.innerHTML = `Discard Pile: ${game.player.discardPile.length}`
  }

const displayScoreHTML = game => {
    const scoreDiv = document.getElementById("score");

    scoreDiv.innerHTML = `Score: ${game.player.cash}`
}

export {displayDiscardHTML, displayDeckHTML, displayScoreHTML};