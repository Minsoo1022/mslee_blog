export type ProjectStatus = "진행중" | "완료";

export interface GraduateProject {
  id: string;
  title: string;
  status: ProjectStatus;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD 또는 null (진행중) */
  endDate: string | null;
  summary: string;
  body?: string;
}

export type ResearchTrackId = "lfp-ess" | "ncm-formfactor";

export interface ResearchTrack {
  id: ResearchTrackId;
  title: string;
  subtitle: string;
  target: string;
  status: string;
  researchQuestion: string;
  narrative: { heading: string; body: string }[];
  openQuestions: string[];
}

export interface ResearchPaper {
  id: string;
  trackId: ResearchTrackId;
  title: string;
  authors: string;
  venue: string;
  year: number;
  url?: string;
  summary: string;
  tags: string[];
}

export interface ResearchLogEntry {
  id: string;
  /** 어느 연구 트랙 소속인지. 트랙 신설 이전 로그는 없을 수 있음 */
  trackId?: ResearchTrackId;
  /** YYYY-MM-DD */
  periodStart: string;
  /** YYYY-MM-DD */
  periodEnd: string;
  title: string;
  completed: string[];
  nextSteps: string[];
  /** src/data/images/ 안의 파일명 상대경로, 없으면 null */
  image: string | null;
}
