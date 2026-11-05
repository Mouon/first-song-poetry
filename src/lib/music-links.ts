import type { Song } from "./songs";

export function musicLinks(song: Song) {
  const query = encodeURIComponent(`${song.artist} ${song.title}`);
  const flo = song.floId ? `https://www.music-flo.com/detail/track/${song.floId}/details` : `https://www.music-flo.com/search/all?keyword=${query}`;
  const melon = song.melonId ? `https://www.melon.com/song/detail.htm?songId=${song.melonId}` : `https://www.melon.com/search/total/index.htm?q=${query}`;
  return [
    { id: "youtube", name: "YouTube Music", short: "YouTube Music", web: `https://music.youtube.com/search?q=${query}`, ios: `youtubemusic://music.youtube.com/search?q=${query}`, android: `intent://music.youtube.com/search?q=${query}#Intent;scheme=https;package=com.google.android.apps.youtube.music;S.browser_fallback_url=${encodeURIComponent(`https://music.youtube.com/search?q=${query}`)};end` },
    { id: "melon", name: "멜론", short: "멜론", web: melon, ios: song.melonId ? `melonapp://play?menuid=0&ctype=1&cid=${song.melonId}` : melon, android: song.melonId ? `melonapp://play?menuid=0&ctype=1&cid=${song.melonId}` : melon },
    { id: "spotify", name: "Spotify", short: "Spotify", web: `https://open.spotify.com/search/${query}`, ios: `spotify:search:${query}`, android: `spotify:search:${query}` },
    { id: "flo", name: "FLO", short: "FLO", web: flo, ios: `flomusic://action/openUrl?url=${encodeURIComponent(flo)}`, android: `flomusic://action/openUrl?url=${encodeURIComponent(flo)}` },
  ];
}
export type MusicLink = ReturnType<typeof musicLinks>[number];

// Native navigation is attempted only on a direct tap. Cancel the web fallback
// when the page goes into the background so returning from an app never redirects.
export function openMusic(link: MusicLink, onFallback: () => void): () => void {
  const android = /Android/i.test(navigator.userAgent);
  const mobile = android || /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (!mobile) { window.open(link.web, "_blank", "noopener,noreferrer"); return () => {}; }
  let timeout: ReturnType<typeof setTimeout>;
  const cleanup = () => { clearTimeout(timeout); document.removeEventListener("visibilitychange", onHidden); window.removeEventListener("pagehide", cleanup); };
  const onHidden = () => { if (document.hidden) cleanup(); };
  document.addEventListener("visibilitychange", onHidden);
  window.addEventListener("pagehide", cleanup, { once: true });
  timeout = setTimeout(() => { cleanup(); if (!document.hidden) onFallback(); }, 1800);
  window.location.href = android ? link.android : link.ios;
  return cleanup;
}
