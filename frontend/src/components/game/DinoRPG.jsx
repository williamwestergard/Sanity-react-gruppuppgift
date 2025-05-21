import React, { useState, useRef, useEffect } from "react";
import dinos from "../../assets/db-with-img.json";
import { client } from "../../sanityClient";
import "./DinoRPG.css";
import Highscores from "./Highscores";

const DINO_TYPES = [
  {
    key: "carnivore",
    label: "Meat Eater",
    desc: "Strong and fierce, loves meat!",
  },
  {
    key: "herbivore",
    label: "Vegetarian",
    desc: "Peaceful and tough, loves plants!",
  },
  { key: "omnivore", label: "Mixed", desc: "Adaptable and clever, eats both!" },
];

const LOOT_ITEMS = [
  { name: "Small Healing Potion", type: "small_heal", heal: 3, chance: 0.4, minLevel: 1 },
  { name: "Medium Healing Potion", type: "medium_heal", heal: 5, chance: 0.25, minLevel: 1 },
  { name: "Large Healing Potion", type: "large_heal", heal: 8, chance: 0.1, minLevel: 2 },
  { name: "Attack Boost", type: "temp_atk_boost", boost: 2, duration: 1, chance: 0.15, minLevel: 2 },
  { name: "Defense Boost", type: "temp_def_boost", boost: 2, duration: 1, chance: 0.15, minLevel: 2 },
  { name: "Permanent Attack Crystal", type: "perm_atk_boost", boost: 1, chance: 0.05, minLevel: 3 },
  { name: "Permanent HP Crystal", type: "perm_hp_boost", boost: 2, chance: 0.05, minLevel: 3 },
  { name: "Rejuvenation Potion", type: "rejuvenation", chance: 0.01, minLevel: 4 }
];

const MEME_ITEMS = [
  { name: "Top Hat", type: "hat_top_hat", chance: 5, fossilCost: 100 },
  { name: "Cowboy Hat", type: "hat_cowboy_hat", chance: 0.1, fossilCost: 150 },
  { name: "Party Hat", type: "hat_party_hat", chance: 0.08, fossilCost: 200 },
  { name: "Crown", type: "hat_crown", chance: 0.05, fossilCost: 500 },
  { name: "Sports Car", type: "vehicle_sports_car", chance: 0.1, fossilCost: 300 },
  { name: "Tank", type: "vehicle_tank", chance: 0.08, fossilCost: 400 },
  { name: "UFO", type: "vehicle_ufo", chance: 0.05, fossilCost: 600 },
  { name: "Skateboard", type: "vehicle_skateboard", chance: 0.15, fossilCost: 200 },
  { name: "Rainbow Attack", type: "effect_rainbow", chance: 0.1, fossilCost: 250 },
  { name: "Explosion Attack", type: "effect_explosion", chance: 0.1, fossilCost: 300 },
  { name: "Laser Attack", type: "effect_laser", chance: 0.08, fossilCost: 400 },
  { name: "Matrix Attack", type: "effect_matrix", chance: 0.05, fossilCost: 500 }
];

// Add shop items after MEME_ITEMS
const SHOP_ITEMS = [
  { name: "Small Healing Potion", type: "small_heal", cost: 50, heal: 3, description: "Heals 3 HP" },
  { name: "Medium Healing Potion", type: "medium_heal", cost: 100, heal: 5, description: "Heals 5 HP" },
  { name: "Large Healing Potion", type: "large_heal", cost: 200, heal: 8, description: "Heals 8 HP" },
  { name: "Attack Speed+", type: "perm_attack_speed", cost: 200, boost: 0.1, description: "Permanently increase attack speed by 10%" },
  { name: "Razor Claws", type: "perm_crit_chance", cost: 300, boost: 0.05, description: "5% chance to deal double damage" },
  { name: "Battle Scales", type: "perm_defense", cost: 250, boost: 1, description: "Permanently reduce damage taken by 1" },
  { name: "Ancient Power", type: "perm_atk_boost", cost: 400, boost: 2, description: "Permanently increase attack by 2" },
  { name: "Dino Heart", type: "perm_hp_boost", cost: 350, boost: 5, description: "Permanently increase max HP by 5" },
  { name: "X-Strike Effect", type: "effect_x_strike", cost: 100, description: "Cool X effect on hits" },
  { name: "Fire Effect", type: "effect_fire", cost: 150, description: "Fiery hit effect" },
  { name: "Ice Effect", type: "effect_ice", cost: 150, description: "Freezing hit effect" },
  { name: "Thunder Effect", type: "effect_thunder", cost: 200, description: "Lightning strike effect" }
];

const BASE_HP = 10;
const HP_PER_LEVEL = 5;
const BASE_DAMAGE = 1;
const DAMAGE_PER_LEVEL = 0.5;

// Add starting inventory items
const STARTING_INVENTORY = [
  { name: "Small Healing Potion", type: "small_heal", heal: 3, quantity: 3 },
  { name: "Medium Healing Potion", type: "medium_heal", heal: 5, quantity: 2 }
];

// Add common Flaticon CDN paths for items
const ITEM_IMAGES = {
  hat: [
    'https://cdn-icons-png.flaticon.com/128/1974/1974210.png', // Top hat
    'https://cdn-icons-png.flaticon.com/128/1974/1974203.png', // Cowboy hat
    'https://cdn-icons-png.flaticon.com/128/1974/1974207.png', // Party hat
    'https://cdn-icons-png.flaticon.com/128/1974/1974205.png'  // Crown
  ],
  vehicle: [
    'https://cdn-icons-png.flaticon.com/128/3097/3097180.png', // Sports car
    'https://cdn-icons-png.flaticon.com/128/2115/2115955.png', // Tank
    'https://cdn-icons-png.flaticon.com/128/2534/2534183.png', // UFO
    'https://cdn-icons-png.flaticon.com/128/2972/2972185.png'  // Skateboard
  ],
  effect: [
    'https://cdn-icons-png.flaticon.com/128/3097/3097956.png', // Rainbow
    'https://cdn-icons-png.flaticon.com/128/1405/1405351.png', // Explosion
    'https://cdn-icons-png.flaticon.com/128/1584/1584892.png', // Laser
    'https://cdn-icons-png.flaticon.com/128/1584/1584891.png'  // Matrix
  ],
  potion: [
    'https://cdn-icons-png.flaticon.com/128/2431/2431965.png', // Small heal
    'https://cdn-icons-png.flaticon.com/128/2431/2431967.png', // Medium heal
    'https://cdn-icons-png.flaticon.com/128/2431/2431969.png', // Large heal
    'https://cdn-icons-png.flaticon.com/128/2431/2431971.png'  // Rejuvenation
  ]
};

function getRandomItemImage(type) {
  if (type.includes('hat')) {
    return ITEM_IMAGES.hat[Math.floor(Math.random() * ITEM_IMAGES.hat.length)];
  } else if (type.includes('vehicle')) {
    return ITEM_IMAGES.vehicle[Math.floor(Math.random() * ITEM_IMAGES.vehicle.length)];
  } else if (type.includes('effect')) {
    return ITEM_IMAGES.effect[Math.floor(Math.random() * ITEM_IMAGES.effect.length)];
  } else if (type.includes('heal') || type.includes('boost') || type.includes('rejuvenation')) {
    return ITEM_IMAGES.potion[Math.floor(Math.random() * ITEM_IMAGES.potion.length)];
  }
  return 'https://cdn-icons-png.flaticon.com/128/3097/3097972.png'; // Default item image
}

// Add helper function for item details
function getItemDetails(item) {
  const lootItem = LOOT_ITEMS.find(i => i.type === item.type);
  const memeItem = MEME_ITEMS.find(i => i.type === item.type);
  return {
    name: lootItem?.name || memeItem?.name || item.name || "Mystery Item",
    heal: lootItem?.heal,
    boost: lootItem?.boost,
    type: item.type
  };
}

// Update getRandomDino to make level 1 easier
function getRandomDino(type, targetLevel) {
  function calculateDinoLevel(dino) {
    if (targetLevel === 1) {
      // For level 1 players, prefer smaller dinos
      if (dino.length) {
        const lengthInMeters = parseFloat(dino.length);
        if (!isNaN(lengthInMeters)) {
          if (lengthInMeters <= 3) return 1;
          if (lengthInMeters <= 5) return 2;
          return 3;
        }
      }
      return 1; // Default to level 1 for new players
    }

    // Normal level calculation for higher levels
    if (dino.length) {
      const lengthInMeters = parseFloat(dino.length);
      if (!isNaN(lengthInMeters)) {
        if (lengthInMeters <= 3) return Math.max(1, targetLevel - 1);
        if (lengthInMeters <= 6) return targetLevel;
        if (lengthInMeters <= 10) return targetLevel + 1;
        if (lengthInMeters <= 15) return targetLevel + 2;
        return targetLevel + 3;
      }
    }
    return Math.max(1, targetLevel + Math.floor(Math.random() * 3) - 1);
  }

  // Filter dinos based on player level
  const validDinos = dinos.filter(d => {
    const dinoLevel = calculateDinoLevel(d);
    if (targetLevel === 1) {
      // For level 1, only show level 1 opponents
      return dinoLevel === 1;
    }
    return (!targetLevel || Math.abs(dinoLevel - targetLevel) <= 2);
  }).map(d => ({
    ...d,
    level: calculateDinoLevel(d),
    maxHp: BASE_HP + (calculateDinoLevel(d) - 1) * HP_PER_LEVEL,
    attackPower: BASE_DAMAGE + (calculateDinoLevel(d) - 1) * DAMAGE_PER_LEVEL
  }));

  if (validDinos.length === 0) {
    return null;
  }
  
  const idx = Math.floor(Math.random() * validDinos.length);
  return validDinos[idx];
}

function calculateBattleOdds(playerLevel, opponentLevel, playerHp, opponentHp) {
  // Base 50/50 for same level
  let odds = 0.5;
  
  // Level difference affects odds
  const levelDiff = playerLevel - opponentLevel;
  odds += levelDiff * 0.1; // Each level difference is worth 10%
  
  // HP ratio affects odds
  const playerHpRatio = playerHp / BASE_HP;
  const opponentHpRatio = opponentHp / BASE_HP;
  odds += (playerHpRatio - opponentHpRatio) * 0.2; // HP difference worth up to 20%
  
  return Math.max(0.1, Math.min(0.9, odds)); // Clamp between 10% and 90%
}

function rollLoot(playerLevel) {
  const loot = [];
  
  // Guarantee at least one healing potion based on player level
  const availableHeals = LOOT_ITEMS.filter(
    item => item.type.includes('heal') && 
    item.minLevel <= playerLevel
  );
  if (availableHeals.length > 0) {
    const healItem = { ...availableHeals[Math.floor(Math.random() * availableHeals.length)] };
    healItem.imageUrl = getRandomItemImage(healItem.type);
    loot.push(healItem);
  }

  // Roll for additional items
  LOOT_ITEMS.forEach(item => {
    if (item.minLevel <= playerLevel && Math.random() < item.chance) {
      const lootItem = { ...item };
      lootItem.imageUrl = getRandomItemImage(lootItem.type);
      loot.push(lootItem);
    }
  });

  // Roll for meme items
  MEME_ITEMS.forEach(item => {
    if (Math.random() < item.chance * (playerLevel / 5)) { // Higher chance at higher levels
      const memeItem = { ...item };
      memeItem.imageUrl = getRandomItemImage(memeItem.type);
      loot.push(memeItem);
    }
  });

  return loot;
}

// Function to get a working dino image
function getWorkingDinoImage(dino) {
  // List of reliable dino images (add more as needed)
  const reliableDinos = dinos.filter(d => {
    const img = new Image();
    img.src = d.image;
    return img.complete;
  });

  if (dino?.image) {
    const img = new Image();
    img.src = dino.image;
    if (img.complete) {
      return dino.image;
    }
  }

  // Find a similar dino by type or size
  const similarDino = reliableDinos.find(d => 
    d.diet === dino?.diet || 
    (d.length && dino?.length && Math.abs(parseFloat(d.length) - parseFloat(dino.length)) < 2)
  );

  return similarDino ? similarDino.image : "https://via.placeholder.com/200x150?text=Dinosaur";
}

// Add this helper function for displaying stats
function StatDisplay({ label, value, color = "#43a047" }) {
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "0.5rem",
      background: "rgba(0,0,0,0.2)",
      padding: "0.3rem 0.6rem",
      borderRadius: "0.5rem",
      fontSize: "0.9rem"
    }}>
      <span style={{ color }}>{label}:</span>
      <span>{value}</span>
    </div>
  );
}

// Add image preloading function at the top level
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

// Add preloading helper for dinos
async function preloadDinoImages(dino) {
  if (!dino) return null;
  try {
    await preloadImage(dino.image);
    return dino;
  } catch (error) {
    console.warn(`Failed to load image for ${dino.name}, using fallback image`);
    dino.image = "https://via.placeholder.com/200x150?text=No+Image";
    return dino;
  }
}

export default function DinoRPG() {
  // Basic game state
  const [dinoName, setDinoName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [dinoType, setDinoType] = useState(null);
  const [playerDino, setPlayerDino] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [playerId, setPlayerId] = useState(null);

  // Player stats
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [fossils, setFossils] = useState(0);
  const [maxHp, setMaxHp] = useState(BASE_HP);
  const [playerHp, setPlayerHp] = useState(BASE_HP);
  const [attackPower, setAttackPower] = useState(BASE_DAMAGE);
  const [permanentAttackBoost, setPermanentAttackBoost] = useState(0);
  const [permanentHpBoost, setPermanentHpBoost] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  // Battle state
  const [battleResult, setBattleResult] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [opponentHp, setOpponentHp] = useState(BASE_HP);
  const [battleLog, setBattleLog] = useState([]);
  const [isBattling, setIsBattling] = useState(false);
  const [playerDmg, setPlayerDmg] = useState(null);
  const [opponentDmg, setOpponentDmg] = useState(null);
  const [battleOdds, setBattleOdds] = useState(0.5);
  const [tempAttackBoost, setTempAttackBoost] = useState(0);
  const [tempDefenseBoost, setTempDefenseBoost] = useState(0);

  // Items and effects
  const [inventory, setInventory] = useState([]);
  const [lootDrops, setLootDrops] = useState([]);
  const [equippedItems, setEquippedItems] = useState({
    hat: null,
    vehicle: null,
    effect: null
  });

  // Auto-heal system
  const [lastHpRegen, setLastHpRegen] = useState(null);
  const [autoHealsRemaining, setAutoHealsRemaining] = useState(5);
  const [lastHealReset, setLastHealReset] = useState(null);

  // For clearing intervals
  const battleInterval = useRef(null);

  // Add these to your DinoRPG component state
  const [showShop, setShowShop] = useState(false);
  const [attackSpeed, setAttackSpeed] = useState(1);
  const [critChance, setCritChance] = useState(0);
  const [defense, setDefense] = useState(0);

  // Add new state for animations
  const [playerAnimation, setPlayerAnimation] = useState(null);
  const [opponentAnimation, setOpponentAnimation] = useState(null);
  const [hitEffects, setHitEffects] = useState([]);

  // Add password state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Add loading state
  const [imageLoading, setImageLoading] = useState(false);

  // Initialize new player inventory
  useEffect(() => {
    if (!registered && !showLogin) {
      setInventory(STARTING_INVENTORY);
    }
  }, [registered, showLogin]);

  // Check for HP regeneration and auto-heal reset
  useEffect(() => {
    if (!playerId || !isBattling) return;

    // Check if HP is low and we have healing potions
    if (playerHp <= maxHp * 0.5) {
      // Try to use the best healing potion available
      const healingPotions = inventory.filter(item => item.type.includes('heal'))
        .sort((a, b) => {
          const healA = LOOT_ITEMS.find(i => i.type === a.type)?.heal || 0;
          const healB = LOOT_ITEMS.find(i => i.type === b.type)?.heal || 0;
          return healB - healA;
        });

      if (healingPotions.length > 0) {
        const bestPotion = healingPotions[0];
        const potionData = LOOT_ITEMS.find(i => i.type === bestPotion.type);
        const healAmount = potionData.heal;
        const newHp = Math.min(maxHp, playerHp + healAmount);
        
        // Remove the potion from inventory
        const newInventory = [...inventory];
        const potionIndex = newInventory.findIndex(i => i.type === bestPotion.type);
        if (newInventory[potionIndex].quantity > 1) {
          newInventory[potionIndex].quantity--;
        } else {
          newInventory.splice(potionIndex, 1);
        }

        setPlayerHp(newHp);
        setInventory(newInventory);
        updatePlayerInSanity({ 
          currentHp: newHp,
          inventory: newInventory
        });
        setBattleLog(prev => [...prev, `Used ${bestPotion.itemName || potionData.name}! Restored ${healAmount} HP.`]);
      }
    }
  }, [playerId, isBattling, playerHp, maxHp, inventory]);

  // Add this function to handle hit effects
  const addHitEffect = (isPlayer) => {
    const id = Date.now();
    const effect = {
      id,
      x: Math.random() * 80 + 20, // Random position within the target
      y: Math.random() * 60 + 20
    };
    setHitEffects(prev => [...prev, effect]);
    setTimeout(() => {
      setHitEffects(prev => prev.filter(e => e.id !== id));
    }, 500);
  };

  // Update battle logic
  React.useEffect(() => {
    if (!isBattling || !opponent) return;

    if (playerHp <= 0) {
      // Player died - delete character if no rejuvenation potion
      const hasRejuvenation = inventory.some(item => item.type === 'rejuvenation');
      if (!hasRejuvenation) {
        setBattleLog(prev => [...prev, "Your dinosaur has fallen! Game Over!"]);
        setBattleResult('lose');
        setIsBattling(false);
        const newLosses = losses + 1;
        setLosses(newLosses);
        // Update losses and mark as dead before deletion
        updatePlayerInSanity({ 
          losses: newLosses,
          isDead: true 
        })
        .then(() => {
          setTimeout(() => {
            setRegistered(false);
            setDinoName("");
            setDinoType(null);
            setPlayerDino(null);
          }, 3000);
        });
      } else {
        // Use rejuvenation potion automatically
        const newInventory = inventory.filter(item => item.type !== 'rejuvenation');
        setInventory(newInventory);
        setPlayerHp(maxHp);
        setBattleLog(prev => [...prev, "Rejuvenation potion used automatically! You've been restored to full health!"]);
        updatePlayerInSanity({ 
          inventory: newInventory,
          currentHp: maxHp
        });
      }
      return;
    }

    if (opponentHp <= 0) {
      // Opponent died - handle victory
      setBattleLog(prev => [...prev, "Victory! Your opponent has been defeated!"]);
      setBattleResult('win');
      setIsBattling(false);
      
      // Roll for loot and add XP
      const newLoot = rollLoot(level);
      const xpGained = Math.floor(Math.random() * 3) + 3 + Math.floor(opponent.level / 2); // More XP from higher level opponents
      const newXp = xp + xpGained;
      const shouldLevelUp = newXp >= 10;
      const newLevel = shouldLevelUp ? level + 1 : level;
      const newWins = wins + 1;
      
      setWins(newWins);
      setXp(shouldLevelUp ? 0 : newXp);
      
      if (shouldLevelUp) {
        setLevel(newLevel);
        handleLevelUp(newLevel);
      }

      // Always have loot after victory
      setLootDrops(newLoot);
      
      // Format loot message
      const lootMessages = newLoot.map(item => {
        const itemDetails = getItemDetails(item);
        let msg = `- ${itemDetails.name}`;
        if (itemDetails.heal) msg += ` (Heals ${itemDetails.heal} HP)`;
        if (itemDetails.boost) msg += ` (+${itemDetails.boost} ${item.type.includes('atk') ? 'Attack' : 'Defense'})`;
        return msg;
      });
      
      setBattleLog(prev => [
        ...prev,
        "You found some items!",
        ...lootMessages
      ]);
      
      // Update inventory with new items
      const updatedInventory = [...inventory];
      newLoot.forEach(item => {
        const existingItem = updatedInventory.find(i => i.type === item.type);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          updatedInventory.push({ ...item, quantity: 1 });
        }
      });
      setInventory(updatedInventory);
      
      // Add fossils (more for higher level opponents)
      const fossilsGained = Math.floor(Math.random() * 20) + (opponent.level * 10);
      const newFossils = fossils + fossilsGained;
      setFossils(newFossils);
      setBattleLog(prev => [...prev, `Found ${fossilsGained} fossils!`]);

      // Update Sanity with all changes
      updatePlayerInSanity({ 
        inventory: updatedInventory,
        wins: newWins,
        xp: shouldLevelUp ? 0 : newXp,
        level: newLevel,
        fossils: newFossils,
        currentHp: playerHp
      }).catch(error => {
        console.error("Failed to update player after victory:", error);
      });
      
      return;
    }

    // Battle round
    battleInterval.current = setTimeout(() => {
      const playerTotalAttack = attackPower + tempAttackBoost;
      const playerDamageReduction = tempDefenseBoost * 0.1 + defense;

      // Calculate crit
      const isCrit = Math.random() < critChance;
      const critMultiplier = isCrit ? 2 : 1;

      const baseDmgToOpponent = Math.floor(Math.random() * 3) + playerTotalAttack;
      const baseDmgToPlayer = Math.floor(Math.random() * 3) + opponent.attackPower;
      
      const dmgToOpponent = Math.round(baseDmgToOpponent * critMultiplier * (1 + (battleOdds - 0.5)));
      const dmgToPlayer = Math.round(baseDmgToPlayer * (1 + (0.5 - battleOdds)) * (1 - playerDamageReduction));

      // Apply animations
      setOpponentAnimation('shake-animation');
      addHitEffect(false);
      if (isCrit) {
        setOpponentAnimation(prev => `${prev} critical-hit`);
      }
      
      // Add equipped effect animations if any
      if (equippedItems.effect) {
        const effectType = equippedItems.effect.type.split('_')[1];
        setOpponentAnimation(prev => `${prev} ${effectType}-effect`);
      }

      setTimeout(() => {
        setPlayerAnimation('shake-animation');
        addHitEffect(true);
      }, 300);

      // Clear animations
      setTimeout(() => {
        setOpponentAnimation(null);
        setPlayerAnimation(null);
      }, 600);

      setOpponentHp(hp => Math.max(0, hp - dmgToOpponent));
      setPlayerHp(hp => Math.max(0, hp - dmgToPlayer));
      setBattleLog(log => [
        ...log,
        `${isCrit ? "CRITICAL HIT! " : ""}You dealt ${dmgToOpponent} dmg, took ${dmgToPlayer} dmg.`
      ]);
      setPlayerDmg(-dmgToPlayer);
      setOpponentDmg(-dmgToOpponent);

      setTimeout(() => {
        setPlayerDmg(null);
        setOpponentDmg(null);
      }, 700);
    }, Math.floor(900 / attackSpeed));

    return () => clearTimeout(battleInterval.current);
  }, [isBattling, playerHp, opponentHp, opponent, battleOdds, attackPower, tempAttackBoost, tempDefenseBoost, defense, critChance, attackSpeed, equippedItems]);

  // Reset temporary boosts after battle
  useEffect(() => {
    if (!isBattling) {
      setTempAttackBoost(0);
      setTempDefenseBoost(0);
    }
  }, [isBattling]);

  function handleNextBattle() {
    setBattleResult(null);
    setOpponent(null);
    setOpponentHp(BASE_HP);
    setBattleLog([]);
    setPlayerDmg(null);
    setOpponentDmg(null);
    setLootDrops([]);
  }

  // Add level up function
  function handleLevelUp(newLevel) {
    const newMaxHp = BASE_HP + (newLevel - 1) * HP_PER_LEVEL + permanentHpBoost;
    const newAttackPower = BASE_DAMAGE + (newLevel - 1) * DAMAGE_PER_LEVEL + permanentAttackBoost;
    
    setMaxHp(newMaxHp);
    setAttackPower(newAttackPower);
    setPlayerHp(newMaxHp); // Heal to full on level up
    
    updatePlayerInSanity({
      level: newLevel,
      maxHp: newMaxHp,
      currentHp: newMaxHp,
      attackPower: newAttackPower
    }).then(() => {
      setBattleLog(prev => [...prev, `Level Up! You are now level ${newLevel}!`]);
    }).catch(error => {
      console.error("Failed to update player stats:", error);
    });
  }

  // Also update the handleLogin function to handle errors better
  async function handleLogin(e) {
    e.preventDefault();
    if (dinoName.trim()) {
      try {
        resetGameState(); // Reset all state before logging in
        
        const query = `*[_type == "dinoRpgPlayer" && dinoName == $dinoName][0] {
          _id,
          playerName,
          dinoName,
          password,
          dinoType,
          level,
          xp,
          maxHp,
          currentHp,
          attackPower,
          permanentAttackBoost,
          permanentHpBoost,
          lastHpRegen,
          autoHealsRemaining,
          lastHealReset,
          inventory,
          wins,
          losses,
          fossils,
          equippedItems,
          isDead
        }`;
        
        const player = await client.fetch(query, { dinoName: dinoName.trim() });
        
        if (!player) {
          alert("Player not found! Please check the name or register a new character.");
          return;
        }

        if (player.password !== loginPassword) {
          alert("Incorrect password!");
          return;
        }

        if (player.isDead) {
          alert("This dinosaur has fallen in battle and cannot be revived!");
          return;
        }

        // Set all player data including equipped items
        setPlayerId(player._id);
        setDinoName(player.dinoName);
        setDinoType(player.dinoType);
        setLevel(player.level || 1);
        setXp(player.xp || 0);
        setEquippedItems(player.equippedItems || { hat: null, vehicle: null, effect: null });
        
        // Calculate proper HP values with fallbacks
        const calculatedMaxHp = BASE_HP + ((player.level || 1) - 1) * HP_PER_LEVEL + (player.permanentHpBoost || 0);
        setMaxHp(calculatedMaxHp);
        setPlayerHp(player.currentHp || calculatedMaxHp);
        
        // Set other stats with fallbacks
        setPermanentAttackBoost(player.permanentAttackBoost || 0);
        setPermanentHpBoost(player.permanentHpBoost || 0);
        setLastHpRegen(player.lastHpRegen || new Date().toISOString());
        setAutoHealsRemaining(player.autoHealsRemaining || 5);
        setLastHealReset(player.lastHealReset || new Date().toISOString());
        setWins(player.wins || 0);
        setLosses(player.losses || 0);
        setInventory(player.inventory || STARTING_INVENTORY);
        setFossils(player.fossils || 0);
        
        // If player has a dinoType, get their dino
        if (player.dinoType) {
          const dino = getRandomDino(player.dinoType, player.level || 1);
          setPlayerDino(dino);
        }
        
        setRegistered(true);
        setShowLogin(false);
      } catch (error) {
        console.error("Login error:", error);
        alert(error.message || "Failed to login. Please try again.");
      }
    }
  }

  // Add reset function to clear all state when creating new character
  function resetGameState() {
    setLevel(1);
    setXp(0);
    setFossils(0);
    setMaxHp(BASE_HP);
    setPlayerHp(BASE_HP);
    setAttackPower(BASE_DAMAGE);
    setPermanentAttackBoost(0);
    setPermanentHpBoost(0);
    setWins(0);
    setLosses(0);
    setInventory(STARTING_INVENTORY);
    setBattleResult(null);
    setOpponent(null);
    setOpponentHp(BASE_HP);
    setBattleLog([]);
    setIsBattling(false);
    setPlayerDmg(null);
    setOpponentDmg(null);
    setBattleOdds(0.5);
    setTempAttackBoost(0);
    setTempDefenseBoost(0);
    setShowShop(false);
    setEquippedItems({ hat: null, vehicle: null, effect: null });
  }

  // Update handleSubmit to use resetGameState
  async function handleSubmit(e) {
    e.preventDefault();
    if (dinoName.trim()) {
      try {
        resetGameState(); // Reset all state before creating new character
        
        const initialMaxHp = BASE_HP;
        const initialAttack = BASE_DAMAGE;
        
        const player = {
          _type: 'dinoRpgPlayer',
          playerName: dinoName,
          dinoName: dinoName,
          password: password,
          level: 1,
          xp: 0,
          maxHp: initialMaxHp,
          currentHp: initialMaxHp,
          attackPower: initialAttack,
          permanentAttackBoost: 0,
          permanentHpBoost: 0,
          lastHpRegen: new Date().toISOString(),
          autoHealsRemaining: 5,
          lastHealReset: new Date().toISOString(),
          inventory: STARTING_INVENTORY,
          wins: 0,
          losses: 0,
          fossils: 0,
          isDead: false
        };
        
        const result = await client.create(player);
        setPlayerId(result._id);
        setRegistered(true);
      } catch (error) {
        console.error("Failed to register player:", error);
        alert(`Failed to register player: ${error.message}`);
      }
    }
  }

  function rollMemeItem() {
    const availableItems = MEME_ITEMS.filter(item => 
      !inventory.some(invItem => invItem.itemType === item.type)
    );
    
    if (availableItems.length === 0) return null;
    
    for (const item of availableItems) {
      if (Math.random() < item.chance) {
        return {
          itemName: item.name,
          itemType: item.type,
          quantity: 1,
          imageUrl: getRandomItemImage(item.type)
        };
      }
    }
    return null;
  }

  async function updatePlayerInSanity(updates) {
    if (!playerId) return;
    try {
      await client
        .patch(playerId)
        .set(updates)
        .commit();
    } catch (error) {
      console.error("Failed to update player:", error);
    }
  }

  // Update handleTypeSelect to preload images
  async function handleTypeSelect(type) {
    setDinoType(type);
    setImageLoading(true);
    const dino = getRandomDino(type, level);
    try {
      const loadedDino = await preloadDinoImages(dino);
      setPlayerDino(loadedDino);
    } catch (error) {
      console.error("Failed to load dino images:", error);
      setPlayerDino(dino); // Fallback to unloaded dino
    } finally {
      setImageLoading(false);
    }
    updatePlayerInSanity({ dinoType: type });
  }

  // Update startBattle to preload opponent images
  async function startBattle() {
    const opponent = getRandomDino(null, level);
    if (!opponent) {
      console.error('No suitable opponent found');
      return;
    }
    
    setImageLoading(true);
    try {
      const loadedOpponent = await preloadDinoImages(opponent);
      
      // Calculate opponent stats
      const opponentMaxHp = BASE_HP + (loadedOpponent.level - 1) * HP_PER_LEVEL;
      loadedOpponent.maxHp = opponentMaxHp;
      loadedOpponent.attackPower = BASE_DAMAGE + (loadedOpponent.level - 1) * DAMAGE_PER_LEVEL;
      
      setOpponent(loadedOpponent);
      setOpponentHp(opponentMaxHp);
      setBattleLog([]);
      setBattleResult(null);
      setIsBattling(true);
      setPlayerDmg(null);
      setOpponentDmg(null);
      setLootDrops([]);
      
      const odds = calculateBattleOdds(level, loadedOpponent.level, playerHp, opponentMaxHp);
      setBattleOdds(odds);
      setBattleLog([
        `A level ${loadedOpponent.level} ${loadedOpponent.name} appears!`,
        `Battle odds: ${Math.round(odds * 100)}%`
      ]);
    } catch (error) {
      console.error("Failed to load opponent images:", error);
    } finally {
      setImageLoading(false);
    }
  }

  // Add sell and shop functions
  function sellItem(itemIndex) {
    const item = inventory[itemIndex];
    if (!item) return;

    // Only meme items can be sold
    const memeItem = MEME_ITEMS.find(i => i.type === item.type);
    if (!memeItem) return;

    const sellPrice = Math.floor(memeItem.fossilCost * 0.5); // 50% of original price
    const newFossils = fossils + sellPrice;
    setFossils(newFossils);

    const newInventory = [...inventory];
    if (newInventory[itemIndex].quantity > 1) {
      newInventory[itemIndex].quantity--;
    } else {
      // If it's equipped, unequip it
      if (equippedItems.hat?.type === item.type ||
          equippedItems.vehicle?.type === item.type ||
          equippedItems.effect?.type === item.type) {
        const itemType = item.type.split('_')[0]; // hat, vehicle, or effect
        setEquippedItems(prev => ({
          ...prev,
          [itemType]: null
        }));
      }
      newInventory.splice(itemIndex, 1);
    }

    setInventory(newInventory);
    setBattleLog(prev => [...prev, `Sold ${item.name} for ${sellPrice} fossils!`]);
    
    updatePlayerInSanity({
      inventory: newInventory,
      fossils: newFossils,
      equippedItems
    });
  }

  function purchaseShopItem(item) {
    if (fossils < item.cost) {
      setBattleLog(prev => [...prev, `Not enough fossils! Need ${item.cost} fossils.`]);
      return;
    }

    const newFossils = fossils - item.cost;
    setFossils(newFossils);

    // Handle healing potions
    if (item.type.includes('heal')) {
      const newItem = {
        name: item.name,
        type: item.type,
        heal: item.heal,
        imageUrl: getRandomItemImage('potion'),
        quantity: 1
      };
      setInventory(prev => {
        const existingItem = prev.find(i => i.type === item.type);
        if (existingItem) {
          return prev.map(i => i.type === item.type ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, newItem];
      });
      setBattleLog(prev => [...prev, `Purchased ${item.name}!`]);
    } else {
      // Handle other items as before...
      switch (item.type) {
        case 'perm_attack_speed':
          setAttackSpeed(prev => prev + item.boost);
          break;
        case 'perm_crit_chance':
          setCritChance(prev => prev + item.boost);
          break;
        case 'perm_defense':
          setDefense(prev => prev + item.boost);
          break;
        case 'perm_atk_boost':
          setPermanentAttackBoost(prev => prev + item.boost);
          setAttackPower(prev => prev + item.boost);
          break;
        case 'perm_hp_boost':
          setPermanentHpBoost(prev => prev + item.boost);
          setMaxHp(prev => prev + item.boost);
          setPlayerHp(prev => prev + item.boost);
          break;
        default:
          // Handle effects
          if (item.type.startsWith('effect_')) {
            const newItem = {
              name: item.name,
              type: item.type,
              imageUrl: getRandomItemImage(item.type),
              quantity: 1
            };
            setInventory(prev => [...prev, newItem]);
          }
      }
    }

    updatePlayerInSanity({
      fossils: newFossils,
      attackSpeed,
      critChance,
      defense,
      permanentAttackBoost,
      permanentHpBoost,
      maxHp,
      attackPower,
      inventory,
      equippedItems
    });
  }

  return (
    <div className="dino-rpg-container">
      <h2 className="pokemon-heading">Dino RPG - Hardcore Mode</h2>
      {!registered ? (
        <>
          <div className="login-container">
            <form onSubmit={showLogin ? handleLogin : handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center'
              }}>
                <label style={{
                  width: '120px',
                  textAlign: 'right',
                  marginRight: '1rem'
                }}>
                  Dino Name:
                </label>
                <input
                  className="dino-rpg-input"
                  type="text"
                  value={dinoName}
                  onChange={(e) => setDinoName(e.target.value)}
                  maxLength={20}
                  required
                  style={{
                    flex: 1,
                    minWidth: '150px'
                  }}
                />
              </div>

              <div style={{ 
                display: 'flex',
                alignItems: 'center'
              }}>
                <label style={{
                  width: '120px',
                  textAlign: 'right',
                  marginRight: '1rem'
                }}>
                  Password:
                </label>
                <input
                  className="dino-rpg-input"
                  type="password"
                  value={showLogin ? loginPassword : password}
                  onChange={(e) => showLogin ? 
                    setLoginPassword(e.target.value) : 
                    setPassword(e.target.value)
                  }
                  required
                  style={{
                    flex: 1,
                    minWidth: '150px'
                  }}
                />
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button type="submit" className="register-button">
                  {showLogin ? "Login" : "Register"}
                </button>
              </div>
            </form>
            <button 
              className="toggle-login-button"
              onClick={() => {
                setShowLogin(!showLogin);
                setPassword("");
                setLoginPassword("");
              }}
            >
              {showLogin ? "Need to register?" : "Already registered?"}
            </button>
          </div>
          <Highscores />
        </>
      ) : !dinoType ? (
        <div>
          <h3>
            Welcome, <span style={{ color: "#43a047" }}>{dinoName}</span>!
          </h3>
          <p>Choose your dino type:</p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            {DINO_TYPES.map((type) => (
              <button
                key={type.key}
                className="dino-type-btn"
                onClick={() => handleTypeSelect(type.key)}
                style={{
                  padding: "1.2rem 1.5rem",
                  borderRadius: "1rem",
                  border: "2px solid #234d20",
                  background: "#eaf7d0",
                  fontFamily: "inherit",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 2px #7fa86b inset",
                  minWidth: "120px",
                  transition: "background 0.2s, transform 0.1s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#d2e7b2")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#eaf7d0")
                }
              >
                {type.label}
                <div
                  style={{
                    fontWeight: "normal",
                    fontSize: "0.95rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {type.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="player-stats">
            <div style={{ 
              display: "flex", 
              gap: "1rem", 
              alignItems: "center", 
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%"
            }}>
              <span style={{ fontSize: "1.2rem" }}>🦴 {fossils} Fossils</span>
              <div>
                <HPBar hp={playerHp} max={maxHp} />
                {playerDmg !== null && <FloatingDmg value={playerDmg} />}
                <div style={{ fontSize: "0.95rem", textAlign: "center" }}>
                  Level: {level} | XP: {xp}/10
                </div>
              </div>
              <button 
                onClick={() => setShowShop(!showShop)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#43a047',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={e => e.currentTarget.style.background = "#2d5a3f"}
                onMouseOut={e => e.currentTarget.style.background = "#43a047"}
              >
                Shop
              </button>
            </div>
          </div>
          {inventory.length > 0 && (
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <h4>Inventory:</h4>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                {inventory.map((item, idx) => {
                  const details = getItemDetails(item);
                  const isMemeItem = MEME_ITEMS.some(m => m.type === item.type);
                  const sellPrice = isMemeItem ? Math.floor(MEME_ITEMS.find(m => m.type === item.type).fossilCost * 0.5) : 0;
                  
                  return (
                    <div
                      key={idx}
                      className="inventory-item"
                      style={{
                        padding: "0.5rem",
                        background: "#eaf7d0",
                        border: "1px solid #234d20",
                        borderRadius: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        minWidth: "120px",
                        position: "relative"
                      }}
                    >
                      {/* Quantity badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          background: "#43a047",
                          color: "white",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          border: "2px solid #234d20"
                        }}
                      >
                        {item.quantity}
                      </div>
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl} 
                          alt={details.name}
                          style={{ width: "32px", height: "32px" }}
                        />
                      )}
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                          {details.name}
                        </div>
                        {details.heal && (
                          <div style={{ fontSize: "0.9rem", color: "#43a047" }}>
                            Heals {details.heal} HP
                          </div>
                        )}
                        {details.boost && (
                          <div style={{ fontSize: "0.9rem", color: "#43a047" }}>
                            +{details.boost} {details.type.includes('atk') ? 'Attack' : 'Defense'}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => useItem(idx)}
                        style={{ 
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.8rem",
                          background: "#43a047",
                          color: "white",
                          border: "none",
                          borderRadius: "0.25rem",
                          cursor: "pointer"
                        }}
                      >
                        Use
                      </button>
                      {isMemeItem && (
                        <div style={{ marginTop: '0.25rem' }}>
                          <button
                            onClick={() => sellItem(idx)}
                            style={{ 
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.8rem',
                              background: '#e53935',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer',
                              marginLeft: '0.5rem'
                            }}
                          >
                            Sell (🦴 {sellPrice})
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div
            style={{
              margin: "2rem 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Player Dino */}
            <div
              style={{
                width: "48%",
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Player Dino Image */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={getWorkingDinoImage(playerDino)}
                  alt={playerDino?.name}
                  className={playerAnimation}
                  style={{
                    width: "120px",
                    height: "90px",
                    objectFit: "contain",
                    border: "3px solid #234d20",
                    borderRadius: "1rem",
                    background: "#eaf7d0",
                    marginBottom: "0.5rem",
                  }}
                />
                {hitEffects.map(effect => (
                  <div
                    key={effect.id}
                    className="hit-effect"
                    style={{
                      left: `${effect.x}%`,
                      top: `${effect.y}%`
                    }}
                  />
                ))}
                {/* Equipped Items */}
                {equippedItems.hat && (
                  <img
                    src={equippedItems.hat.imageUrl}
                    alt="Hat"
                    style={{
                      position: "absolute",
                      top: "-15px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "32px",
                      height: "32px",
                      filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))"
                    }}
                  />
                )}
                {equippedItems.vehicle && (
                  <img
                    src={equippedItems.vehicle.imageUrl}
                    alt="Vehicle"
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "40px",
                      height: "40px",
                      filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))"
                    }}
                  />
                )}
                {equippedItems.effect && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${equippedItems.effect.imageUrl})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      opacity: 0.5,
                      pointerEvents: "none"
                    }}
                  />
                )}
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {playerDino?.name}
              </div>
              <div style={{ margin: "0.5rem 0" }}>
                <HPBar hp={playerHp} max={maxHp} />
                {playerDmg !== null && <FloatingDmg value={playerDmg} />}
              </div>
              {/* Add player stats */}
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "0.3rem",
                marginTop: "0.5rem" 
              }}>
                <StatDisplay label="Attack" value={attackPower + tempAttackBoost} />
                <StatDisplay label="Defense" value={defense + tempDefenseBoost} />
                <StatDisplay label="Speed" value={attackSpeed.toFixed(1)} />
                <StatDisplay label="Crit" value={`${(critChance * 100).toFixed(0)}%`} />
              </div>
            </div>
            {/* Opponent Dino */}
            <div
              style={{
                width: "48%",
                textAlign: "center",
                position: "relative",
              }}
            >
              {opponent && (
                <>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img
                      src={opponent?.image || "https://via.placeholder.com/120x90?text=No+Image"}
                      alt={opponent?.name}
                      className={opponentAnimation}
                      style={{
                        width: "120px",
                        height: "90px",
                        objectFit: "contain",
                        border: "2px solid #234d20",
                        borderRadius: "0.7rem",
                        background: "#eaf7d0",
                        marginBottom: "0.5rem",
                      }}
                    />
                    {hitEffects.map(effect => (
                      <div
                        key={effect.id}
                        className="hit-effect"
                        style={{
                          left: `${effect.x}%`,
                          top: `${effect.y}%`
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: "1.1rem" }}>{opponent?.name}</div>
                  <div style={{ margin: "0.5rem 0" }}>
                    <HPBar hp={opponentHp} max={opponent.maxHp} />
                    {opponentDmg !== null && (
                      <FloatingDmg value={opponentDmg} />
                    )}
                  </div>
                  {/* Add opponent stats */}
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "0.3rem",
                    marginTop: "0.5rem" 
                  }}>
                    <StatDisplay label="Level" value={opponent.level} color="#e53935" />
                    <StatDisplay label="Attack" value={opponent.attackPower} color="#e53935" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Battle log and results */}
          {battleLog.length > 0 && !battleResult && (
            <div
              style={{
                background: "#eaf7d0",
                border: "2px solid #234d20",
                borderRadius: "0.7rem",
                margin: "1rem auto",
                maxWidth: 340,
                fontFamily: "monospace",
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                minHeight: "2.2rem",
                color: "#234d20"
              }}
            >
              {battleLog.slice(-2).map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}

          {battleResult && (
            <div style={{
              background: "#eaf7d0",
              padding: "1.5rem",
              borderRadius: "1rem",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              color: "#234d20",
              maxWidth: "400px",
              margin: "1rem auto"
            }}>
              <h4 style={{ 
                margin: "0",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: battleResult === "lose" ? "#e53935" : "#43a047"
              }}>
                {battleResult === "win"
                  ? "Victory!"
                  : battleResult === "lose"
                  ? "Game Over!"
                  : "Draw!"}
              </h4>

              {/* Show loot if there is any and player hasn't died */}
              {lootDrops.length > 0 && battleResult !== "lose" && (
                <div style={{
                  textAlign: "center",
                  marginTop: "0.5rem"
                }}>
                  <div style={{ 
                    fontWeight: "bold", 
                    marginBottom: "0.5rem",
                    color: "#43a047"
                  }}>
                    You found:
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                    fontSize: "0.95rem"
                  }}>
                    {lootDrops.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem"
                      }}>
                        {item.imageUrl && (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            style={{ width: "20px", height: "20px" }}
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Battle controls - only show if player is alive */}
              {battleResult !== "lose" ? (
                <div style={{ 
                  display: "flex", 
                  gap: "1rem",
                  marginTop: "0.5rem"
                }}>
                  <button 
                    onClick={startBattle}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: "#43a047",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "#2d5a3f"}
                    onMouseOut={e => e.currentTarget.style.background = "#43a047"}
                  >
                    Battle Again
                  </button>
                  <button 
                    onClick={handleNextBattle}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: "#e53935",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "#c62828"}
                    onMouseOut={e => e.currentTarget.style.background = "#e53935"}
                  >
                    Exit
                  </button>
                </div>
              ) : (
                <div style={{
                  marginTop: "1rem",
                  fontSize: "1.2rem",
                  color: "#e53935",
                  textAlign: "center"
                }}>
                  Your dinosaur has fallen in battle...
                  <br />
                  <span style={{ fontSize: "2rem", marginTop: "0.5rem", display: "block" }}>
                    GG! 💀
                  </span>
                  <button
                    onClick={() => {
                      resetGameState();
                      setRegistered(false);
                      setDinoName("");
                      setDinoType(null);
                      setPlayerDino(null);
                      setPassword("");
                      setLoginPassword("");
                    }}
                    style={{
                      marginTop: "1.5rem",
                      padding: "0.8rem 1.5rem",
                      background: "#43a047",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "#2d5a3f"}
                    onMouseOut={e => e.currentTarget.style.background = "#43a047"}
                  >
                    Return to Main Menu
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Battle button */}
          {!isBattling && !battleResult && (
            <button onClick={startBattle} className="battle-button">
              Battle!
            </button>
          )}
          
          {isBattling && !battleResult && (
            <div style={{ marginTop: "1.5rem", color: "#234d20" }}>
              Battling...
            </div>
          )}

          {showShop && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#eaf7d0',
              border: '2px solid #234d20',
              borderRadius: '1rem',
              padding: '1rem',
              maxWidth: '80%',
              maxHeight: '80vh',
              overflow: 'auto',
              zIndex: 1000
            }}>
              <h3>Shop (🦴 {fossils} fossils)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {SHOP_ITEMS.map((item, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{item.description}</div>
                    <div style={{ color: '#43a047', margin: '0.5rem 0' }}>🦴 {item.cost}</div>
                    <button
                      onClick={() => purchaseShopItem(item)}
                      disabled={fossils < item.cost}
                      style={{
                        padding: '0.25rem 0.5rem',
                        background: fossils >= item.cost ? '#43a047' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: fossils >= item.cost ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Purchase
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowShop(false)}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
          )}

          {imageLoading && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}>
              <div style={{
                background: "#eaf7d0",
                padding: "2rem",
                borderRadius: "1rem",
                textAlign: "center",
                color: "#234d20"
              }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Loading Dinosaur...</div>
                <div style={{ fontSize: "2rem" }}>🦕</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// HP bar component
function HPBar({ hp, max }) {
  return (
    <div
      style={{
        background: "#b6d99a",
        border: "2px solid #234d20",
        borderRadius: "0.5rem",
        width: 90,
        height: 18,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#43a047",
          width: `${Math.max(0, (hp / max) * 100)}%`,
          height: "100%",
          transition: "width 0.3s",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          textAlign: "center",
          fontSize: "1rem",
          color: "#234d20",
          fontWeight: "bold",
          lineHeight: "18px",
          textShadow: "0 1px #fff8",
        }}
      >
        {hp} / {max}
      </span>
    </div>
  );
}

// Floating damage text
function FloatingDmg({ value }) {
  return (
    <span
      style={{
        position: "absolute",
        left: "50%",
        top: "-18px",
        transform: "translateX(-50%)",
        color: value < 0 ? "#e53935" : "#43a047",
        fontWeight: "bold",
        fontSize: "1.2rem",
        animation: "floatDmg 0.7s linear",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {value}
      <style>
        {`
        @keyframes floatDmg {
          0% { opacity: 1; top: -18px; }
          100% { opacity: 0; top: -38px; }
        }
        `}
      </style>
    </span>
  );
}

