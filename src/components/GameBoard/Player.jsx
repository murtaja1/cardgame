import React from "react"
import { Button, Grid, Typography } from "@material-ui/core"
import cardback from "../../Images/cardback.png"

function Player({ drawCard, card }) {
	return (
		<div>
			<Grid container direction="row">
				<Grid item xs={12}>
					<Typography variant="h4">You</Typography>
				</Grid>
				<Grid item xs={12}>
					<img src={card ? card.image : cardback} width="50%" alt="card" />
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" size="small" color="primary" onClick={drawCard}>
						Draw
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default Player
