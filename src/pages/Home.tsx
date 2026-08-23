import { Link } from "react-router-dom";
import SummaryCard from "../components/SummaryCard";
import CardItem from "../components/CardItem";
import ImageFallbackIcon from "../components/ImageFallbackIcon";
import type { CardSection } from "../types/card";
import {
  getLatestSnapshot,
  getMoMReturnPct,
  getPreviousSnapshot,
} from "../lib/loadAssets";
import { getLatestCard } from "../lib/loadCards";
import { formatKRW, formatPct } from "../lib/format";

export default function Home() {
  const latest = getLatestSnapshot();
  const previous = getPreviousSnapshot();
  const momPct = latest ? getMoMReturnPct(latest, previous) : null;

  const cardSections: CardSection[] = ["insights", "career", "life"];

  return (
    <div className="page">
      <section className="hero">
        <p className="hero__eyebrow">PERSONAL SITE</p>
        <h1 className="hero__title">Minsu Lee</h1>
        <p className="hero__subtitle">
          자산, 배움, 커리어, 일상을 한 곳에 정리하는 개인 기록 공간.
        </p>
      </section>

      {latest && (
        <section className="panel">
          <h2>총자산 요약</h2>
          <div className="summary-grid">
            <SummaryCard label="총자산" value={formatKRW(latest.totalAssets)} />
            <SummaryCard
              label="전월 대비"
              value={momPct === null ? "—" : formatPct(momPct)}
              tone={momPct === null ? "neutral" : momPct >= 0 ? "positive" : "negative"}
              sub={previous ? `기준일 ${previous.date}` : "이전 스냅샷 없음"}
            />
            <SummaryCard label="업데이트" value={latest.date} />
          </div>
        </section>
      )}

      <section>
        <h2 className="section-title">최근 업데이트</h2>
        <div className="card-grid">
          <Link to="/assets" className="card-item">
            <div className="card-item__media">
              <div className="card-item__media-fallback">
                <ImageFallbackIcon />
              </div>
              <span className="card-item__badge">Assets</span>
            </div>
            <div className="card-item__body">
              <div className="card-item__date">자산 현황</div>
              <h3 className="card-item__title">자산 현황 보러 가기</h3>
              <p className="card-item__summary">
                계좌별 잔액, 자산 추이, 위험자산 비중을 확인하세요.
              </p>
              <span className="card-item__link">Assets →</span>
            </div>
          </Link>
          {cardSections.map((section) => {
            const card = getLatestCard(section);
            return card ? <CardItem key={section} card={card} section={section} /> : null;
          })}
        </div>
      </section>
    </div>
  );
}
