import './globals.css';

export const metadata = {
  title: 'Assia Houbbadi — Ingénieure Informatique',
  description: 'Portfolio de Assia Houbbadi — Étudiante Ingénieure Informatique à l\'ENSAKH, Full Stack Developer, Leader & Innovatrice.',
  keywords: ['Assia Houbbadi', 'Portfolio', 'Full Stack', 'ENSAKH', 'Khouribga', 'React', 'Next.js'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body>{children}</body>
    </html>
  );
}