#!/bin/bash
 
# Trap SIGTERM and SIGINT and forward them to both nginx and pm2
trap 'echo "Shutting down..."; nginx -s quit; pm2 kill; exit 0' SIGTERM SIGINT
 
# Start 15 instances on unique ports using PM2
for i in {0..24}; do
  port=$((2525 + i))
  pm2 start app.js --name "app$((i+1))-$port" -- "$port"
  sleep 2  # Helps reduce CPU spike
done
 
# Save PM2 state
pm2 save
 
# Start PM2 in background
# pm2-runtime &
 
# 🟢 Start health check in background loop
# while true; do
#   python3 /usr/src/app/healthcheck.py
#   sleep 60
# done &
 
# Start NGINX in foreground (this keeps the container alive)
# nginx -g 'daemon off;'
