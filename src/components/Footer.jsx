export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {year} 林赫洋 · 羊毛Fleece_</span>
        <span className="f-mono">
          <span className="f-accent">$</span> unity-client portfolio · react + vite
        </span>
        <span>Unity Client Portfolio</span>
      </div>
    </footer>
  );
}
