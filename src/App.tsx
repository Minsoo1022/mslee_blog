import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Assets from "./pages/Assets";
import Insights from "./pages/Insights";
import Life from "./pages/Life";
import CardDetail from "./pages/CardDetail";
import JobPrep from "./pages/career/JobPrep";
import Graduate from "./pages/career/Graduate";
import ProjectDetail from "./pages/career/ProjectDetail";
import ResearchLogDetail from "./pages/career/ResearchLogDetail";

// GitHub Pages는 서브경로에서 서빙되므로 BrowserRouter 대신 HashRouter 사용
// (랩 홈페이지와 동일한 방식)
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="assets" element={<Assets />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:id" element={<CardDetail section="insights" />} />
          <Route path="life" element={<Life />} />
          <Route path="life/:id" element={<CardDetail section="life" />} />

          {/* Career: 대학원이 메인이라 /career는 /career/graduate로 리다이렉트 */}
          <Route path="career" element={<Navigate to="/career/graduate" replace />} />
          <Route path="career/graduate" element={<Graduate />} />
          <Route path="career/graduate/project/:id" element={<ProjectDetail />} />
          <Route path="career/graduate/log/:id" element={<ResearchLogDetail />} />
          <Route path="career/job-prep" element={<JobPrep />} />
          <Route
            path="career/job-prep/:id"
            element={<CardDetail section="career" basePath="career/job-prep" />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}
