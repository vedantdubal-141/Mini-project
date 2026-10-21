export const metadata = {
  title: "student Directory",
  description: "browse students and departments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">home</a>{" "}
          <a href="/students">students</a>{" "}
          <a href="/departments">departments</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}