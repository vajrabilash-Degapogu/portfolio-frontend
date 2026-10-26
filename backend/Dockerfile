FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY server.js ./
RUN mkdir -p /app/data /app/uploads
ENV NODE_ENV=production
EXPOSE 4000
CMD ["npm","start"]
