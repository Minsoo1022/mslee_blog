import type { ResearchLogEntry, ResearchPaper, ResearchTrack, ResearchTrackId } from "../types/graduate";
import tracksData from "../data/career/research-tracks.json";
import papersData from "../data/career/research-papers.json";
import { getResearchLog } from "./loadGraduate";

const tracks = tracksData as ResearchTrack[];
const papers = papersData as ResearchPaper[];

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
