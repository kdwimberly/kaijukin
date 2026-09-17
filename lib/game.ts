export const GAME_CONFIG = {
  incubation: { qualifyingCheckins: 4, hatchRewardKin: 500 },
  actions: {
    talk: { xp: 15, kin: 20 },
    feed: { xp: 10, kin: 10 },
    play: { xp: 20, kin: 20 },
    explore: { xp: 25, kin: 35 },
  },
  diminishingReturns: [
    { through: 5, multiplier: 1 },
    { through: 10, multiplier: .6 },
    { through: 15, multiplier: .25 },
    { through: Infinity, multiplier: .05 },
  ],
  traits: ['curiosity','affection','boldness','playfulness','patience','empathy','independence','mischief','discipline'] as const,
};

export type Trait = typeof GAME_CONFIG.traits[number];

export function xpForNextLevel(level:number){ return Math.round(100 * Math.pow(level, 1.35)); }

export function initialTraits(seed = Math.random){
  return Object.fromEntries(GAME_CONFIG.traits.map(t => [t, Math.floor(45 + seed() * 11)])) as Record<Trait, number>;
}
