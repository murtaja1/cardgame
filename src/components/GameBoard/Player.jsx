import React from "react"
import { Button, Grid } from "@material-ui/core"

function Player({ drawCard, card }) {
	return (
		<div>
			<Grid container direction="row">
				<Grid item xs={12}>
					{card && <img src={card.image} width="50%" alt={card.vlaue} />}
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" color="primary" onClick={drawCard}>
						Draw
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default Player
