# Parancsok, kódrészletek

Ticket resource generálása:

```bash
nest g res tickets
```

Prisma és nestjs-prisma telepítése:

```bash
npm i -D prisma
npm i nestjs-prisma
```

Prisma init:

```bash
npx prisma init
```

Séma változtatás után:

```bash
npx prisma migrate dev
```

Első séma definiálása után:

```bash
npm i @prisma/client
```

Prisma schémában a datasource URL: `"postgresql://postgres:postgres@localhost:5432/ticketing?schema=public"`
