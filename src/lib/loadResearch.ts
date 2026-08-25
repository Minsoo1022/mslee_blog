import type {
  ResearchLogEntry,
  ResearchMethod,
  ResearchNewsItem,
  ResearchPaper,
  ResearchProgress,
  ResearchTrack,
  ResearchTrackId,
} from "../types/graduate";
import tracksData from "../data/career/research-tracks.json";
import papersData from "../data/career/research-papers.json";
import progressData from "../data/career/research-progress.json";
import methodsData from "../data/career/research-methods.json";
import newsData from "../data/career/research-news.json";
import { getResearchLog } from "./loadGraduate";

const tracks = tracksData as ResearchTrack[];
const papers = papersData as ResearchPaper[];
const progress = progressData as ResearchProgress[];
const methods = methodsData as ResearchMethod[];
const news = newsData as ResearchNewsItem[];

export function getResearchTracks(): ResearchTrack[] {
  return tracks;
}

export function getResearchTrackById(id: string): ResearchTrack | undefined {
  return tracks.find((t) => t.id === id);
}

export function getPapersByTrack(trackId: ResearchTrackId): ResearchPaper[] {
  return papers.filter((p) => p.trackId === trackId);
}

/** 해당 트랙 소속 연구 로그만 최신순으로 (trackId 없는 옛 로그는 제외) */
export function getLogByTrack(trackId: ResearchTrackId): ResearchLogEntry[] {
  return getResearchLog().filter((entry) => entry.trackId === trackId);
}

export function getProgressByTrack(trackId: ResearchTrackId): ResearchProgress["stages"] {
  return progress.find((p) => p.trackId === trackId)?.stages ?? [];
}

export function getMethodsByTrack(trackId: ResearchTrackId): ResearchMethod[] {
  return methods.filter((m) => m.trackId === trackId);
}

export function getNewsByTrack(trackId: ResearchTrackId): ResearchNewsItem[] {
  return news
    .filter((n) => n.trackId === trackId)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}
