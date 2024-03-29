export type Clothing = {
	name: string;
	group: string;
	category: string;
	rarity: number;
	styles: string[];
	story: string;
	scene: string;
	color: string;
};

export const clothingGroups: Record<string, Clothing[]> = {
	Tender_Bloom: [
		{
			name: 'Gentle Grace',
			group: 'Head',
			category: 'Hair',
			rarity: 5,
			styles: ['Grand', 'Perky'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Grey-Brown'
		},
		{
			name: 'Spring Scents',
			group: 'Head',
			category: 'Headwear',
			rarity: 6,
			styles: ['Grand', 'Perky'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Pink'
		},
		{
			name: 'Attentive Lilies',
			group: 'Accessories',
			category: 'Earrings',
			rarity: 5,
			styles: ['Grand', 'Perky'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Pink'
		},
		{
			name: "Lily's Cuddle",
			group: 'Accessories',
			category: 'Necklace',
			rarity: 4,
			styles: ['Grand', 'Perky'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Pink'
		},
		{
			name: "Lily's Kiss",
			group: 'Accessories',
			category: 'Ring',
			rarity: 5,
			styles: ['Grand', 'Perky'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Pink'
		},
		{
			name: 'Tender Bloom',
			group: 'Tops',
			category: 'Dress',
			rarity: 5,
			styles: ['Grand', 'Perky'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Pink'
		},
		{
			name: 'Light Fingers',
			group: 'Accessories',
			category: 'Gloves',
			rarity: 4,
			styles: ['Grand', 'Perky'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'White'
		},
		{
			name: 'Soft Steps',
			group: 'Footwear',
			category: 'Shoes',
			rarity: 4,
			styles: ['Grand', 'Perky'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Pink'
		}
	],
	Fated_Night: [
		{
			name: 'Moonlight Rose',
			group: 'Head',
			category: 'Hair',
			rarity: 4,
			styles: ['Grand', 'Elegant'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Grey-Brown'
		},
		{
			name: 'Midnight Dreams',
			group: 'Head',
			category: 'Mask',
			rarity: 3,
			styles: ['Grand', 'Elegant'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Purple'
		},
		{
			name: 'Banquet Lights',
			group: 'Accessories',
			category: 'Earrings',
			rarity: 3,
			styles: ['Grand', 'Elegant'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Purple'
		},
		{
			name: 'Night of Longing',
			group: 'Accessories',
			category: 'Necklace',
			rarity: 4,
			styles: ['Grand', 'Elegant'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Black'
		},
		{
			name: 'Parting Oath',
			group: 'Accessories',
			category: 'Ring',
			rarity: 5,
			styles: ['Grand', 'Elegant'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Purple'
		},
		{
			name: 'Flower of Sincerity',
			group: 'Accessories',
			category: 'Bracelet',
			rarity: 4,
			styles: ['Grand', 'Elegant'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Grey-Brown'
		},
		{
			name: 'First Dance',
			group: 'Footwear',
			category: 'Shoes',
			rarity: 4,
			styles: ['Grand', 'Elegant'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Purple'
		},
		{
			name: 'Fated Night',
			group: 'Tops',
			category: 'Dress',
			rarity: 5,
			styles: ['Grand', 'Elegant'],
			story: 'Queen Marie',
			scene: 'Court Dance',
			color: 'Purple'
		}
	]
};
