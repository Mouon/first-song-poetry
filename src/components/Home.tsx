"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { cleanName, recommend, letterUrl } from "@/lib/songs";


export function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalized = cleanName(name);
    if (!normalized) { setError("이름을 입력해주세요."); input.current?.focus(); return; }
    setOpening(true);
    let previousSongId: string | undefined;
    try { previousSongId = sessionStorage.getItem("first-verse:last-song") || undefined; } catch { /* Storage may be disabled. */ }
    const song = recommend(previousSongId);
    try { sessionStorage.setItem("first-verse:last-song", song.id); } catch { /* Recommendation still works without storage. */ }
    router.push(letterUrl(song, normalized));
  }

  return <div className="home"><main id="main" className="home-main">
    <h1 className="home-heading">첫소절</h1>
    <form className="name-form" onSubmit={submit} noValidate>
      <div className={`input-row ${error ? "has-error" : ""}`}><input ref={input} id="name" name="name" aria-label="이름" value={name} onChange={e => { setName(e.target.value); setError(""); }} placeholder="이름을 입력해주세요" autoComplete="given-name" maxLength={20} required aria-invalid={!!error} aria-describedby={error ? "name-error" : undefined} /></div>
      {error && <p id="name-error" className="form-error" role="alert">{error}</p>}
      <button className="primary-button" disabled={opening} type="submit">{opening ? "노래를 찾는 중…" : "내 첫 노래 찾기"}</button>
    </form>
  </main></div>;
}
