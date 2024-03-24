ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app

FROM base as deps
COPY package.json .
COPY package-lock.json .

RUN npm ci

FROM deps as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY package.json next.config.mjs tsconfig.json ./
RUN npm run build

FROM base as final

ENV NODE_ENV production
ENV NEXTAUTH_SECRET PxfaVCdu3w0aW2OIqMVuJfW/2a6OTTo3QfuB75T2ukA=
ENV NEXTAUTH_URL http://localhost:3000

USER node

COPY package.json .

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/.next ./.next
COPY --from=build /app/next.config.mjs ./

EXPOSE 3000

CMD npm start
