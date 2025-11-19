// dealer.js

import { dealCard, calculateHandValue } from './deck.js'
import { render } from './ui.js'
import { player } from './player.js' // optional if shared context

export const dealer = {
  cards: [],
  sum: 0,
  stand: false,
  mustStandValue: 17,

  reset() {
    this.cards = []
    this.sum = 0
    this.stand = false
  },

  startTurn() {
    this.reset()
    this.cards.push(dealCard(), dealCard())
    this.sum = calculateHandValue(this.cards)
    this.stand = this.sum >= this.mustStandValue
  },

  addCard(message) {
    this.cards.push(dealCard())
    this.sum = calculateHandValue(this.cards)
    if (this.sum >= this.mustStandValue) this.stand = true
    render({ player, dealer: this, message })
  },

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  },

  async dealerDrawCardsWithDelay(message) {
    while (this.sum < this.mustStandValue) {
      this.cards.push(dealCard())
      this.sum = calculateHandValue(this.cards)
      render({ player, dealer: this, message })
      await this.delay(1000)
    }
    this.stand = true
  },
}
