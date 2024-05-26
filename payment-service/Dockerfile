# Use an official Node runtime as a parent image with the latest version
FROM --platform=linux/amd64 node:20

# Set the working directory inside the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the application runs on (optional: use environment variable for flexibility)
EXPOSE ${PORT:-6000}

# Run the application
CMD ["node", "server.js"]
