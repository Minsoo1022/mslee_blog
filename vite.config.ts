import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages는 https://<user>.github.io/<repo>/ 서브경로에서 서빙되므로
  // 상대경로 base를 사용해 저장소 이름과 무관하게 동작하도록 한다.
  // (라우팅은 App.tsx에서 HashRouter로 처리)
  base: './',
})
