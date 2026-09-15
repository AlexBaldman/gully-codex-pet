# Contributing to Gully Codex Pet

Thanks for your interest in contributing to Gully! This is a fun project, and contributions are welcome.

## How to Contribute

### Art & Animation

If you want to improve Gully's appearance or add new animations:

1. **Generate new art** using the prompts in `pets/gully/art-prompts.md`
2. **Test at small sizes** to ensure readability at 64-128px
3. **Maintain consistency** with existing character design
4. **Follow the sprite sheet format** (8x9 grid, 192×208px cells)
5. **Validate chroma-key background** (#00FF00)

### Personality & Reactions

To add new reactions or modify Gully's personality:

1. Edit `pets/gully/pet.json`
2. Add new reaction strings to the personality section
3. Maintain the beach bum/surfer slang style
4. Test with Codex to ensure they display correctly

### Documentation

Improvements to documentation are always welcome:

- Fix typos or unclear instructions
- Add troubleshooting steps
- Improve the art generation prompts
- Add screenshots or examples

## Development Workflow

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly** (install locally and verify it works)
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

## Guidelines

### Art Style

- Maintain pixel art aesthetic
- Use Jeopardish color palette
- Keep accessories readable at small sizes
- Ensure high contrast for dark UI
- Follow the established character design

### Code Style

- Keep JSON files valid and well-formatted
- Use clear, descriptive filenames
- Document any new features or changes
- Test before submitting

### Content Considerations

- Keep the beach bum personality consistent
- Avoid offensive or controversial content
- Consider content policy for smoking elements
- Maintain the laid-back, fun vibe

## Testing

Before submitting, ensure:

- [ ] Pet installs correctly in Codex
- [ ] All animation states work as expected
- [ ] Character is readable at 64-128px size
- [ ] Transitions between states are smooth
- [ ] Performance is acceptable (low CPU usage)
- [ ] Documentation is updated if needed

## Getting Help

- Open an issue for bugs or questions
- Use GitHub Discussions for general conversation
- Check existing issues for similar problems

## License

By contributing, you agree that your contributions will be licensed under the MIT License.