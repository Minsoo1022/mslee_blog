import { HashRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Assets from "./pages/Assets";
import Insights from "./pages/Insights";
import Career from "./pages/Career";
import Life from "./pages/Life";
import CardDetail from "./pages/CardDetail";

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
          <Route path="career" element={<Career />} />
          <Route path="career/:id" element={<CardDetail section="career" />} />
          <Route path="life" element={<Life />} />
          <Route path="life/:id" element={<CardDetail section="life" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
