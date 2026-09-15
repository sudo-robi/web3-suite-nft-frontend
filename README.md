# web3-suite-nft-frontend

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Stellar](https://img.shields.io/badge/Stellar-Network-black?logo=stellar)](https://stellar.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **React frontend for the NFT marketplace on Stellar/Soroban — gallery, trading, and collection management.**

This is the frontend application for the [web3-suite NFT platform](https://github.com/sudo-robi/web3-suite). It provides a modern, responsive UI for browsing NFTs, trading on the marketplace, and managing collections — all powered by Soroban smart contracts on the Stellar network.

---

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Wallet Integration](#wallet-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Screenshots

<!-- Replace with actual screenshots after deployment -->

| Home | Gallery | Marketplace | Collections |
|------|---------|-------------|-------------|
| ![Home](docs/screenshots/home.png) | ![Gallery](docs/screenshots/gallery.png) | ![Marketplace](docs/screenshots/marketplace.png) | ![Collections](docs/screenshots/collections.png) |

> **Note:** Screenshots will be added after the first production deployment. Run `npm run dev` to see the live UI.

---

## Features

### NFT Gallery
- Browse all NFTs across collections
- Filter by collection
- View NFT metadata (image, name, owner)
- Responsive grid layout with lazy loading

### Marketplace
- Browse active listings with price display
- One-click purchase with wallet confirmation
- Search and filter listings
- Real-time listing status updates

### Collection Manager
- Deploy new NFT collections via smart contract
- View collection stats (supply, minted count)
- Visual progress bar for mint status
- Configure royalty rates and creator splits

### Wallet Integration
- Freighter wallet support (primary)
- Albedo and LOBSTR signer support (planned)
- Network switching (testnet/mainnet)
- Address display with copy-to-clipboard

### UI/UX
- Fully responsive (mobile, tablet, desktop)
- Dark mode by default with Stellar-themed colors
- Loading skeletons and smooth transitions
- Accessible (ARIA labels, keyboard navigation)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **React Router** | Client-side routing |
| **@stellar/stellar-sdk** | Stellar/Soroban integration |
| **Lucide React** | Icon library |
| **clsx + tailwind-merge** | Conditional classnames |

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
│  │  │ Market   │  │ Modal    │  │          │  │          │  │ │
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

---

## Setup

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

### Production Build

```bash
npm run build
npm run preview
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | No | `http://localhost:3001/api/v1` | Backend API base URL |
| `VITE_STELLAR_NETWORK` | No | `testnet` | Stellar network to connect to |
| `VITE_STELLAR_RPC_URL` | No | `https://soroban-testnet.stellar.org` | Soroban RPC endpoint |

> **Note:** Vite exposes env variables prefixed with `VITE_` to the client bundle. Never put secrets here.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix linting issues |
| `npm run typecheck` | Type-check without emitting |

---

## Project Structure

```
web3-suite-nft-frontend/
├── index.html                    # Entry HTML
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── tsconfig.node.json            # Node TypeScript config
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config
├── postcss.config.js             # PostCSS config
├── .env.example                  # Environment variable template
├── .gitignore
├── LICENSE                       # MIT License
├── README.md                     # This file
└── src/
    ├── main.tsx                  # React entry point
    ├── App.tsx                   # Router setup
    ├── index.css                 # Tailwind imports + custom styles
    ├── components/
    │   └── Layout.tsx            # App shell (header, nav, footer)
    ├── pages/
    │   ├── HomePage.tsx          # Landing page with hero + features
    │   ├── GalleryPage.tsx       # NFT gallery grid view
    │   ├── MarketplacePage.tsx   # Marketplace listings + buy
    │   └── CollectionManagerPage.tsx  # Collection CRUD
    ├── hooks/
    │   └── useWallet.tsx         # Wallet context provider
    ├── services/
    │   └── api.ts                # Backend API client
    └── lib/
        └── utils.ts              # Utility functions (cn, format, etc.)
```

---

## Wallet Integration

This app uses [Freighter](https://www.freighter.app/) as the primary Stellar wallet:

### Supported Operations

| Operation | Status |
|-----------|--------|
| Connect wallet | ✅ |
| Disconnect wallet | ✅ |
| Sign transactions | ✅ |
| Switch network | ✅ |
| Request authorization | ✅ |
| Albedo integration | 🔜 |
| LOBSTR integration | 🔜 |

### Freighter Setup

1. Install the [Freighter browser extension](https://www.freighter.app/)
2. Create or import a Stellar account
3. Switch to testnet for development
4. Click "Connect Wallet" in the app

### Transaction Signing Flow

```
1. User initiates action (e.g., Buy NFT)
2. App builds Soroban transaction
3. Transaction XDR sent to Freighter
4. User reviews and approves in extension
5. Signed transaction submitted to Soroban RPC
6. Transaction result displayed in UI
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feat/my-feature`)
3. **Commit** with conventional commits (`git commit -m 'feat: add NFT detail modal'`)
4. **Push** to the branch (`git push origin feat/my-feature`)
5. **Open** a Pull Request

### Guidelines

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

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ for the Stellar ecosystem by <a href="https://github.com/sudo-robi">sudo-robi</a>
</p>
