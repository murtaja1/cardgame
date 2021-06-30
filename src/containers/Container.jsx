import React, { useEffect, useState } from "react"
import Player from "../components/GameBoard/Player"
import Header from "../components/Header"
import Bot from "../components/GameBoard/Bot"
import { Grid, CircularProgress, Button } from "@material-ui/core"
import { baseUrl, cardValues } from "../ConstData"

function Container() {
	const [decks, setDecks] = useState({
		player: "",
		bot: "",
		loading: true
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
	const handleReset = () => {
		setDecks({
			player: "",
			bot: "",
			loading: true
		})
		setCard({
			player: "",
			bot: ""
		})
	}
	const drawCard = async (deckId, owner) => {
		const promise = await fetch(baseUrl + deckId + "/draw/?count=1")
		const res = await promise.json()
		setCard({
			...card,
			[owner]: res.cards[0]
		})
	}
	const playerDraw = () => {
		drawCard(decks.palyer, "player")
	}
	useEffect(() => {
		card.player !== "" &&
			setTimeout(() => {
				drawCard(decks.bot, "bot")
			}, 1000)
	}, [card.player])
	useEffect(() => {
		const setData = async () => {
			setDecks({
				palyer: await getNewDeck(),
				bot: await getNewDeck(),
				loading: false
			})
		}
		setData()
	}, [decks.loading])

	useEffect(() => {
		if (card.bot && card.player) {
			const player = cardValues[card.player.value]
			const bot = cardValues[card.bot.value]
			if (player > bot) {
				console.log("win")
			} else if (player < bot) {
				console.log("lose")
			} else {
				console.log("equal")
			}
		}
	}, [card.bot])

	return (
		<div>
			<Header />
			{!decks.loading ? (
				<Grid container direction="row" justify="space-around">
					<Grid item xs={6}>
						<Player drawCard={playerDraw} card={card.player} />
					</Grid>
					<Grid item xs={6}>
						<Bot card={card.bot} />
					</Grid>
					<Grid item xs={6}>
						<Button variant="contained" size="small" color="secondary" onClick={handleReset}>
							Reset Game
						</Button>
					</Grid>
				</Grid>
			) : (
				<CircularProgress />
			)}
		</div>
	)
}

export default Container
