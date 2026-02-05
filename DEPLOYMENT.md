# Unfiltered - Deployment Guide

## Pre-Deployment Checklist

### ✅ Completed
- [x] All pages have comprehensive dark mode support
- [x] Shared LogoMark component extracted and used across all pages
- [x] ThemeToggle added to all page headers
- [x] Search debouncing implemented with `useDeferredValue`
- [x] Export data functionality (JSON, Markdown, PDF placeholders)
- [x] Accessibility improvements (ARIA labels, semantic HTML)
- [x] No console.log statements in production code
- [x] No hardcoded URLs or localhost references
- [x] SEO metadata and Open Graph tags configured
- [x] Viewport configuration for mobile optimization
- [x] Next.js config optimized for production

### 🔄 Before First Deploy
- [ ] Replace placeholder data with database integration (if needed)
- [ ] Set up authentication system (if user accounts are required)
- [ ] Configure environment variables on hosting platform
- [ ] Test build locally with `npm run build`
- [ ] Fix any TypeScript errors (ignoreBuildErrors is now false)

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js and provides zero-config deployment.

#### Steps:
1. Push your code to GitHub, GitLab, or Bitbucket
2. Visit [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

#### Environment Variables (if needed):
- Go to Project Settings → Environment Variables
- Add any required variables (currently none are used)

#### Custom Domain:
- Go to Project Settings → Domains
- Add your custom domain and follow DNS configuration steps

### Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Railway / Render
```bash
# Both support automatic Next.js detection
# Connect your Git repository and deploy
```

#### Self-Hosted / VPS
```bash
# Build the app
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "unfiltered" -- start
```

#### Docker
Uncomment `output: 'standalone'` in `next.config.mjs`, then:

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Performance Optimizations

### Already Implemented
- ✅ React Strict Mode enabled
- ✅ Compression enabled
- ✅ Powered-by header removed
- ✅ Image optimization enabled (for production)
- ✅ Font optimization with next/font/google
- ✅ CSS optimization with Tailwind JIT
- ✅ Component code splitting (automatic with Next.js)
- ✅ `useMemo` and `useCallback` for expensive operations
- ✅ `useDeferredValue` for search debouncing

### Recommended Next Steps
- Consider adding a CDN for static assets
- Implement ISR (Incremental Static Regeneration) if content updates frequently
- Add analytics (Vercel Analytics, Google Analytics, etc.)
- Set up error tracking (Sentry, LogRocket, etc.)
- Implement real-time database (when ready)

## Database Integration (Future)

The app currently uses mock/hardcoded data. To add database persistence:

1. **Choose a database provider:**
   - Vercel Postgres (recommended for Vercel deploys)
   - Supabase (PostgreSQL with built-in auth)
   - PlanetScale (MySQL)
   - MongoDB Atlas
   - Neon (serverless Postgres)

2. **Install ORM:**
   ```bash
   # Prisma (recommended)
   npm install prisma @prisma/client
   npx prisma init
   
   # Or Drizzle
   npm install drizzle-orm
   ```

3. **Replace mock data:**
   - Update `app/page.tsx` entries state with database queries
   - Add Server Actions for mutations
   - Implement optimistic updates for better UX

## Environment Variables

Currently, the app doesn't require any environment variables. If you add database or authentication:

```env
# Example for future database integration
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://yourdomain.com"
```

## Monitoring & Analytics

### Recommended Tools
- **Vercel Analytics** - Built-in web vitals and page views
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Google Analytics** - User behavior tracking

## Security Considerations

### Already Implemented
- ✅ No inline scripts (except FOUC prevention)
- ✅ Secure headers via Next.js defaults
- ✅ HTTPS enforced (via hosting platform)
- ✅ No exposed API keys or secrets

### When Adding Authentication
- Use secure, HTTP-only cookies
- Implement CSRF protection
- Hash passwords with bcrypt (cost factor ≥ 12)
- Add rate limiting to API routes
- Implement Row Level Security (if using Supabase)

## Known Limitations

1. **Data Persistence**: All journal entries are stored in component state and lost on page refresh. Database integration required for production use.

2. **Authentication**: No user authentication system. All users see the same mock data.

3. **Photo Uploads**: Photos are converted to blob URLs and lost on page refresh. Implement cloud storage (Vercel Blob, Cloudinary, etc.) for persistence.

4. **TypeScript Strict Mode**: Currently disabled in tsconfig. Consider enabling for better type safety.

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors
Check `next.config.mjs` - `ignoreBuildErrors` is now `false`. Fix all TS errors before deploying.

### Image Optimization Issues
If using external images, add domains to `remotePatterns` in `next.config.mjs`.

### Dark Mode Flicker
The FOUC prevention script in `layout.tsx` should prevent this. Ensure it's not blocked by CSP.

## Support

For issues specific to:
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Tailwind**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Radix UI**: [radix-ui.com](https://radix-ui.com)

## Post-Deployment

After deploying:
1. Test all pages in production
2. Verify dark mode works correctly
3. Test on multiple devices and browsers
4. Check Lighthouse scores
5. Monitor error logs
6. Set up uptime monitoring

---

**Current Status**: Ready for deployment as a frontend-only demo. Database integration required for production journaling functionality.
