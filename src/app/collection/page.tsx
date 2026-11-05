import Link from "next/link";
import { songs } from "@/lib/songs";
import { Header, Footer } from "@/components/Shell";
import { Arrow } from "@/components/icons";
export const metadata = { title: "노래 모음" };
export default function Collection() {
  return <><Header back /><main className="collection-page"><p className="eyebrow">CONTENTS</p><h1>노래 모음</h1><p className="collection-intro">서로 다른 마음이 담긴 노래들.<br />마음이 머무는 페이지를 펼쳐보세요.</p><ol className="song-list">{songs.map(song => <li key={song.id}><Link href={`/letter/${song.id}`}><span className="list-number">{String(song.number).padStart(2,"0")}</span><span className="list-song"><strong>{song.title}</strong><span>{song.artist} · {song.theme}</span></span><Arrow diagonal /></Link></li>)}</ol><Link href="/" className="text-link">내 이름으로 첫 노래 만나기 <Arrow /></Link></main><Footer /></>;
}
