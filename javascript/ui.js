// ui.js

import { state } from './gameState.js'

export const els = {
  messageEl: document.querySelector('#message-el'),
  playerEl: document.querySelector('#player-el'),
  currentBetEl: document.querySelector('#current-bet-el'),
  cardsEl: document.querySelector('#cards-el'),
  sumEl: document.querySelector('#sum-el'),
  dealerCardsEl: document.querySelector('#dealer-cards-el'),
  playerStats: document.querySelector('#player-stats'),
  dealerStats: document.querySelector('#dealer-stats'),
  mainEl: document.querySelector('#main-el'),
}

export const newRoundButton = document.querySelector('#new-round-btn')
export const newCardButton = document.querySelector('#new-card-btn')
export const standButton = document.querySelector('#stand-btn')
export const quitButton = document.querySelector('#quit-btn')
export const betSection = document.querySelector('.bet-buttons')

export function render({ player, dealer, message }) {
  els.messageEl.textContent = message
  els.playerEl.textContent = `${player.name}'s Pot: $${player.chips}`
  els.currentBetEl.textContent = `Bet: $${player.currentBet}`
  els.cardsEl.textContent = `Cards: ${player.cards.join(' ')}`
  els.sumEl.textContent = `Sum: ${player.sum}`

  if (dealer.cards.length) {
    els.dealerStats.hidden = false
    if (state === 'playing') {
      els.dealerCardsEl.textContent = `Dealer: ${dealer.cards[0]} X`
    } else {
      els.dealerCardsEl.textContent = `Dealer: ${dealer.cards.join(' ')}`
    }
  } else {
    els.dealerStats.hidden = true
  }
}

export function toggle(element, show) {
  if (!element) return
  element.hidden = !show
  element.style.display = show ? 'block' : 'none'
}

export function toggleBetSection(show) {
  betSection.hidden = !show
}

export function resetButtons() {
  toggle(newRoundButton, true)
  toggle(newCardButton, false)
  toggle(standButton, false)
  toggle(quitButton, false)
  toggleBetSection(false)
}
