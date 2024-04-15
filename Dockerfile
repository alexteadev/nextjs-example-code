FROM node:20.12-alpine
WORKDIR /opt/app
COPY package*.json /opt/app/
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
CMD ["npm", "start"]