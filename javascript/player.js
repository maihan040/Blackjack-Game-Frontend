// player.js

import { calculateHandValue } from './deck.js'

const initialPot = 200

export const player = {
  name: 'Player',
  chips: initialPot,
  currentBet: 0,
  cards: [],
  sum: 0,

  reset() {
    this.currentBet = 0
    this.cards = []
    this.sum = 0
  },

  placeBet(amount) {
    if (amount > this.chips) return false
    this.currentBet = amount
    return true
  },

  addCard(card) {
    this.cards.push(card)
    this.sum = calculateHandValue(this.cards)
  },
}
