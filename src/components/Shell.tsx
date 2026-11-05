import Link from "next/link";
export function Header({ back = false }: { back?: boolean }) {
  return <header className="site-header"><Link href="/" className="wordmark" aria-label="첫소절 홈">첫소절<span className="wordmark-dot">.</span></Link><span className="header-edition">A SONG FOR YOU</span>{back ? <Link className="header-action" href="/">처음으로 <span aria-hidden="true">↗</span></Link> : <Link className="header-action" href="/collection">노래 모음 <span aria-hidden="true">↗</span></Link>}</header>;
}
export function Footer() {
  return <footer className="site-footer"><span>당신의 모든 시작을 응원하며.</span><span className="footer-en">FIRST VERSE</span></footer>;
}
