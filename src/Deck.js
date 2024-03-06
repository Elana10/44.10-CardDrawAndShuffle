import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Deck = () =>{
    const [deckId, setDeckId] = useState(null)
    const flippedCards = useRef();
    const [newDeck, setNewDeck] = useState(1)

    useEffect(function fetchDeckWhenMounted(){
        async function fetchDeck() {
            const deckRes = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeckId(deckRes.data.deck_id)
        }
        fetchDeck()
    }, [newDeck])

    const addCard = async () => {
        async function drawCard() {
            const newCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            return newCard
        }
        const newCardInfo = await drawCard();
        
        if(newCardInfo.data.remaining !== 0){
            const addCard = document.createElement('img');
            addCard.src = newCardInfo.data.cards[0].image;            
            flippedCards.current.append(addCard)
        } else {
            alert("All Cards Flipped!")
        }
        
    }

    const shuffleCards = () =>{
        const flippedCardsNode = flippedCards.current
        while (flippedCardsNode.firstChild) {
            flippedCardsNode.removeChild(flippedCardsNode.firstChild);     
        }
        setNewDeck(newDeck +1)
    } 

    return (
        <>
            <button onClick= {addCard}>Gimme a Card, please!</button>
            <button onClick = {shuffleCards}>Collect and Shuffle Cards</button>
            <div ref= {flippedCards} id="cards"></div>
        </>
    )

} 

export default Deck;