# Christ Faculty Hub

A production-grade Next.js 14 web application for Christ University faculty to centrally manage important links and LLM modules.

## Features

- **Role-based Authentication**: Faculty, Admin, Super Admin roles
- **Protected Dashboard**: Middleware-protected routes
- **Modular Architecture**: Clean separation of concerns
- **Prisma ORM**: PostgreSQL database integration
- **NextAuth**: Secure authentication
- **Zustand**: State management
- **Strategy Pattern**: LLM provider abstraction
- **Token Usage Logging**: Track LLM usage
- **API Routes**: Backend logic handlers

## Modules

1. **Dashboard**: Analytics, metrics, usage stats
2. **Link Management**: CRUD operations, categories, department filtering, search
3. **LLM Module Management**: Prompt templates, model selection, logs
4. **Analytics**: Charts, token usage, most-used modules
5. **User Management**: Admin-only user management

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **UI Components**: Custom glassmorphic design
- **Charts**: Recharts

## Design System

- **Primary Blue**: #1F3C88
- **Accent Gold**: #C9A227
- **Background**: Black to deep-blue gradient
- **Glassmorphic UI**: Backdrop blur, translucent panels
- **Typography**: Serif headings, clean sans-serif body

## Getting Started

1. Install dependencies: `npm install`
2. The database is configured for SQLite (dev.db) - no additional setup needed
3. Generate Prisma client: `npx prisma generate`
4. Run database migrations: `npx prisma migrate dev --name init`
5. Start development server: `npm run dev`

The application will be available at http://localhost:3000

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `db:generate` - Generate Prisma client
- `db:push` - Push schema to database
- `db:studio` - Open Prisma Studio

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── store.ts          # Zustand store
│   └── llm-strategy.ts   # LLM provider strategy
├── prisma/               # Database schema
└── middleware.ts         # Route protection
```

## Contributing

1. Follow the established code style
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add tests for new features
5. Update documentation

## License

This project is licensed under the MIT License.