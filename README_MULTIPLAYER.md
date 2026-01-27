# Multiplayer Setup Guide 🎮

## Quick Start Instructions 🚀
To start the multiplayer server, run:
```bash
npm run multiplayer-server
```

## Environment Variables 🌍
Set the following environment variables for the server configuration:
- `PORT`: The port on which the server will run.
- `WS_URL`: The WebSocket URL, e.g., `wss://your-domain.com/socket`.

## Gameplay Controls 🎹
- **Arrow Keys**: Move the game piece.
- **Spacebar**: Hard drop the game piece.

## Gameplay Mechanics ⚙️
- **120 BPM Beat System**: The game operates at a 120 beats per minute pace.
- **Scoring System**: You can score from **100 to 800 points** depending on the play with a **2x multiplier** if cleared on beat.
- **Garbage Line System**: Based on clears, the garbage line system sends **0-4 lines** to opposing players.

## Technical Architecture 🏗️
- **MultiplayerGame.tsx**: Manages the lobby features.
- **MultiplayerBattle.tsx**: Handles the game engine and logic using a WebSocket relay server.

## Production Deployment Options 🌐
You can deploy using the following services:
- **Railway**
- **Render**
- **Fly.io**
- **VPS**

Ensure to use the `wss://` protocol for secure WebSocket connections.

## Troubleshooting 🔧
If you experience issues with the WebSocket connection, check the following:
- Ensure that your server is running and accessible.
- Verify that the environment variables are correctly set.

## Monitoring 📊
Use the endpoints below for monitoring your server:
- **/health**: Check if the server is running.
- **/stats**: Get server statistics and performance metrics.

## Future Enhancements 💡
- Implement **Spectator Mode** for non-participants.
- Organize **Tournaments** for competitive play.