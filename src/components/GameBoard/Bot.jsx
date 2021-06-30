import React from "react"

function Bot({ card }) {
	return <div>{card && <img src={card.image} width="50%" alt={card.vlaue} />}</div>
}

export default Bot
