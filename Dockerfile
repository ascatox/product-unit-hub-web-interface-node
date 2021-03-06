FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm config set https-proxy http://ascatolo:As122133@proxy.eng.it:3128

RUN npm install

# Copy app source
COPY dist /usr/src/app/

# Remove dev dependencies
RUN npm prune --production

# Expose port and CMD
EXPOSE 3000
CMD [ "node", "server.js" ]