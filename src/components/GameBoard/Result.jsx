import React from "react"
import { Grid, Typography } from "@material-ui/core"

function Result({ text }) {
	return (
		<Grid container justify="center">
			<Typography variant="h2">{text}</Typography>
		</Grid>
	)
}

export default Result
