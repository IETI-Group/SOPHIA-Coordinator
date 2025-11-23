FROM node:lts-alpine AS base

RUN npm install -g pnpm@10.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:lts-alpine AS production

RUN npm install -g pnpm@10.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=base /app/dist ./dist

EXPOSE 80

ENV NODE_ENV=production
ENV PORT=80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/api/v1/health || exit 1

CMD ["node", "dist/index.js"]



