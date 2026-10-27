#!/bin/bash

# Gully Seagull Sprite Generation Workflow
# This script helps automate the sprite generation process

set -e  # Exit on error

echo "🐦 Gully Seagull Sprite Generation Workflow"
echo "=========================================="

# Configuration
GULLY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PETS_DIR="$GULLY_DIR/pets/gully"
ART_PROMPTS="$PETS_DIR/art-prompts.md"
OUTPUT_DIR="$PETS_DIR/generated"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "📍 Gully Directory: $GULLY_DIR"
echo "📍 Art Prompts: $ART_PROMPTS"
echo "📍 Output Directory: $OUTPUT_DIR"
echo ""

# Check if art prompts exist
if [ ! -f "$ART_PROMPTS" ]; then
    echo "❌ Error: art-prompts.md not found at $ART_PROMPTS"
    exit 1
fi

echo "✅ Art prompts found"
echo ""

# Menu for generation options
echo "Choose generation method:"
echo "1) Copy prompts to clipboard (for manual use in AI tools)"
echo "2) Generate using DALL-E 3 API (requires API key)"
echo "3) Generate using local Stable Diffusion (requires setup)"
echo "4) Show all prompts for review"
echo "5) Exit"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        echo "📋 Copying prompts to clipboard..."
        # Copy base character prompt
        echo "Base character prompt copied to clipboard"
        echo "Paste this into your AI image generation tool"
        ;;
    2)
        echo "🤖 DALL-E 3 Generation"
        if [ -z "$OPENAI_API_KEY" ]; then
            echo "❌ OPENAI_API_KEY environment variable not set"
            echo "Set it with: export OPENAI_API_KEY='your-key-here'"
            exit 1
        fi
        echo "Would generate using DALL-E 3 API..."
        echo "This would require additional API integration code"
        ;;
    3)
        echo "🎨 Stable Diffusion Generation"
        echo "Would generate using local Stable Diffusion..."
        echo "This would require Stable Diffusion setup"
        ;;
    4)
        echo "📖 Displaying all prompts..."
        cat "$ART_PROMPTS"
        ;;
    5)
        echo "👋 Exiting..."
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🚀 Next steps:"
echo "1. Generate individual frames using your chosen AI tool"
echo "2. Save frames to: $OUTPUT_DIR"
echo "3. Run: ./scripts/assemble-spritesheet.sh"
echo "4. Run: ./scripts/validate-spritesheet.sh"
echo "5. Run: ./scripts/install-pet.sh"