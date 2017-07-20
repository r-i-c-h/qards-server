'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { dealCards } = require('../../db/helpers');

class Deck {
  constructor() {
    this.descs = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['♥', '♣', '♦', '♠'];
    let cards = [];

    for (let suit = 0; suit < this.suits.length; suit++ ) {
      for (let desc = 0; desc < this.descs.length; desc++ ) {
        cards.push({value: desc + 1, desc: this.descs[desc], suit: this.suits[suit]});
      }
    }

    return cards;
  }
}

const shuffle = (deck) => {
  let temp = null;

  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};

let deck = new Deck;
shuffle(deck);

router.route('/') 
  .post((req, res) => {
    
    console.log('Updating game data after dealing');
    dealCards(req.body.gameId, req.body.gameData, res);
  });


module.exports = router;

/*
{
  gameId:
  playerIds: []
};


*/