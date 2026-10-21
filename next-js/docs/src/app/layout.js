export const metadata = {
  title: "docs",
  description: "documentation explorer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">home</a>{" "}
          <a href="/docs">docs</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}