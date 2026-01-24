#!/usr/bin/env zsh

# Start Hugo server in the background
echo "Starting Hugo server..."
hugo server --bind 0.0.0.0 --baseURL "" &
HUGO_PID=$!

# Start ngrok in the background
echo "Starting ngrok on port 1313..."
ngrok http 1313 > /dev/null &
NGROK_PID=$!

# Wait for ngrok to start up
echo "Waiting for ngrok to initialize..."
sleep 3

# Get the ngrok URL from the API
echo "Fetching ngrok URL..."
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o 'https://[a-zA-Z0-9.-]*\.ngrok-free\.app' | head -n 1)

if [ -z "$NGROK_URL" ]; then
    echo "Error: Could not retrieve ngrok URL"
    kill $HUGO_PID 2>/dev/null
    kill $NGROK_PID 2>/dev/null
    exit 1
fi

echo "\nNgrok URL: $NGROK_URL"
echo "\nQR Code:\n"

# Generate and display QR code
qrencode -t ansiutf8 "$NGROK_URL"

echo "\nHugo server running (PID: $HUGO_PID)"
echo "Ngrok running (PID: $NGROK_PID)"
echo "Press Ctrl+C to stop..."

# Handle cleanup for both processes
trap "kill $HUGO_PID 2>/dev/null; kill $NGROK_PID 2>/dev/null; echo '\nStopped.'; exit" INT TERM

# Wait for either process
wait