import { type ReactNode } from 'react';
import { Header } from './Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-dark-500">
          <p>
            Built with love for the Stellar ecosystem by{' '}
            <a
              href="https://github.com/sudo-robi"
              className="text-stellar-400 hover:text-stellar-300"
            >
              sudo-robi
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
