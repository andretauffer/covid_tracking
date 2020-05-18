# Use the official image as a parent image,  base image
FROM node:current-slim

# Set the working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy the file from your host to your current location
COPY package.json /app/package.json

# Run the command inside your image filesystem
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build

# Run the specified command within the container.
CMD [ "npm", "run", "start" ]