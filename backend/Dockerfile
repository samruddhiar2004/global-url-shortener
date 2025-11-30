# 1. Start with a "Base Image" (A computer that already has Node.js installed)
FROM node:18-alpine

# 2. Create a folder inside the container to store our app
WORKDIR /app

# 3. Copy our 'package.json' first (to install tools)
COPY package*.json ./

# 4. Install the tools (Express, Mongoose, etc.) inside the container
RUN npm install

# 5. Now copy the rest of our backend code into the container
COPY . .

# 6. Tell the container that our app listens on Port 5000
EXPOSE 5000

# 7. The command to start the app when the container turns on
CMD ["npm", "start"]