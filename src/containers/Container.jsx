import React, { useEffect, useState } from "react"
import Player from "../components/GameBoard/Player"
import Header from "../components/Header"
import Bot from "../components/GameBoard/Bot"
import { Grid, CircularProgress } from "@material-ui/core"

const baseUrl = "https://deckofcardsapi.com/api/deck/"
const cardValues = {
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	ACE: 1,
	JACK: 11,
	QUEEN: 12,
	KING: 14
}

function Container() {
	const [deck, setDecks] = useState({
		palyer: "",
		bot: "",
		loading: false
	})
	const [card, setCard] = useState({
		player: "",
		bot: ""
	})
	const getNewDeck = async () => {
		const promise = await fetch(baseUrl + "new/shuffle/?deck_count=1")
		const res = await promise.json()
		return res.deck_id
	}
	const drawCard = async (deckId, owner) => {
		const promise = await fetch(baseUrl + deckId + "/draw/?count=1")
		const res = await promise.json()
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
				bot: await getNewDeck(),
				loading: true
			})
		}
		setData()
	}, [])

	useEffect(() => {
		if (card.bot.length > 0 && card.player.length > 0) {
			console.log(card.bot.length)
			const player = cardValues[card.player[0].value]
			const bot = cardValues[card.bot[0].value]
			if (player > bot) {
				console.log("win")
			}
			if (player < bot) {
				console.log("lose")
			}
			if (player === bot) {
				console.log("win")
			}
		}
	}, [card.bot])

	return (
		<div>
			<Header />
			{deck.loading ? (
				<Grid container direction="row" justify="space-around">
					<Grid item xs={6}>
						<Player drawCard={playerDraw} card={card.player[0]} />
					</Grid>
					<Grid item xs={6}>
						<Bot card={card.bot[0]} />
					</Grid>
				</Grid>
			) : (
				<CircularProgress />
			)}
		</div>
	)
}

export default Container
