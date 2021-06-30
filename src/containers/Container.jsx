import React, { useEffect, useState } from "react"
import Player from "../components/GameBoard/Player"
import Header from "../components/Header"
import Bot from "../components/GameBoard/Bot"
import { Grid } from "@material-ui/core"

const baseUrl = "https://deckofcardsapi.com/api/deck/"

function Container() {
	const [deck, setDecks] = useState({
		palyer: "",
		bot: ""
	})
	const [card, setCard] = useState({
		player: "",
		bot: ""
	})
	const getNewDeck = async () => {
		const promise = await fetch(baseUrl + "new/shuffle/?deck_count=2")
		const res = await promise.json()
		return res.deck_id
	}
	const drawCard = async (deckId, owner) => {
		const promise = await fetch(baseUrl + deckId + "/draw/?count=1")
		const res = await promise.json()
		console.log(owner)
		setCard({
			...card,
			[owner]: res.cards
		})
	}
	const playerDraw = () => {
		drawCard(deck.palyer, "player")
	}
	useEffect(() => {
		card.player !== "" &&
			setTimeout(() => {
				drawCard(deck.bot, "bot")
			}, 1000)
	}, [card.player])
	useEffect(() => {
		const setData = async () => {
			setDecks({
				palyer: await getNewDeck(),
				bot: await getNewDeck()
			})
		}
		setData()
	}, [])

	return (
		<div>
			<Header />
			<Grid container direction="row" justify="space-around">
				<Grid item xs={6}>
					<Player drawCard={playerDraw} card={card.player[0]} />
				</Grid>
				<Grid item xs={6}>
					<Bot card={card.bot[0]} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Container
