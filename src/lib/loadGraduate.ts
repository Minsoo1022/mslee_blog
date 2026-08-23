import type { GraduateProject, ResearchLogEntry } from "../types/graduate";
import projectsData from "../data/career/graduate-projects.json";
import logData from "../data/career/research-log.json";

const projects = projectsData as GraduateProject[];
const log = logData as ResearchLogEntry[];

export function getInProgressProjects(): GraduateProject[] {
  return projects
    .filter((p) => p.status === "진행중")
    .slice()
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
}

export function getCompletedProjects(): GraduateProject[] {
  return projects
    .filter((p) => p.status === "완료")
    .slice()
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
}

export function getProjectById(id: string): GraduateProject | undefined {
  return projects.find((p) => p.id === id);
}

/** 최신순(기간 시작일 내림차순) 연구 로그 */
export function getResearchLog(): ResearchLogEntry[] {
  return log.slice().sort((a, b) => b.periodStart.localeCompare(a.periodStart));
}

export function getResearchLogById(id: string): ResearchLogEntry | undefined {
  return log.find((l) => l.id === id);
}
