// Career/대학원 페이지의 로드맵/D-day 설정.
// ⚠️ graduationDate는 "2028 졸업 예정"까지만 알아서 월/일은 임시값(2월 말)입니다.
// 정확한 날짜가 정해지면 이 값만 바꾸면 됩니다.
export const graduationDate = "2028-02-29"; // TODO: 정확한 졸업(예정)일로 수정
export const admissionLabel = "2026.03 입학 · 2028 졸업 예정";
export const researchFocus = "GMS 도전재 기반 LFP·NCM 후막 전극 연구";

export interface RoadmapStage {
  ageRange: string;
  title: string;
  description: string;
}

export const roadmapStages: RoadmapStage[] = [
  {
    ageRange: "26–28세",
    title: "대학원기",
    description: "KIST 대학원 과정, 전극 공정 연구 집중 및 논문 실적 쌓기.",
  },
  {
    ageRange: "28–31세",
    title: "취업 초기",
    description: "졸업 후 첫 직장 적응, 실무 역량 확보, 초기 자산 형성 시작.",
  },
  {
    ageRange: "31–35세",
    title: "자산 형성기",
    description: "위험/안전자산 70:30 목표 비율로 리밸런싱하며 자산 규모 확대.",
  },
  {
    ageRange: "35–38세",
    title: "목표 달성 이후",
    description: "1차 재무 목표 달성, 다음 단계 계획(주거·가족 등) 수립.",
  },
];

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export const careerChecklist: ChecklistItem[] = [
  { id: "toeic", label: "토익 900+ 취득", done: false },
  { id: "ospt", label: "전공 관련 자격증 취득", done: false },
  { id: "cv", label: "영문 CV/이력서 초안 작성", done: false },
  { id: "paper", label: "1저자 논문 1편 이상 게재", done: false },
];
