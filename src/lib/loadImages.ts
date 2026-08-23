// src/data/images/ 안의 파일을 전부 자동으로 읽어와서, 카드 JSON의
// "images/xxx.jpg" 같은 상대경로 문자열을 실제 빌드된 에셋 URL로 바꿔준다.
// 새 이미지를 폴더에 넣고 JSON에 파일명만 적으면 자동으로 연결된다.
const imageModules = import.meta.glob<string>("../data/images/*", {
  eager: true,
  import: "default",
});

const byFilename = new Map<string, string>();
for (const [path, url] of Object.entries(imageModules)) {
  const filename = path.split("/").pop();
  if (filename) byFilename.set(filename, url);
}

/** "images/xxx.jpg" 또는 null → 실제 에셋 URL 또는 null (없거나 못 찾으면 null) */
export function resolveImage(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null;
  const filename = imagePath.split("/").pop();
  if (!filename) return null;
  return byFilename.get(filename) ?? null;
}
