This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## CMS Setup & Instructions

This project uses Prisma with Supabase Postgres for CMS content and contact submissions.

### Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup Environment Variables:**
   Create a `.env` file in the root with:
   ```env
   # Prefer the Supavisor session pooler URL from Supabase Dashboard > Connect.
   DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres"

   # Use the direct database URL only from IPv6-capable environments or when the Supabase IPv4 add-on is enabled.
   DIRECT_URL="postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres"

   ADMIN_EMAIL="admin@silkbytex.com"
   ADMIN_PASSWORD="change-this-password"
   AUTH_SECRET="your-super-secret-key-for-jwt-auth"
   ```
3. **Database Migration:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```

### Admin Panel
Go to `/admin` to access the CMS Dashboard. It uses lightweight JWT auth.

### Next Steps (Frontend integration):
You can now replace hardcoded data in `src/app/page.tsx`, `src/app/work/page.tsx`, etc., with:
```tsx
import prisma from "@/lib/prisma"

// In a server component
const projects = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' }})
```
