"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { type Song, cleanName, songs } from "@/lib/songs";
import { Header, Footer } from "./Shell";
import { Sparkle, Arrow } from "./icons";
import { MusicLinks } from "./MusicLinks";

export function Letter({ song }: { song: Song }) {
  const [name, setName] = useState("");
  const [notice, setNotice] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [coverFailed, setCoverFailed] = useState(false);
  useEffect(() => {
    const readName = () => setName(cleanName(new URLSearchParams(location.hash.slice(1)).get("to") || ""));
    readName();
    window.addEventListener("hashchange", readName);
    return () => { window.removeEventListener("hashchange", readName); };
  }, []);
  const personalized = (text: string) => text.replaceAll("{이름}님", name ? `${name}님` : "당신").replaceAll("{이름}", name || "당신");

  async function share() {
    const url = location.href;
    try {
      if (navigator.share) { await navigator.share({ title: `${name || "당신"}의 첫 소절 — ${song.title}`, text: "당신을 위한 한 곡의 노래와 한 통의 편지", url }); }
      else { await navigator.clipboard.writeText(url); setNotice("편지 링크를 복사했어요. 소중한 사람에게 건네보세요."); }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setShareUrl(url); setNotice("아래 링크를 복사해 편지를 건네주세요.");
    }
  }

  return <><Header back /><main className="letter-page">
    <div className="letter-topline"><span className="eyebrow">A LETTER FOR YOU</span><span className="page-number">{String(song.number).padStart(2,"0")} / {songs.length}</span></div>
    <p className="dedication">{name ? `${name}님` : "당신"}을 위한 첫 소절</p>
    {song.lyricKind === "message" && <p className="music-caption">노래가 전하는 메시지</p>}
    <h1 className={`lyric-title ${song.lyric.length > 40 ? "long-lyric" : ""}`}><span className="opening-quote" aria-hidden="true">“</span>{song.lyric}<span className="closing-quote" aria-hidden="true">”</span></h1>
    <figure className="album-figure"><div className="album-frame">{coverFailed ? <div className="cover-fallback"><Sparkle /><span>{song.album}</span></div> : <img src={song.cover} alt={`${song.artist} — ${song.album} 앨범 커버`} width={720} height={720} onError={() => setCoverFailed(true)} fetchPriority="high" />}</div><figcaption><h2>{song.title}</h2><p>{song.artist} <span>·</span> {song.album} <span>·</span> {song.year}</p></figcaption></figure>
    <MusicLinks song={song} />
    <section className="letter-body" aria-label="당신을 위한 편지"><h2>{name || "당신"}에게,</h2>{song.letter.map((para, index) => <p className={para.emphasis ? "emphasis" : ""} key={index}>{personalized(para.text)}</p>)}<div className="letter-signature"><Sparkle /><p>당신의 모든 시작을 응원하며,<br /><span>첫소절 드림.</span></p></div></section>
    <section className="letter-actions" aria-label="편지 공유"><p>오래 간직하고 싶은 마음이라면.</p><button className="primary-button" onClick={share}><span>이 편지 나누기</span><Arrow diagonal /></button><p className="share-note">입력한 이름이 담긴 편지 링크를 공유해요.</p><p className="notice" role="status">{notice}</p>{shareUrl && <input className="share-url" aria-label="공유할 편지 주소" value={shareUrl} readOnly onFocus={e => e.target.select()} />}<Link href="/" className="text-link">다른 이름으로 편지 받기 <Arrow /></Link><Link href="/collection" className="subtle-link">노래 모음으로 돌아가기</Link></section>
    <div className="letter-colophon"><span>노래와 가사 · {song.artist}</span><a href={song.source} target="_blank" rel="noopener noreferrer">앨범 정보 ↗</a><span>첫소절은 음악에 마음을 더한 비공식 팬 프로젝트입니다.</span></div>
  </main><Footer /></>;
}
