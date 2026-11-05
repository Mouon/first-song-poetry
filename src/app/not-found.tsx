import Link from "next/link";
import { Header, Footer } from "@/components/Shell";
export default function NotFound() { return <><Header back /><main className="empty-page"><p className="eyebrow">PAGE NOT FOUND</p><h1>아직 쓰이지 않은<br />페이지예요.</h1><Link href="/" className="text-link">첫 페이지로 돌아가기 ↗</Link></main><Footer /></>; }
