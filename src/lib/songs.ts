import songData from "@/data/songs.json";

export interface Song {
  id: string;
  number: number;
  title: string;
  artist: string;
  lyric: string;
  lyricKind?: "lyric" | "message";
  extraLyric?: string | null;
  letter: { text: string; emphasis: boolean }[];
  album: string;
  year: string;
  cover: string;
  source: string;
  theme: string;
  floId?: string;
  melonId?: string;
}
export const songs: Song[] = songData.map((song): Song => ({
  ...song,
  lyricKind: song.lyricKind === "message" ? "message" : "lyric",
}));
if (!songs.length || new Set(songs.map(song => song.id)).size !== songs.length) {
  throw new Error("곡 목록은 비어 있으면 안 되며 id는 중복될 수 없습니다.");
}
export const cleanName = (value: string) => value.normalize("NFC").replace(/[\u0000-\u001f\u007f]/g, "").trim().replace(/\s+/g, " ").slice(0, 20);

// Draw again on every submission; avoid repeating the previous song when possible.
export function recommend(previousSongId?: string): Song {
  const candidates = songs.filter(song => song.id !== previousSongId);
  const pool = candidates.length ? candidates : songs;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function letterUrl(song: Song, name: string) {
  return `/letter/${song.id}${name ? `#to=${encodeURIComponent(cleanName(name))}` : ""}`;
}
