---
sidebar_position: 1
sidebar_label: microCMS API 概要
---

# microCMS API 設計

このセクションでは、ソービズWebサイトで使用するmicroCMS APIの定義を管理しています。

## API一覧

### リスト形式API

1. **[活動実績 (project)](./project.md)**
   - 大規模プロジェクトや活動実績を管理
   - 例: ビジコン、能登復興ボランティア、講演会

2. **[ギャラリー (gallery)](./gallery.md)**
   - トップページのカルーセル用活動写真
   - 順序管理あり

---

## 設計方針

### シンプル性の重視
- 必要最小限のフィールド構成
- 運用負荷を考慮した設計
- 段階的な拡張を想定

### 更新頻度の考慮
- 中頻度: project, gallery (半年〜1年)
