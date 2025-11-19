// main.js

import { player } from './player.js'
import { dealer } from './dealer.js'
import {
  resetGame,
  startBetting,
  startPlaying,
  drawCard,
  stand,
  quit,
  exitGame,
} from './gameState.js'
import {
  render,
  toggle,
  toggleBetSection,
  resetButtons,
  newRoundButton,
  newCardButton,
  standButton,
  quitButton,
  betSection,
  els,
} from './ui.js'

function registerEventListeners() {
  newRoundButton.onclick = startNewRound
  newCardButton.onclick = handleHit
  standButton.onclick = handleStand
  quitButton.onclick = quitGame

  betSection.querySelectorAll('button').forEach((btn) => {
    btn.onclick = () => handleBet(Number(btn.dataset.bet))
  })
}

function startNewRound() {
  resetGame()
  if (player.chips < 5) exitGame()
  startBetting()
  toggle(newRoundButton, false)
  toggle(els.playerStats, true)
  toggle(standButton, true)
  toggle(newCardButton, true)
  toggleBetSection(true)
  render({ player, dealer, message: 'Place your bet!' })
}

function handleBet(amount) {
  if (!player.placeBet(amount)) return
  toggleBetSection(false)
  startPlaying()
  toggle(newCardButton, true)
  toggle(standButton, true)
}

function handleHit() {
  if (drawCard()) render({ player, dealer, message: 'Draw again?' })
}

function handleStand() {
  stand()
  render({ player, dealer, message: 'Dealer drawing...' })
  toggle(newCardButton, false)
  toggle(quitButton, true)
  toggle(standButton, false)
}

function quitGame() {
  quit()
  render({ player, dealer, message: 'Game over.' })
  resetButtons()
}

registerEventListeners()
