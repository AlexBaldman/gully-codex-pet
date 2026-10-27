#!/bin/bash

# Gully Pet Testing Script
# Tests the pet installation and basic functionality

set -e

echo "🧪 Gully Pet Testing"
echo "===================="

# Configuration
CODEX_GULLY_DIR="$HOME/.codex/pets/gully"
SPRITESHEET="$CODEX_GULLY_DIR/gully-spritesheet.png"
PET_CONFIG="$CODEX_GULLY_DIR/pet.json"

echo "📍 Testing installation at: $CODEX_GULLY_DIR"
echo ""

# Check if Codex pets directory exists
if [ ! -d "$CODEX_GULLY_DIR" ]; then
    echo "❌ Gully not installed in Codex"
    echo "📁 Run install-pet.sh first"
    exit 1
fi

echo "✅ Installation directory found"
echo ""

# Test 1: File existence
echo "📋 Test 1: File existence"
if [ -f "$SPRITESHEET" ]; then
    echo "✅ Sprite sheet exists"
else
    echo "❌ Sprite sheet missing"
    exit 1
fi

if [ -f "$PET_CONFIG" ]; then
    echo "✅ pet.json exists"
else
    echo "❌ pet.json missing"
    exit 1
fi

echo ""

# Test 2: File integrity
echo "📋 Test 2: File integrity"
SPRITESHEET_SIZE=$(stat -f%z "$SPRITESHEET" 2>/dev/null || stat -c%s "$SPRITESHEET" 2>/dev/null)
if [ $SPRITESHEET_SIZE -gt 1000 ]; then
    echo "✅ Sprite sheet has content (${SPRITESHEET_SIZE} bytes)"
else
    echo "❌ Sprite sheet seems too small or empty"
    exit 1
fi

# Test 3: JSON validity
echo "📋 Test 3: Configuration validity"
if python3 -m json.tool "$PET_CONFIG" > /dev/null 2>&1; then
    echo "✅ pet.json is valid JSON"
else
    echo "❌ pet.json contains invalid JSON"
    exit 1
fi

echo ""

# Test 4: Configuration content
echo "📋 Test 4: Configuration content"
if grep -q "Good Golly He's Gully" "$PET_CONFIG"; then
    echo "✅ Pet name in configuration"
else
    echo "⚠️  Pet name may not be in configuration"
fi

if grep -q "gully" "$PET_CONFIG"; then
    echo "✅ Pet ID in configuration"
else
    echo "⚠️  Pet ID may not be in configuration"
fi

echo ""

# Test 5: Codex app check
echo "📋 Test 5: Codex application"
if pgrep -f "Codex" > /dev/null; then
    echo "✅ Codex app appears to be running"
    echo "💡 Try refreshing pets in Codex Settings"
else
    echo "⚠️  Codex app may not be running"
    echo "💡 Start Codex and refresh pets in Settings"
fi

echo ""
echo "🎉 Basic tests passed!"
echo ""
echo "🚀 Manual testing required:"
echo "1. Open Codex desktop app"
echo "2. Go to Settings > Pets"
echo "3. Click Refresh"
echo "4. Select 'Good Golly He's Gully'"
echo "5. Type /pet to activate"
echo "6. Test different states by running Codex tasks"
echo ""
echo "🐦 If Gully appears and animates correctly, installation is successful!"