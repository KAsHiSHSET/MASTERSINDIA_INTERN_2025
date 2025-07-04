# FROM node:16.16.0
 
# # Set the working directory in the container
# WORKDIR /usr/src/app
 
# # Update and install NGINX, Python3, and pip
# RUN apt-get update && apt-get install -y \
#     nginx \
#     python3 \
#     python3-pip && \
#     rm -rf /var/lib/apt/lists/*
 
# # Install pm2 globally
# RUN npm install -g pm2
 
# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install
 
# # Copy all other app files
# COPY . .
 
# # Install Python dependencies for healthcheck
# RUN pip3 install requests boto3
 
# # Remove default NGINX site configs if they exist
# RUN rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default
 
# # Copy NGINX custom config
# COPY conf.d/vanilla.conf /etc/nginx/conf.d/
# COPY nginx.conf /etc/nginx/nginx.conf
 
# # Set the environment variable for the app port
# ENV PORT=2525
 
# # Expose required port
# EXPOSE 80
 
# # Copy custom entrypoint and healthcheck script
# COPY entrypoint.sh /entrypoint.sh
# # COPY healthcheck.py /usr/src/app/healthcheck.py
 
# # Make entrypoint executable
# RUN chmod +x /entrypoint.sh
 
# # Set entrypoint
# ENTRYPOINT ["/entrypoint.sh"]
 FROM node:16.16.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Install PM2
RUN npm install -g pm2

# Expose port (optional; depends on what port your app uses)
EXPOSE 3000

# Copy and make entrypoint executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Start with entrypoint
ENTRYPOINT ["/entrypoint.sh"]
