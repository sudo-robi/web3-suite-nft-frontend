# web3-suite-nft-frontend

> React frontend for the NFT marketplace on Stellar/Soroban — gallery, trading, and collection management.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/sudo-robi/web3-suite-nft-frontend)](https://github.com/sudo-robi/web3-suite-nft-frontend/issues)
[![Stars](https://img.shields.io/github/stars/sudo-robi/web3-suite-nft-frontend)](https://github.com/sudo-robi/web3-suite-nft-frontend/stargazers)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running](#running)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

### Problem

Stellar/Soroban has powerful smart contract capabilities but lacks a polished, production-ready frontend experience for NFT applications. Developers building NFT marketplaces on Stellar must assemble UI components, wallet integration, API clients, and routing from scratch — often reinventing the same patterns.

### Solution

This frontend provides a complete, modern React application for interacting with the web3-suite NFT ecosystem. It features:

- A responsive dark-mode UI with Stellar-themed design
- Freighter wallet integration for seamless Stellar authentication
- Direct API communication with the backend service
- Client-side routing across four main views
- Type-safe API client with proper error handling

### Audience

- **End users** browsing, buying, and selling NFTs on Stellar
- **NFT creators** deploying and managing their collections
- **Developers** forking this as a starting point for Stellar NFT frontends
- **Designers** looking for a reference implementation of Web3 UI patterns

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    React Application                        │ │
│  │                                                              │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │  Pages    │  │Components│  │  Hooks   │  │ Services │  │ │
│  │  │          │  │          │  │          │  │          │  │ │
│  │  │ Home     │  │ Layout   │  │ useWallet│  │ api.ts   │  │ │
│  │  │ Gallery  │  │ NFTCard  │  │          │  │          │  │ │
│  │  │ Market   │  │ Header   │  │          │  │          │  │ │
│  │  │ Collect  │  │ Button   │  │          │  │          │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └────┬─────┘  │ │
│  │                                                   │         │ │
│  └───────────────────────────────────────────────────┼─────────┘ │
│                                                      │           │
│  ┌───────────────────────────────────────────────────▼─────────┐ │
│  │               Stellar / Freighter Wallet                     │ │
│  │                                                              │ │
│  │  • Sign transactions    • Manage accounts                   │ │
│  │  • Switch networks      • Request authorization             │ │
│  └──────────────────────────────┬──────────────────────────────┘ │
│                                 │                                 │
└─────────────────────────────────┼─────────────────────────────────┘
                                  │
                        ┌─────────▼─────────┐
                        │   Stellar Network   │
                        │  (Soroban RPC)      │
                        └───────────────────┘
```

### Data Flow

```
User Action → React Component → API Service → Backend API → Soroban RPC → Stellar Chain
                                     │
                               ┌─────┴─────┐
                               │  Wallet   │
                               │ (Freighter)│
                               └───────────┘
```

### Component Hierarchy

```
<BrowserRouter>
  <WalletProvider>
    <Layout>
      <Header />                    ← Sticky nav + wallet connect
      <Routes>
        <HomePage />               ← Hero + features + architecture
        <GalleryPage />            ← NFT grid with collection filter
        <MarketplacePage />        ← Listing cards + buy flow
        <CollectionManagerPage />  ← Collection CRUD + stats
      </Routes>
      <Footer />                   ← Attribution
    </Layout>
  </WalletProvider>
</BrowserRouter>
```

---

## Features

### NFT Gallery

1. **Browse All NFTs** — View NFTs across all collections in a responsive grid
2. **Collection Filtering** — Filter gallery by specific collection
3. **NFT Cards** — Display token image, name, owner, and external link on hover
4. **Responsive Grid** — 2 columns on mobile, 3 on tablet, 4 on desktop
5. **Loading Skeletons** — Animated placeholders during data fetching
6. **Empty States** — Friendly prompts when no NFTs are found

### Marketplace

7. **Active Listings** — Browse all active NFT listings with prices
8. **One-Click Buy** — Purchase NFTs with wallet confirmation
9. **Search** — Search listings by keyword (UI ready, backend integration pending)
10. **Price Display** — Prices shown in XLM with automatic stroop conversion
11. **Seller Info** — Display seller address with shortened format
12. **Real-Time Updates** — Listings refresh after purchase

### Collection Manager

13. **Deploy Collections** — Create new NFT collections via smart contract
14. **Collection Stats** — View supply, minted count, and progress bars
15. **Visual Progress** — Percentage bar showing mint progress
16. **Settings Actions** — Manage and creator buttons per collection

### Wallet Integration

17. **Freighter Support** — Primary wallet integration via Freighter browser extension
18. **Demo Mode** — Fallback demo mode when Freighter is not installed
19. **Network Display** — Show current Stellar network (testnet/mainnet)
20. **Address Display** — Shortened address format in the header
21. **Connect/Disconnect** — One-click wallet connection and disconnection

### UI/UX

22. **Dark Mode** — Full dark mode with Stellar-themed color palette
23. **Responsive Design** — Mobile-first responsive layout
24. **Sticky Header** — Navigation stays visible while scrolling
25. **Backdrop Blur** — Modern glassmorphism effect on header
26. **Hover Effects** — Interactive hover states on cards and buttons
27. **Custom CSS Components** — Reusable button, card, input, and badge styles

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3 | UI framework |
| **TypeScript** | 5.3 | Type safety |
| **Vite** | 5.1 | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **React Router** | 6.22 | Client-side routing |
| **@stellar/stellar-sdk** | 12.0 | Stellar/Soroban integration |
| **Lucide React** | 0.344 | Icon library |
| **clsx** | 2.1 | Conditional classnames |
| **tailwind-merge** | 2.2 | Tailwind class deduplication |

---

## Project Structure

```
web3-suite-nft-frontend/
├── index.html                    # Entry HTML — title, meta, root div
├── package.json                  # Dependencies & npm scripts
├── tsconfig.json                 # TypeScript config (strict, JSX react-jsx)
├── vite.config.ts                # Vite config — React plugin, path aliases, API proxy
├── postcss.config.js             # PostCSS — Tailwind + Autoprefixer
├── .env.example                  # Environment variable template (6 lines)
├── .gitignore
├── LICENSE                       # MIT License
├── README.md                     # This file
└── src/
    ├── main.tsx                  # React entry point (13 lines)
    │                             #   - StrictMode + BrowserRouter
    ├── App.tsx                   # Router setup (22 lines)
    │                             #   - WalletProvider wrapping Routes
    │                             #   - 4 routes: /, /gallery, /marketplace, /collections
    ├── index.css                 # Tailwind imports + custom components (43 lines)
    │                             #   - btn-primary, btn-secondary, btn-danger
    │                             #   - card, input, badge, badge-active, badge-inactive
    ├── components/
    │   ├── Layout.tsx            # App shell (30 lines)
    │   │                         #   - Header + main content + footer
    │   ├── Header.tsx            # Navigation bar (78 lines)
    │   │                         #   - Logo, nav links, wallet connect/disconnect
    │   │                         #   - Active route highlighting
    │   │                         #   - Network badge
    │   └── NFTCard.tsx           # NFT display card (43 lines)
    │                             #   - Image/thumbnail, name, owner
    │                             #   - Hover external link icon
    ├── pages/
    │   ├── HomePage.tsx          # Landing page (118 lines)
    │   │                         #   - Hero section with CTA
    │   │                         #   - Stats cards (collections, minted, volume)
    │   │                         #   - Feature cards (Gallery, Marketplace, Royalties)
    │   │                         #   - ASCII architecture diagram
    │   ├── GalleryPage.tsx       # NFT gallery (89 lines)
    │   │                         #   - Collection filter dropdown
    │   │                         #   - Responsive NFT card grid
    │   │                         #   - Loading skeletons + empty states
    │   ├── MarketplacePage.tsx   # Marketplace listings (132 lines)
    │   │                         #   - Listing cards with price, seller, buy button
    │   │                         #   - Search input
    │   │                         #   - Buy flow with loading states
    │   └── CollectionManagerPage.tsx  # Collection CRUD (200 lines)
    │                                 #   - Create collection form
    │                                 #   - Collection list with progress bars
    │                                 #   - Settings + creators buttons
    ├── hooks/
    │   └── useWallet.tsx         # Wallet context provider (94 lines)
    │                             #   - WalletProvider context
    │                             #   - connect, disconnect, signTransaction
    │                             #   - Freighter integration
    │                             #   - Demo mode fallback
    ├── services/
    │   └── api.ts                # Backend API client (111 lines)
    │                             #   - Generic request() helper
    │                             #   - Collections API (list, get, listTokens)
    │                             #   - Marketplace API (listings, create, buy)
    │                             #   - Royalty API (getRoyaltyConfig)
    │                             #   - TypeScript interfaces for all responses
    └── lib/
        └── utils.ts             # Utility functions (19 lines)
                                #   - cn() — merged Tailwind classes
                                #   - formatStroops() — stroops to XLM
                                #   - shortenAddress() — GABC...XYZ format
                                #   - formatBps() — basis points to percentage
```

---

## Screenshots

<!-- Replace with actual screenshots after deployment -->

| Home | Gallery | Marketplace | Collections |
|------|---------|-------------|-------------|
| ![Home](docs/screenshots/home.png) | ![Gallery](docs/screenshots/gallery.png) | ![Marketplace](docs/screenshots/marketplace.png) | ![Collections](docs/screenshots/collections.png) |

> **Note:** Screenshots will be added after the first production deployment. Run `npm run dev` to see the live UI.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [Freighter Browser Extension](https://www.freighter.app/) (for wallet connection)
- Backend API running (see [web3-suite-nft-backend](https://github.com/sudo-robi/web3-suite-nft-backend))

### Installation

```bash
# Clone the repository
git clone https://github.com/sudo-robi/web3-suite-nft-frontend.git
cd web3-suite-nft-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your API URL
# VITE_API_URL=http://localhost:3001/api/v1

# Start development server
npm run dev
```

The app will start at `http://localhost:5173`.

---

## Configuration

### Freighter Wallet Setup

1. Install the [Freighter browser extension](https://www.freighter.app/)
2. Create or import a Stellar account
3. Switch to testnet for development
4. Click "Connect Wallet" in the app header

### API Proxy

The Vite dev server proxies `/api` requests to the backend:

```typescript
// vite.config.ts
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
},
```

This means you don't need to configure CORS during development — the proxy handles it.

---

## Running

### Development

```bash
npm run dev
# Vite dev server with HMR at http://localhost:5173
```

### Production Build

```bash
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build at http://localhost:4173
```

### Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # ~150KB gzipped
│   ├── index-[hash].css     # ~10KB gzipped
│   └── ...
└── vite.svg
```

---

## Testing

### Type Check

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
npm run lint:fix
```

### Manual Testing Checklist

- [ ] Homepage loads with hero section and feature cards
- [ ] Wallet connects via Freighter (or demo mode)
- [ ] Gallery page shows NFT grid with collection filter
- [ ] Marketplace shows listings with prices
- [ ] Buy button triggers wallet confirmation
- [ ] Collection manager shows create form
- [ ] Navigation highlights active route
- [ ] Responsive layout works on mobile
- [ ] Loading skeletons appear during data fetch
- [ ] Empty states display correctly

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add VITE_API_URL
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
# Environment variable: VITE_API_URL
```

### Docker

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Static Hosting

The `dist/` folder is a static site that can be served from any CDN or static host:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any web server (nginx, Apache)

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | No | `http://localhost:3001/api/v1` | Backend API base URL |
| `VITE_STELLAR_NETWORK` | No | `testnet` | Stellar network to connect to |
| `VITE_STELLAR_RPC_URL` | No | `https://soroban-testnet.stellar.org` | Soroban RPC endpoint |

> **Note:** Vite exposes env variables prefixed with `VITE_` to the client bundle. **Never put secrets here** — this code runs in the browser.

---

## Wallet Integration

### Supported Operations

| Operation | Status | Notes |
|-----------|--------|-------|
| Connect wallet | ✅ | Freighter extension |
| Disconnect wallet | ✅ | Clears local state |
| Sign transactions | ✅ | Via Freighter signTransaction |
| Switch network | ✅ | Testnet/mainnet based on env |
| Request authorization | ✅ | For contract invocations |
| Albedo integration | 🔜 | Planned for v1.1 |
| LOBSTR integration | 🔜 | Planned for v1.1 |

### Transaction Signing Flow

```
1. User initiates action (e.g., Buy NFT)
2. App builds Soroban transaction XDR
3. Transaction XDR sent to Freighter
4. User reviews and approves in extension popup
5. Signed transaction submitted to Soroban RPC
6. Transaction result displayed in UI
```

### Demo Mode

When Freighter is not installed, the app runs in demo mode:
- Uses a placeholder address (`GDEMO...`)
- Wallet operations return unsigned XDR
- All UI features remain functional
- Console warnings indicate demo mode

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `dark-950` | `#0a0a0f` | Background |
| `dark-900` | `#111118` | Card background |
| `dark-800` | `#1a1a24` | Borders, inputs |
| `dark-700` | `#2a2a38` | Hover borders |
| `dark-400` | `#6b6b80` | Secondary text |
| `stellar-600` | `#0080ff` | Primary actions |
| `stellar-400` | `#4da6ff` | Accents, links |

### Components

| Component | Class | Description |
|-----------|-------|-------------|
| Primary Button | `.btn-primary` | Stellar blue, white text |
| Secondary Button | `.btn-secondary` | Dark border, white text |
| Danger Button | `.btn-danger` | Red, white text |
| Card | `.card` | Rounded, bordered, padded container |
| Input | `.input` | Dark background, bordered, focus ring |
| Badge (active) | `.badge-active` | Green background |
| Badge (inactive) | `.badge-inactive` | Dark background |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feat/my-feature`)
3. **Commit** with conventional commits (`git commit -m 'feat: add NFT detail modal'`)
4. **Push** to the branch (`git push origin feat/my-feature`)
5. **Open** a Pull Request

### Branch Naming

| Prefix | Description |
|--------|-------------|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `docs/` | Documentation |
| `style/` | CSS/styling changes |
| `refactor/` | Code refactoring |
| `chore/` | Maintenance |

### Development Guidelines

- All PRs must pass `npm run typecheck` and `npm run lint`
- New components go in `src/components/`
- New pages go in `src/pages/`
- Use Tailwind CSS classes (no inline styles)
- Follow the existing design system (colors, spacing, typography)
- Add proper TypeScript types for all props and API responses

### Commit Convention

| Prefix | Description |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | CSS/styling changes |
| `refactor:` | Code refactoring |
| `chore:` | Maintenance |

### Pull Request Process

1. Ensure all checks pass: `npm run typecheck && npm run lint`
2. Test on mobile viewport (375px width)
3. Verify wallet connection works in demo mode
4. Update screenshots if UI changed
5. Request review from maintainers

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ for the Stellar ecosystem by <a href="https://github.com/sudo-robi">sudo-robi</a>
</p>
