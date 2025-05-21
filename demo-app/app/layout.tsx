import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QuantumProvider } from '@auraglyph/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AuraGlyph Design System Demo',
  description: 'A next-generation quantum design system that evolves from glassmorphism into a responsive, conscious design organism.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QuantumProvider 
          options={{ 
            adaptability: 0.7,
            quantumEffectsLevel: 'standard',
            debug: false
          }}
        >
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </QuantumProvider>
      </body>
    </html>
  );
}