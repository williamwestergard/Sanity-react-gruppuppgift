export default {
  name: 'dinoRpgPlayer',
  title: 'DinoRPG Player',
  type: 'document',
  fields: [
    {
      name: 'playerName',
      title: 'Player Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'dinoName',
      title: 'Dinosaur Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'fossils',
      title: 'Fossils',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'dinoType',
      title: 'Dinosaur Type',
      type: 'string',
      options: {
        list: [
          {title: 'Meat Eater', value: 'carnivore'},
          {title: 'Vegetarian', value: 'herbivore'},
          {title: 'Mixed', value: 'omnivore'}
        ]
      }
    },
    {
      name: 'level',
      title: 'Level',
      type: 'number',
      initialValue: 1
    },
    {
      name: 'xp',
      title: 'Experience Points',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'maxHp',
      title: 'Maximum HP',
      type: 'number',
      initialValue: 10
    },
    {
      name: 'currentHp',
      title: 'Current HP',
      type: 'number',
      initialValue: 10
    },
    {
      name: 'attackPower',
      title: 'Attack Power',
      type: 'number',
      initialValue: 1
    },
    {
      name: 'permanentAttackBoost',
      title: 'Permanent Attack Boost',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'permanentHpBoost',
      title: 'Permanent HP Boost',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'lastHpRegen',
      title: 'Last HP Regeneration',
      type: 'datetime'
    },
    {
      name: 'autoHealsRemaining',
      title: 'Auto-Heals Remaining Today',
      type: 'number',
      initialValue: 5
    },
    {
      name: 'lastHealReset',
      title: 'Last Auto-Heal Reset Time',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'itemName',
            title: 'Item Name',
            type: 'string'
          },
          {
            name: 'itemType',
            title: 'Item Type',
            type: 'string',
            options: {
              list: [
                // Battle items
                {title: 'Small Healing Potion', value: 'small_heal'},
                {title: 'Medium Healing Potion', value: 'medium_heal'},
                {title: 'Large Healing Potion', value: 'large_heal'},
                {title: 'Attack Boost', value: 'temp_atk_boost'},
                {title: 'Defense Boost', value: 'temp_def_boost'},
                {title: 'Permanent Attack Crystal', value: 'perm_atk_boost'},
                {title: 'Permanent HP Crystal', value: 'perm_hp_boost'},
                {title: 'Rejuvenation Potion', value: 'rejuvenation'},
                // Cosmetic items
                {title: 'Top Hat', value: 'hat_top_hat'},
                {title: 'Cowboy Hat', value: 'hat_cowboy_hat'},
                {title: 'Party Hat', value: 'hat_party_hat'},
                {title: 'Crown', value: 'hat_crown'},
                {title: 'Sports Car', value: 'vehicle_sports_car'},
                {title: 'Tank', value: 'vehicle_tank'},
                {title: 'UFO', value: 'vehicle_ufo'},
                {title: 'Skateboard', value: 'vehicle_skateboard'},
                {title: 'Rainbow Attack', value: 'effect_rainbow'},
                {title: 'Explosion Attack', value: 'effect_explosion'},
                {title: 'Laser Attack', value: 'effect_laser'},
                {title: 'Matrix Attack', value: 'effect_matrix'},
                {title: 'Neon Color', value: 'color_neon'},
                {title: 'Vaporwave Color', value: 'color_vaporwave'},
                {title: 'Gold Color', value: 'color_gold'},
                {title: 'Rainbow Color', value: 'color_rainbow'}
              ]
            }
          },
          {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            initialValue: 1
          },
          {
            name: 'imageUrl',
            title: 'Image URL',
            type: 'string'
          }
        ]
      }]
    },
    {
      name: 'wins',
      title: 'Total Wins',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'losses',
      title: 'Total Losses',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
} 