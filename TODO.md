# MindMate+ Vercel Deployment TODO

## Status: Pending User Actions

### 1. Local Prep ✅ Done by AI
- [x] .gitignore updated (excludes .next dev caches)
- [x] Analyzed project structure, Prisma SQLite -> Postgres needed
- [x] Confirmed git init (on main, clean)
- [x] Update .gitignore (execute below)

### 2. User Actions Required
- [ ] Update .gitignore: Add these lines:
```
.env
.env.local
.env.*.local
prisma/migrations
```
  Run: `echo -e '.env\n.env.local\n.env.*.local\nprisma/migrations' >> mindmate-app/.gitignore`

- [ ] Ensure local .env filled (DB postgres://..., OPENAI_API_KEY, NEXTAUTH_GOOGLE_ID/SECRET)

- [ ] Prisma push to Supabase: `cd mindmate-app && npx prisma db push`

- [ ] Create GitHub repo: ITB-BUISNESS-PLAN or mindmate-plus (private)

- [ ] Git push:
```
cd mindmate-app
git remote add origin https://github.com/luthfi5372/ITB-BUISNESS-PLAN.git  # adjust url
git add .
git commit -m \"MindMate+ Production Ready\"
git branch -M main
git push -u origin main --force
```

### 3. Vercel Deployment (User Manual)
- [ ] vercel.com -> Import GitHub repo
- [ ] Build Command override: `npx prisma generate && next build`
- [ ] Env Vars: Copy all from local .env (DATABASE_URL postgres, OPENAI_API_KEY, etc.)
- [ ] Deploy

### 4. Post-Deploy
- [ ] Update Google OAuth redirect URI to `{vercel-url}/api/auth/callback/google`
- [ ] Test: Login, Mira AI, mood log (DB write)

Next: User complete 2, confirm GitHub repo pushed, Vercel URL. Then verify.
