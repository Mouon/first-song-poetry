import { notFound } from "next/navigation";
import { songs } from "@/lib/songs";
import { Letter } from "@/components/Letter";
export function generateStaticParams() { return songs.map(song => ({ id: song.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = songs.find(song => song.id === id);
  return { title: song ? `${song.title} — 당신을 위한 편지` : "페이지를 찾을 수 없어요" };
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = songs.find(song => song.id === id);
  if (!song) notFound();
  return <Letter song={song} />;
}
