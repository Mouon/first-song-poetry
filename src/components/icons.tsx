export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}</svg>;
}
export function Sparkle() {
  return <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true"><path d="M20 1c0 14-5 19-19 19 14 0 19 5 19 19 0-14 5-19 19-19C25 20 20 15 20 1Z" /><path d="m8 8 24 24M32 8 8 32" /></svg>;
}
export function SoundIcon({ active = false }: { active?: boolean }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">{active ? <><path d="M8 5v14M16 5v14" /></> : <><path d="m11 4-5 4H2v8h4l5 4V4Z" /><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /></>}</svg>;
}
