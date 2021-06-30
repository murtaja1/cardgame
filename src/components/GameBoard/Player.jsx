import React from "react"
import { Button } from "@material-ui/core"

function Player({ drawCard, card }) {
	return (
		<div>
			{card && <img src={card[0].image} width="50%" alt="d" />}
			<Button variant="contained" color="primary" onClick={drawCard}>
				Draw
			</Button>
		</div>
	)
}

export default Player
