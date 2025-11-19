// deck.js

export function dealCard() {
  const randomNumber = Math.floor(Math.random() * 13) + 1
  if (randomNumber === 1) return 11
  if (randomNumber > 10) return 10
  return randomNumber
}

export function calculateHandValue(cards) {
  let total = 0
  let aceCount = 0
  for (let card of cards) {
    if (card === 11) aceCount++
    total += card
  }
  while (total > 21 && aceCount > 0) {
    total -= 10
    aceCount--
  }
  return total
}
