import React from "react"
import cardback from "../../Images/cardback.png"
import { Grid, Typography } from "@material-ui/core"

function Bot({ card }) {
	return (
		<div>
			<Grid container direction="row">
				<Grid item xs={12}>
					<Typography variant="h4">The Bot</Typography>
				</Grid>
				<Grid item xs={12}>
					<img src={card ? card.image : cardback} width="50%" alt="card" />
				</Grid>
			</Grid>
		</div>
	)
}

export default Bot
