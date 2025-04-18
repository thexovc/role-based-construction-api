FROM node:20

WORKDIR /app
COPY prisma ./

COPY package.json .
RUN yarn


# Build the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate


RUN yarn build

# Expose port 3000 for the backend application
EXPOSE 3000

CMD ["yarn", "start:prod"]