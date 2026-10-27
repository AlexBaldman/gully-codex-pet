#!/bin/bash

# Gully Pet Installation Script
# Installs the pet to Codex with proper validation

set -e

echo "🐦 Gully Pet Installation"
echo "========================"

# Configuration
GULLY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PETS_DIR="$GULLY_DIR/pets/gully"
SPRITESHEET="$PETS_DIR/gully-spritesheet.png"
PET_CONFIG="$PETS_DIR/pet.json"
CODEX_PETS_DIR="$HOME/.codex/pets"
CODEX_GULLY_DIR="$CODEX_PETS_DIR/gully"

echo "📍 Source: $PETS_DIR"
echo "📍 Target: $CODEX_GULLY_DIR"
echo ""

# Check if source files exist
if [ ! -f "$SPRITESHEET" ]; then
    echo "❌ Sprite sheet not found: $SPRITESHEET"
    echo "📁 Run generate-gully.sh and assemble-spritesheet.sh first"
    exit 1
fi

if [ ! -f "$PET_CONFIG" ]; then
    echo "❌ pet.json not found: $PET_CONFIG"
    exit 1
fi

echo "✅ Source files found"
echo ""

# Validate sprite sheet first
echo "🔍 Running validation..."
if [ -f "$GULLY_DIR/scripts/validate-spritesheet.sh" ]; then
    "$GULLY_DIR/scripts/validate-spritesheet.sh"
    echo ""
else
    echo "⚠️  Validation script not found, skipping validation"
fi

# Create Codex pets directory
echo "📁 Creating Codex pets directory..."
mkdir -p "$CODEX_PETS_DIR"
echo "✅ Directory created: $CODEX_PETS_DIR"
echo ""

# Create Gully directory
echo "📁 Creating Gully directory..."
mkdir -p "$CODEX_GULLY_DIR"
echo "✅ Directory created: $CODEX_GULLY_DIR"
echo ""

# Copy files
echo "📋 Copying pet files..."
cp "$SPRITESHEET" "$CODEX_GULLY_DIR/"
echo "✅ Copied: gully-spritesheet.png"

cp "$PET_CONFIG" "$CODEX_GULLY_DIR/"
echo "✅ Copied: pet.json"

# Copy additional files if they exist
if [ -f "$PETS_DIR/art-prompts.md" ]; then
    cp "$PETS_DIR/art-prompts.md" "$CODEX_GULLY_DIR/"
    echo "✅ Copied: art-prompts.md"
fi

if [ -f "$PETS_DIR/GULLY_LORE.md" ]; then
    cp "$PETS_DIR/GULLY_LORE.md" "$CODEX_GULLY_DIR/"
    echo "✅ Copied: GULLY_LORE.md"
fi

echo ""
echo "✅ All files copied successfully"
echo ""

# Verify installation
echo "🔍 Verifying installation..."
if [ -f "$CODEX_GULLY_DIR/gully-spritesheet.png" ] && [ -f "$CODEX_GULLY_DIR/pet.json" ]; then
    echo "✅ Installation verified"
else
    echo "❌ Installation verification failed"
    exit 1
fi

echo ""
echo "🎉 Gully pet installed successfully!"
echo ""
echo "🚀 Next steps:"
echo "1. Open Codex desktop app"
echo "2. Go to Settings > Pets"
echo "3. Click 'Refresh' to detect new pets"
echo "4. Select 'Good Golly He's Gully'"
echo "5. Type /pet to wake your imaginary friend"
echo ""
echo "🐦 Welcome back, Gully!"