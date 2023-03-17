# v3ga-contract

### List of most common commands

#### Notable Owner Only Commands

`paused` - set to true or false (will pause/unpause the mint) -> can still giveaway
`giveAway` - free giveaway to any address

#### Notable Public Commands

`mint` - mint based on amount requested

### Notable Configurables

`setBaseURI` - base URI of the metadata (must include trailing slash)
`setDefaulRoyalty` - Allows the owner to set default royalties following EIP-2981 royalty standard.
`setMaxSupply` - Change the max supply of the collection.
`setMintPrice` - Change the mint price (value must be in Wei)
