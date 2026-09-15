# Gully Seagull Pet - Installation & Testing Guide

## Quick Start

### Step 1: Generate Character Art in Codex

Open a new chat in Codex and use the following prompt to generate the base character:

```
Create a pixel art seagull character for a desktop pet named "Good Golly He's Gully".

Base Design:
- White seagull body with grey wings, orange beak and feet
- Dark sunglasses (black frames, slightly pushed down to show bloodshot eyes)
- Thick gold chain with illuminati pyramid eye pendant
- Holding a rum and coke in wing/hand
- Subtle joint with slow smoke wisps rising
- Slightly disheveled feathers for beach bum aesthetic
- Confident smirk expression

Style Requirements:
- Pixel art style, 64x64px base size
- Jeopardish color palette: primary blue #123b8d, secondary pink #ff25b8, accent cyan #72e4d2, highlight yellow #fff66e
- Clean chroma-key green background (#00FF00) for easy removal
- High contrast for dark UI compatibility
- Clear silhouette readable at 64-128px size
- Consistent proportions across all animation frames

Personality: Beach bum, laid-back, confident, bloodshot eyes behind sunglasses, thugged-out beach aesthetic

Generate me the base idle state character first, then I'll ask for the other animation states.
```

### Step 2: Generate Animation States

Once you have the base character, ask for each animation state:

**Idle State:**
```
Generate 8 frames of Gully in idle state: relaxed standing pose, sunglasses on, subtle smoke wisps, occasionally sipping drink, calm expression. Use the same character design as before, with subtle variations between frames.
```

**Working State:**
```
Generate 8 frames of Gully in working state: wings slightly raised, more active smoking, looking around faster, slight forward lean, more alert. Same character design, more dynamic pose.
```

**Needs Input State:**
```
Generate 8 frames of Gully in needs input state: leaning forward significantly, sunglasses pushed down showing bloodshot eyes, joint held prominently, direct questioning gaze, expectant expression.
```

**Blocked State:**
```
Generate 8 frames of Gully in blocked state: wings drooped, joint gone out, disgruntled expression, sunglasses askew, chain hanging loose, frustrated appearance.
```

**Success State:**
```
Generate 8 frames of Gully in success state: wings spread wide in triumph, rum and coke raised in toast, big smile, celebratory pose, triumphant expression.
```

### Step 3: Create Sprite Sheet

After generating all states, ask Codex to assemble them into a sprite sheet:

```
Using the hatch-pet skill, assemble all the Gully animation frames into a single 8x9 sprite sheet:
- 8 columns (8 frames per state)
- 9 rows (5 states + 4 unused rows)
- Each cell should be 192x208 pixels
- Total size: 1536x1872 pixels
- Use chroma-key green (#00FF00) background
- Make unused cells fully transparent
- Ensure character is centered in each cell
- Row 0: idle state frames 1-8
- Row 1: working state frames 1-8  
- Row 2: needs input state frames 1-8
- Row 3: blocked state frames 1-8
- Row 4: success state frames 1-8
- Rows 5-8: unused (transparent)

Validate the sprite sheet and generate a contact sheet for review.
```

### Step 4: Install Pet

Once the sprite sheet is generated and validated:

```bash
# The sprite sheet should be automatically saved by hatch-pet
# If not, manually copy it to the pets directory
cp gully-spritesheet.png ~/.codex/pets/gully/
cp pet.json ~/.codex/pets/gully/
```

### Step 5: Activate in Codex

1. Open Codex desktop app
2. Go to Settings > Pets
3. Click "Refresh" to detect new pets
4. Select "Good Golly He's Gully" from the custom pets list
5. Click "Wake Pet" or use the `/pet` command

## Testing

### Basic Functionality Test

1. **Wake Pet:** Type `/pet` to wake Gully and verify he appears
2. **Idle State:** Let Gully sit idle and observe the animation
3. **Working State:** Start a long-running task and watch for the working animation
4. **Needs Input:** Create a task that requires approval and check the needs input state
5. **Blocked:** Intentionally cause an error to see the blocked state
6. **Success:** Complete a task successfully to see the celebration

### Visual Quality Test

- [ ] Character is recognizable at pet size (64-128px)
- [ ] Sunglasses are visible and readable
- [ ] Gold chain doesn't become muddy at small size
- [ ] Smoke wisps are subtle but visible
- [ ] Rum and coke glass is recognizable
- [ ] All 5 states are visually distinct
- [ ] Transitions between states are smooth
- [ ] Silhouette remains clear on dark backgrounds
- [ ] Chroma-key background removed cleanly

### Performance Test

- [ ] Pet doesn't cause excessive CPU usage
- [ ] Animations are smooth (not stuttering)
- [ ] Pet responds quickly to state changes
- [ ] Reduced motion settings are respected (if applicable)

### Integration Test (Optional JeoPARODY)

If you want to test the JeoPARODY host integration:

1. Copy the individual state images to `assets/images/gully/` in the JeoPARODY project
2. Test switching to Gully as a host personality
3. Verify the personality reactions work correctly
4. Check that the mood system triggers appropriate image changes

## Troubleshooting

### Pet doesn't appear
- Make sure the sprite sheet is in the correct directory: `~/.codex/pets/gully/`
- Check that the pet.json file is present and valid
- Try refreshing the pets list in Settings
- Restart Codex if necessary

### Animations look wrong
- Verify the sprite sheet dimensions (1536x1872px)
- Check that each cell is 192x208px
- Ensure the chroma-key background is #00FF00
- Validate that unused cells are fully transparent
- Regenerate the sprite sheet if needed

### Character not recognizable at small size
- Increase the contrast in the character design
- Make accessories (sunglasses, chain) larger/more prominent
- Simplify details that don't read at small sizes
- Test the design at various sizes during generation

### Content policy issues
- If the joint element triggers filters, try these alternatives:
  - Replace with cigarette
  - Make it just smoke wisps without visible joint
  - Focus on the smoke effect rather than the smoking device
  - Use "mysterious haze" instead of explicit smoking

## Advanced Customization

### Adjusting Animation Speed
Edit `~/.codex/pets/gully/pet.json`:
```json
"states": {
  "idle": { "row": 0, "frames": 8, "speed": 200 }, // Increase for slower animation
  ...
}
```

### Adding Custom Reactions
For JeoPARODY integration, edit `src/services/HostSystem.js`:
```javascript
gully: {
  personality: {
    reactions: {
      correct: ['Your custom reaction here!'],
      // Add more custom reactions
    }
  }
}
```

### Changing Color Palette
Update the palette in `pet.json`:
```json
"palette": {
  "primary": "#your-color",
  // Customize other colors
}
```

## Backup & Sharing

### Backup Your Pet
```bash
# Create a backup of your custom pet
tar -czf gully-pet-backup.tar.gz ~/.codex/pets/gully/
```

### Share with Others
```bash
# Package for sharing
tar -czf gully-pet-shared.tar.gz ~/.codex/pets/gully/
# Share the tar.gz file with others
# They can extract it to their ~/.codex/pets/ directory
```

## Next Steps

Once Gully is working as a Codex pet:

1. **Optional:** Generate higher-resolution versions for JeoPARODY host integration
2. **Optional:** Create additional animation states or variations
3. **Optional:** Add custom sound effects for different states
4. **Optional:** Create additional pets using the same workflow

## Support

If you encounter issues:
- Check the Codex documentation for the latest pet system requirements
- Review the hatch-pet skill documentation
- Test with a simpler character design first to isolate issues
- Ensure you're using the latest version of Codex and the hatch-pet skill

## Character Attribution

"Good Golly He's Gully" is inspired by the Really Long Beach seagull character and the Jeopardish project aesthetic. The character combines beach bum culture with pixel art gaming aesthetics.