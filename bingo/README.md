# Bingo Game - Organizer Edition

A fully functional, animated bingo game designed for game organizers that runs locally in your browser.

## Features

- **Random Number Calling**: Click the ball or "NEXT NUMBER" button to call numbers randomly
- **Call History**: View the last 5 called numbers with colored balls
- **Master Board**: See all 75 numbers with called numbers highlighted
- **Game Statistics**: Track total calls, previous call, remaining numbers, and game status
- **Epic Animations**: 
  - Dramatic ball entrances with rotation and bounce effects
  - Particle effects around called numbers
  - Number explosions on the master board
  - Smooth GSAP-powered transitions
- **End Game Celebration**: Epic confetti explosion when ending a game
- **Organizer-Focused**: No player cards - designed for running the game

## How to Play

1. **Open the game**: Simply double-click `index.html` or open it in your web browser
2. **Start**: Click the "START GAME" button to begin
3. **Call Numbers**: 
   - Click the large bingo ball in the center, OR
   - Click the "NEXT NUMBER" button
4. **Track Progress**: Watch the master board highlight called numbers
5. **End Game**: Click the red "END GAME" button for an epic confetti celebration and automatic reset
6. **Reset**: Click "RESET BOARD" to clear all calls and start over without the celebration

## Customization

### Replace the Club Logo

1. Replace the `logo.svg` file with your club's logo SVG
2. The logo will automatically appear on the bingo ball (with transparency)
3. For best results, use a square SVG (200x200 or similar aspect ratio)

## Controls

- **START GAME** - Initialize a new game session
- **NEXT NUMBER** - Call the next random number (also click the ball)
- **RESET BOARD** - Clear all calls and restart
- **END GAME** - Trigger celebration confetti and reset everything

## Files

- `index.html` - Main game page
- `styles.css` - All styling and layout
- `game.js` - Game logic and state management
- `animations.js` - Enhanced GSAP animations with confetti (CSS fallback included)
- `logo.svg` - Club logo (replace with your own)

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended for best performance)
- Firefox
- Safari

Requires internet connection on first load to fetch GSAP and Canvas Confetti libraries from CDN.

## Credits

Built for local entertainment purposes only.
Animations powered by GSAP and Canvas Confetti.

