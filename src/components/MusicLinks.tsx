"use client";
import { useEffect, useRef, useState } from "react";
import type { Song } from "@/lib/songs";
import { musicLinks, openMusic, type MusicLink } from "@/lib/music-links";

function ServiceIcon({ id }: { id: string }) {
  if (id === "youtube") return <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="12" fill="currentColor" /><circle cx="14" cy="14" r="8" fill="none" stroke="white" strokeWidth="1" /><path d="m12 10 6 4-6 4Z" fill="white" /></svg>;
  if (id === "spotify") return <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="12" fill="currentColor" /><g stroke="white" fill="none" strokeWidth="1.5" strokeLinecap="round"><path d="M7 10c5-2 10-1 14 1M8 14c4-1.5 8-1 12 1M9 18c3-1 7-.8 10 1" /></g></svg>;
  if (id === "melon") return <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="12" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="3.4" /><path d="M20 16V3h6v7h-6" fill="currentColor" /></svg>;
  return <span className="flo-icon" aria-hidden="true">FLO</span>;
}
export function MusicLinks({ song }: { song: Song }) {
  const [fallback, setFallback] = useState<MusicLink | null>(null);
  const cleanup = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanup.current?.(), []);
  return <div className="music-section"><p className="music-caption">이 노래와 함께 편지를 읽어보세요</p><div className="music-links">{musicLinks(song).map(link => <a key={link.id} href={link.web} target="_blank" rel="noopener noreferrer" aria-label={`${link.name}에서 ${song.title} 듣기`} onClick={e => { e.preventDefault(); cleanup.current?.(); setFallback(null); cleanup.current = openMusic(link, () => setFallback(link)); }}><ServiceIcon id={link.id} /><span>{link.short}</span></a>)}</div>{fallback && <p role="status" className="music-fallback">앱이 열리지 않았나요? <a href={fallback.web} target="_blank" rel="noopener noreferrer">{fallback.name} 웹에서 열기 ↗</a></p>}</div>;
}
