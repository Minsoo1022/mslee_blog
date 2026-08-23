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

export interface ResearchLogEntry {
  id: string;
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
