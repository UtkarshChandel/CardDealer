import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: [],
    };

    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    //make request using deckID
    //setSate using new carrd info from the api
    try {
      let id = this.state.deck.deck_id;

      let cardURL = `${API_BASE_URL}/${id}/draw/`;
      let cardRes = await axios.get(cardURL);
      if (!cardRes.data.success) {
        throw new Error("No Card Remaining");
      }
      console.log(cardRes.data);
      let card = cardRes.data.cards[0];

      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map((c) => (
      <Card name={c.name} image={c.image} key={c.id} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">Card Dealer</h1>
        <h2 className="Deck-title subtitle">Let the game begin!!</h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Get Card
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
