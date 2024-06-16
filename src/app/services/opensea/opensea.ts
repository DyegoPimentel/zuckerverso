export interface NftsByCollection {
    next: string,
    nfts: Nft[]
}

export interface Nft {
    identifier: string, 
    collection: string, 
    contract: string, 
    token_standard: string, 
    name: string,
    description: string, 
    image_url: string, 
    display_image_url: string, 
    display_animation_url: string, 
    metadata_url: string, 
    opensea_url: string,
    updated_at: string, 
    is_disabled: boolean,
    is_nsfw: boolean,
    animation_url?: string,
    is_suspicious?: boolean,
    creator?: string,
    traits?: Trait[],
    owner?: Owner[],
    rarity?: any
}

export interface Trait {
    trait_type: string,
    display_type: any,
    max_value: any,
    value: string
}

export interface Owner {
    address: string,
    quantity: number
}
