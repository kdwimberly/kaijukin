# KAIJUKIN

**Raise something that becomes someone.**

Telegram-native digital creature game. V0 proves the core loop: Egg → incubation → hatch → Moki → Talk / Feed / Play / Explore → personality, memory, XP and KIN.

## Stack
- Next.js + TypeScript
- Vercel
- PostgreSQL / Prisma
- OpenAI for Moki conversation + memory orchestration
- Telegram Mini App integration (after browser vertical slice)

## Development
```bash
npm install
cp .env.example .env.local
npm run dev
```

The current vertical slice intentionally supports browser development before a Telegram bot exists. Use the DEV hatch shortcut to test the full flow without waiting four calendar days.

## Product rules
- Creature first. Game second. Crypto underneath.
- XP cannot be purchased.
- KIN is off-chain and non-tradable in V0.
- Server is authoritative for progression and economy.
- Moki: black blob body, swept crest, four integrated paws, **no legs**.
- Hidden nine-trait personality system.
- AI calls are reserved for conversation/memory; ordinary movement and autonomous behavior use the game state/behavior system.

## Next engineering milestones
1. Production persistence and authoritative action API
2. OpenAI conversation + memory extraction
3. Telegram initData verification/authentication
4. 3D Moki/cavern asset pipeline
5. Quests, inventory, social and commerce
