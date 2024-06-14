export interface nftsByCollection {
    next: string,
    nfts: nft[]
}

export interface nft {
    identifier: string, // "8840",
    collection: string, // "piratenation",
    contract: string, // "0x1b41d54b3f8de13d58102c50d7431fd6aa1a2c48",
    token_standard: string, // "erc721",
    name: string, // "Founder's Pirate #8840",
    description: string, // "Take to the seas with your pirate crew! Explore the world and gather XP, loot, and untold riches in a race to become the world's greatest pirate captain! Play at https://piratenation.game",
    image_url: string, // "https://ipfs.io/ipfs/QmRjgEp89ovHdr1M8rkjoC6iEgbNna5kBDjbfubm4zeVDd/8840",
    display_image_url: string, // "https://i.seadn.io/s/raw/files/253d5386db1ec73e17cae7ba93bfb2d4.png?w=500&auto=format",
    display_animation_url: string, // "https://raw.seadn.io/files/253d5386db1ec73e17cae7ba93bfb2d4.png",
    metadata_url: string, // "https://api.proofofplay.gg/api/metadata/0x5B0661B61b0e947E7e49cE7A67abaf8eAAfcdC1A/8840",
    opensea_url: string, // "https://opensea.io/assets/ethereum/0x1b41d54b3f8de13d58102c50d7431fd6aa1a2c48/8840",
    updated_at: string, // "2024-04-06T14:05:15.475829",
    is_disabled: boolean,
    is_nsfw: boolean
}
