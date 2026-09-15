# Gully Seagull Character Art Prompts for Codex Image Generation

## Base Character Design Prompt

```
Create a pixel art seagull character for a desktop pet named "Good Golly He's Gully".

Base Design:
- White seagull body with grey wings (matching reference sprite anatomy)
- Orange beak and orange feet with black claws
- Dark sunglasses (black frames, slightly pushed down to show bloodshot eyes)
- Thick gold chain with illuminati pyramid eye pendant
- Holding a rum and coke in wing/hand
- Subtle joint with slow smoke wisps rising
- Slightly disheveled feathers for beach bum aesthetic
- Confident smirk expression

Style Requirements:
- Pixel art style, 64x64px base size
- Jeopardish color palette integration:
  * Primary blue: #123b8d
  * Secondary pink: #ff25b8
  * Accent cyan: #72e4d2
  * Highlight yellow: #fff66e
- Clean chroma-key green background (#00FF00) for easy removal
- High contrast for dark UI compatibility
- Clear silhouette readable at 64-128px size
- Consistent proportions across all animation frames

Personality:
- Beach bum, laid-back, confident
- Bloodshot eyes visible behind sunglasses
- Slightly disheveled but stylish
- Thugged-out beach aesthetic

Technical:
- Clear outlines, pixelated textures
- Subtle shading for depth
- Expressive but readable at small sizes
- Accessories should remain visible at pet scale
```

## State-Specific Variations

### 1. Idle State (Row 0)
```
Gully seagull in relaxed standing pose:
- Sunglasses fully on face
- Wings at sides, slightly relaxed
- Subtle smoke wisps rising from joint
- Occasionally taking sip from rum and coke
- Calm, content expression
- Feet planted firmly on ground
- Chain hanging naturally
```

### 2. Working State (Row 1)
```
Gully seagull in active working pose:
- Wings slightly raised as if ready to move
- More active smoking (more smoke wisps)
- Looking around more actively
- Slight forward lean
- Sunglasses still on but eyes more alert behind them
- Chain slightly bouncing with movement
- Drink held ready but not sipping
```

### 3. Needs Input State (Row 2)
```
Gully seagull waiting for user input:
- Leaning forward significantly
- Sunglasses pushed down on nose showing bloodshot eyes
- Joint held prominently in wing
- Direct gaze at viewer with questioning expression
- One wing slightly raised as if asking "what?"
- Chain pulled forward with leaning motion
- Drink held loosely
- Expression: expectant, waiting
```

### 4. Blocked State (Row 3)
```
Gully seagull in frustrated blocked state:
- Wings drooped down
- Joint clearly gone out (no smoke, ash on end)
- Disgruntled, annoyed expression
- Sunglasses askew or slightly off
- Chain hanging loosely, disheveled
- Drink held loosely or set down
- Head tilted slightly down
- Feathers more ruffled than usual
- Expression: frustrated, defeated
```

### 5. Success State (Row 4)
```
Gully seagull in celebratory success pose:
- Wings spread wide in triumph
- Rum and coke raised in toast
- Sunglasses pushed up or off for celebration
- Big smile/smirk
- Joint held loosely or celebratory puff
- Chain bouncing with energy
- Standing tall, chest puffed out
- Expression: triumphant, proud
- Maybe one foot raised in celebration
```

## Animation Frames (8 per state)

For each state, generate 8 frames showing subtle variations:
- Frame 1-2: Base pose
- Frame 3-4: Slight movement (breathing, smoking, drinking)
- Frame 5-6: More expressive variation
- Frame 7-8: Return to base or slight pose shift

## Technical Specifications for Sprite Sheet

- **Grid:** 8 columns × 9 rows
- **Cell size:** 192×208 pixels each
- **Total size:** 1536×1872 pixels
- **Background:** Chroma key green (#00FF00)
- **Transparency:** Unused cells should be fully transparent
- **Consistency:** Same character proportions across all frames
- **Alignment:** Character centered in each cell
- **Detail level:** High enough to read at 64-128px, but optimized for pet display

## Quality Checklist

- [ ] Sunglasses visible and readable at small size
- [ ] Gold chain doesn't become muddy at pet scale
- [ ] Joint and smoke wisps are subtle but visible
- [ ] Rum and coke glass is recognizable
- [ ] Character silhouette remains clear
- [ ] Color palette matches Jeopardish aesthetic
- [ ] Pixel art style consistent with reference sprites
- [ ] Chroma key background removes cleanly
- [ ] All 5 states are visually distinct
- [ ] Animation frames transition smoothly
- [ ] High contrast for dark UI compatibility

## Generation Tips

1. **Start with base character:** Generate the idle state first to establish the base design
2. **Reference anatomy:** Use the provided seagull sprites for wing structure, head shape, and proportions
3. **Test at small size:** Regularly check how details read at 64px and 128px during generation
4. **Maintain consistency:** Keep the same face, body proportions, and accessory positions across states
5. **Color harmony:** Ensure the Jeopardish colors complement rather than clash with the natural seagull colors
6. **Subtle smoking:** Make the joint element subtle enough to avoid content policy issues while maintaining character
7. **Expressive eyes:** The bloodshot eyes behind sunglasses should be visible when pushed down

## Alternative Content Policy Approach

If the joint element triggers content filters, consider these alternatives:
- Replace with cigarette (less controversial)
- Make it just smoke wisps without visible joint
- Focus on the smoke effect rather than the smoking device
- Use "mysterious haze" instead of explicit smoking

## Installation Commands

Once art is generated and validated:

```bash
# Copy to Codex pets directory
cp gully-spritesheet.png ~/.codex/pets/gully/
cp pet.json ~/.codex/pets/gully/

# In Codex desktop app:
# 1. Open Settings > Pets
# 2. Click Refresh
# 3. Select "Good Golly He's Gully"
# 4. Test with /pet command
```