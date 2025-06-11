# Use the official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
