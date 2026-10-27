# Gully - "Good Golly He's Gully" Seagull Codex Pet

> A thugged-out beach bum seagull companion for your Codex workspace

![Gully Pet Preview](https://img.shields.io/badge/pet-pixel%20art-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Codex Compatible](https://img.shields.io/badge/codex-compatible-orange)

Gully is a custom animated desktop pet for OpenAI Codex featuring a laid-back beach bum seagull with sunglasses, gold chain, and a relaxed attitude. He's the perfect companion for long coding sessions, bringing beach vibes to your workspace.

## 🐦 Character

**"Good Golly He's Gully"** is a thugged-out beach bum seagull who:
- Always wears dark sunglasses (occasionally peeks over with bloodshot eyes)
- Sports a thick gold chain with illuminati pyramid eye pendant
- Holds a rum and coke in one wing
- Slowly smokes a joint (subtle, goes out periodically)
- Has a confident smirk and laid-back beach personality
- Embodies the "Really Long Beach" seagull aesthetic

## 🎨 Features

- **5 Animation States**: Idle, Working, Needs Input, Blocked, Success
- **Pixel Art Style**: 64x64px base with Jeopardish color palette
- **Reactive**: Responds to Codex agent activity in real-time
- **Beach Vibes**: Laid-back personality with surf slang and casual reactions
- **High Contrast**: Optimized for dark UI compatibility

## 📦 Installation

### Prerequisites

- **ImageMagick** (for sprite assembly): `brew install imagemagick`
- **Codex desktop app** (for pet usage)
- **AI image generation access** (DALL-E, Midjourney, or similar)

### Quick Start Workflow

```bash
# Clone this repository
git clone https://github.com/AlexBaldman/gully-codex-pet.git
cd gully-codex-pet

# Run the complete workflow (if you have the sprite sheet ready)
npm run full-workflow

# Or step-by-step:
npm run generate    # Get prompts for AI generation
npm run assemble    # Assemble frames into sprite sheet
npm run validate    # Validate technical requirements
npm run install-pet # Install to Codex
npm run test        # Test the installation
```

### Manual Install (If You Have the Sprite Sheet)

```bash
# Copy to Codex pets directory
mkdir -p ~/.codex/pets
cp -R pets/gully ~/.codex/pets/

# Open Codex, go to Settings > Pets, click Refresh, and select Gully
```

### Activate in Codex

Once installed:
1. Open Codex desktop app
2. Go to Settings > Pets  
3. Click "Refresh" to detect new pets
4. Select "Good Golly He's Gully"
5. Type `/pet` to wake your companion

## 🎯 Animation States

| State | Description | Trigger |
|-------|-------------|---------|
| **Idle** | Relaxed standing, sunglasses on, subtle smoking | No active tasks |
| **Working** | Dynamic pose, active smoking, alert | Agent running tasks |
| **Needs Input** | Leaning forward, sunglasses down, questioning | Waiting for user approval |
| **Blocked** | Frustrated, drooped wings, joint out | Error or failure |
| **Success** | Celebratory, wings spread, toast | Task completed successfully |

## 🎨 Art Style

- **Base**: Pixel art matching Jeopardish aesthetic
- **Size**: 64x64px base, scalable to 128px
- **Palette**: Jeopardish colors (blue #123b8d, pink #ff25b8, cyan #72e4d2, yellow #fff66e)
- **Format**: 8x9 sprite sheet (1536x1872px total)
- **Background**: Chroma-key green (#00FF00)

## 🎭 Personality

Gully responds with beach bum slang and laid-back reactions:
- **Correct answers**: "Right on, dude!", "That's righteous!"
- **Incorrect**: "Bummer, man.", "That's bogus, dude."  
- **Streaks**: "You're on fire, like my joint!", "Keep riding that wave!"
- **Timeouts**: "Time's up, bro. The answer was..."

## 🔧 Development

### Quick Start Workflow

```bash
# 1. Generate character art using AI tools
npm run generate

# 2. Assemble individual frames into sprite sheet
npm run assemble

# 3. Validate the sprite sheet meets requirements
npm run validate

# 4. Install pet to Codex
npm run install-pet

# 5. Test the installation
npm run test

# Or run the complete workflow:
npm run full-workflow
```

### Character Art Generation

See `pets/gully/art-prompts.md` for detailed prompts to generate Gully's character art using AI image generation tools. The prompts are optimized for:
- **DALL-E 3** - Maximum detail and character accuracy
- **Midjourney** - Artistic style and aesthetic control
- **Stable Diffusion** - Technical precision and local generation

### File Structure

```
gully-codex-pet/
├── pets/
│   └── gully/
│       ├── pet.json              # Pet configuration
│       ├── gully-spritesheet.png # Animation sprite sheet (to be generated)
│       ├── art-prompts.md        # Enhanced generation prompts with full character vision
│       ├── GULLY_LORE.md         # Complete character backstory and narrative
│       ├── INSTALLATION_GUIDE.md # Detailed setup instructions
│       └── IMPLEMENTATION_SUMMARY.md # Technical overview
├── scripts/
│   ├── generate-gully.sh        # Generation workflow helper
│   ├── assemble-spritesheet.sh  # Sprite sheet assembly automation
│   ├── validate-spritesheet.sh  # Technical validation
│   ├── install-pet.sh           # Installation automation
│   └── test-pet.sh              # Installation testing
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

### Technical Specs

- **Sprite Sheet**: 8 columns × 9 rows, 192×208px cells
- **Animation Speed**: Configurable per state (150-400ms)
- **Performance**: Optimized for low CPU usage
- **Accessibility**: Respects reduced motion settings

## 🤝 Integration

### JeoPARODY Integration

Gully is also available as a host personality in JeoPARODY:
- See `jeoparody-integration.md` for setup
- Uses same character design with higher resolution
- Supports game-specific reactions and mood system

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Attribution

- **Character Design**: Inspired by Really Long Beach seagull and Jeopardish aesthetic
- **Art Style**: Pixel art based on provided seagull sprite references
- **Pet System**: Built for OpenAI Codex using hatch-pet skill format

## 🐛 Troubleshooting

**Pet doesn't appear?**
- Ensure files are in `~/.codex/pets/gully/`
- Refresh pets in Codex Settings
- Restart Codex if needed

**Animations look wrong?**
- Verify sprite sheet dimensions (1536×1872px)
- Check chroma-key background (#00FF00)
- Validate unused cells are transparent

**Content policy issues?**
- The joint element may trigger filters - see art-prompts.md for alternatives

## 🚀 Roadmap

- [ ] Add additional animation states
- [ ] Create sound effects for different states  
- [ ] Develop Gully variants (different beach accessories)
- [ ] Add seasonal accessories (sunglasses, winter gear)
- [ ] Community submission to Petdex gallery

## 📞 Support

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Community**: Join the Petdex Discord for pet-related chat

---

Made with 🏖️ beach vibes and pixel art love