#!/bin/bash

# Gully Sprite Sheet Assembly Script
# Assembles individual frames into the proper 8x9 sprite sheet format

set -e

echo "🎨 Gully Sprite Sheet Assembly"
echo "=============================="

# Configuration
GULLY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PETS_DIR="$GULLY_DIR/pets/gully"
GENERATED_DIR="$PETS_DIR/generated"
OUTPUT_FILE="$PETS_DIR/gully-spritesheet.png"

# Sprite sheet specifications
GRID_COLS=8
GRID_ROWS=9
CELL_WIDTH=192
CELL_HEIGHT=208
TOTAL_WIDTH=$((GRID_COLS * CELL_WIDTH))
TOTAL_HEIGHT=$((GRID_ROWS * CELL_HEIGHT))

echo "📍 Output: $OUTPUT_FILE"
echo "📐 Grid: ${GRID_COLS}x${GRID_ROWS}"
echo "📏 Cell size: ${CELL_WIDTH}x${CELL_HEIGHT}"
echo "📏 Total size: ${TOTAL_WIDTH}x${TOTAL_HEIGHT}"
echo ""

# Check if ImageMagick is available
if ! command -v magick &> /dev/null; then
    echo "❌ ImageMagick not found. Install with: brew install imagemagick"
    echo "⚠️  Alternative: Use manual assembly with your preferred image editor"
    exit 1
fi

echo "✅ ImageMagick found"
echo ""

# Check if generated directory exists
if [ ! -d "$GENERATED_DIR" ]; then
    echo "❌ Generated directory not found: $GENERATED_DIR"
    echo "📁 Run generate-gully.sh first to create frames"
    exit 1
fi

# Count expected frames
EXPECTED_FRAMES=$((GRID_COLS * 5))  # 5 states with 8 frames each
echo "🔍 Looking for $EXPECTED_FRAMES frames in $GENERATED_DIR"
echo ""

# Assembly instructions
echo "📋 Assembly Instructions:"
echo "1. Organize your generated frames in this structure:"
echo "   $GENERATED_DIR/"
echo "   ├── idle-1.png through idle-8.png"
echo "   ├── working-1.png through working-8.png"
echo "   ├── needs_input-1.png through needs_input-8.png"
echo "   ├── blocked-1.png through blocked-8.png"
echo "   └── success-1.png through success-8.png"
echo ""
echo "2. Run this script again after frames are organized"
echo ""
echo "3. For manual assembly:"
echo "   - Create ${TOTAL_WIDTH}x${TOTAL_HEIGHT} canvas"
echo "   - Fill with #00FF00 (chroma key green)"
echo "   - Place each frame in its grid position"
echo "   - Rows 5-8 should be fully transparent"
echo ""

# Check if frames exist
IDLE_FRAMES=$(ls "$GENERATED_DIR"/idle-*.png 2>/dev/null | wc -l)
WORKING_FRAMES=$(ls "$GENERATED_DIR"/working-*.png 2>/dev/null | wc -l)
NEEDS_INPUT_FRAMES=$(ls "$GENERATED_DIR"/needs_input-*.png 2>/dev/null | wc -l)
BLOCKED_FRAMES=$(ls "$GENERATED_DIR"/blocked-*.png 2>/dev/null | wc -l)
SUCCESS_FRAMES=$(ls "$GENERATED_DIR"/success-*.png 2>/dev/null | wc -l)

TOTAL_FOUND=$((IDLE_FRAMES + WORKING_FRAMES + NEEDS_INPUT_FRAMES + BLOCKED_FRAMES + SUCCESS_FRAMES))

echo "📊 Frame count:"
echo "   Idle: $IDLE_FRAMES/8"
echo "   Working: $WORKING_FRAMES/8"
echo "   Needs Input: $NEEDS_INPUT_FRAMES/8"
echo "   Blocked: $BLOCKED_FRAMES/8"
echo "   Success: $SUCCESS_FRAMES/8"
echo "   Total: $TOTAL_FOUND/$EXPECTED_FRAMES"
echo ""

if [ $TOTAL_FOUND -lt $EXPECTED_FRAMES ]; then
    echo "⚠️  Not all frames found. Generate missing frames first."
    echo "💡 Use the prompts in art-prompts.md to generate missing states"
    exit 1
fi

echo "✅ All frames found!"
echo ""

# Assemble using ImageMagick
echo "🔨 Assembling sprite sheet..."

# Create sprite sheet using montage
magick montage \
    -background '#00FF00' \
    -geometry ${CELL_WIDTH}x${CELL_HEIGHT}+0+0 \
    -tile ${GRID_COLS}x \
    "$GENERATED_DIR"/idle-*.png \
    "$GENERATED_DIR"/working-*.png \
    "$GENERATED_DIR"/needs_input-*.png \
    "$GENERATED_DIR"/blocked-*.png \
    "$GENERATED_DIR"/success-*.png \
    "$OUTPUT_FILE"

if [ -f "$OUTPUT_FILE" ]; then
    echo "✅ Sprite sheet created: $OUTPUT_FILE"
    
    # Verify dimensions
    ACTUAL_SIZE=$(magick identify -format "%wx%h" "$OUTPUT_FILE")
    EXPECTED_SIZE="${TOTAL_WIDTH}x${TOTAL_HEIGHT}"
    
    if [ "$ACTUAL_SIZE" = "$EXPECTED_SIZE" ]; then
        echo "✅ Dimensions correct: $ACTUAL_SIZE"
    else
        echo "⚠️  Dimension mismatch: $ACTUAL_SIZE (expected $EXPECTED_SIZE)"
    fi
    
    echo ""
    echo "🚀 Next step: Run ./scripts/validate-spritesheet.sh"
else
    echo "❌ Failed to create sprite sheet"
    exit 1
fi