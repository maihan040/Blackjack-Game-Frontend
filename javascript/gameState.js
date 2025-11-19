// gameState.js

import { dealCard, calculateHandValue } from './deck.js'
import { player } from './player.js'
import { dealer } from './dealer.js'
import {
  render,
  toggle,
  toggleBetSection,
  newRoundButton,
  newCardButton,
  standButton,
  els,
} from './ui.js'

export let state = 'idle'
export let message = ''

export function resetGame() {
  player.reset()
  dealer.reset()
  message = ''
  state = 'idle'
}

export function startBetting() {
  state = 'betting'
  message = 'Place your bet!'
}

export function startPlaying() {
  if (state !== 'betting' || player.currentBet <= 0) return
  player.addCard(dealCard())
  render({ player, dealer, message })
  setTimeout(() => {
    player.addCard(dealCard())
    render({ player, dealer, message })
  }, 1000)
  state = 'playing'
  message = 'Do you want to draw a new card?'
  dealer.startTurn()
}

export function drawCard() {
  if (state !== 'playing') return false
  player.addCard(dealCard())
  if (player.sum > 21) return finishRound('bust')
  if (player.sum === 21) return finishRound('blackjack')
  message = 'Do you want to draw a new card?'
  render({ player, dealer, message })
  return true
}

export async function stand() {
  if (state !== 'playing') return
  state = 'dealer-reveal'
  render({ player, dealer, message })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  await dealer.dealerDrawCardsWithDelay(message)

  const psum = player.sum
  const dsum = dealer.sum
  if (dsum > 21 || psum > dsum) {
    message = 'You win!'
    player.chips += player.currentBet
  } else if (psum === dsum) {
    message = 'It’s a tie.'
  } else {
    message = 'Dealer wins.'
    player.chips -= player.currentBet
  }
  player.currentBet = 0
  state = 'stand'
  toggle(newRoundButton, true)
  render({ player, dealer, message })
}

function finishRound(result) {
  message = result === 'blackjack' ? 'Blackjack! You win!' : 'Busted! You lose.'
  player.chips +=
    result === 'blackjack' ? player.currentBet : -player.currentBet
  player.currentBet = 0
  state = result
  toggle(newCardButton, false)
  toggle(standButton, false)
  toggle(newRoundButton, true)
  render({ player, dealer, message })
}

export function quit() {
  message = `You finished with $${player.chips}`
  state = 'gameover'
}

export function exitGame() {
  alert('Not enough chips left to play')
  toggle(els.mainEl, false)
}
