import React from "react"

function Bot({ card }) {
	return <div>{card && <img src={card[0].image} width="50%" alt="d" />}</div>
}

export default Bot
