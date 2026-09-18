#!/usr/bin/env bash
set -euo pipefail

COMPOSE="docker compose"

# Fail early with a clear message if the shared Traefik network is missing.
if ! docker network inspect web >/dev/null 2>&1; then
  echo "✗ External Docker network 'web' not found."
  echo "  Create it (it is the network Traefik routes on):"
  echo "    docker network create web"
  exit 1
fi


echo "╔══════════════════════════════════════════╗"
echo "║        Sudoku — Deploy Script           ║"
echo "╚══════════════════════════════════════════╝"
echo ""

echo "→ Pulling latest changes..."
git pull

echo ""
echo "→ Building and starting container..."
$COMPOSE up -d --build

echo ""
echo "→ Waiting for the app to be healthy..."
timeout=90
elapsed=0
until $COMPOSE exec -T sudoku wget -q --spider http://localhost:3000 2>/dev/null; do
  sleep 2
  elapsed=$((elapsed + 2))
  if [ $elapsed -ge $timeout ]; then
    echo "  ✗ App did not become healthy within ${timeout}s"
    echo "  Check logs: $COMPOSE logs --tail 30"
    exit 1
  fi
done
echo "  ✓ App is healthy"

echo ""
echo "→ Cleaning up dangling images..."
docker image prune -f | tail -1
echo "→ Cleaning up build cache (keeping 2GB)..."
docker builder prune -f --keep-storage=2GB | tail -1

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║        Deploy Complete!                 ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "  Services:"
$COMPOSE ps --format "table {{.Name}}\t{{.Status}}"
echo ""
