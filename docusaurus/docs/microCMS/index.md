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

2. **[ブログ (blog)](./blog.md)**
   - 日常的な活動をインスタ感覚で投稿
   - 例: 学習会の様子、イベントレポート

3. **[ギャラリー (gallery)](./gallery.md)**
   - トップページのカルーセル用活動写真
   - 順序管理あり

### オブジェクト形式API

4. **[サイト設定 (site-setting)](./site-setting.md)**
   - サイト全体の設定を一元管理
   - 例: ロゴ、MVV、SNSリンク

---

## 設計方針

### シンプル性の重視
- 必要最小限のフィールド構成
- 運用負荷を考慮した設計
- 段階的な拡張を想定

### 更新頻度の考慮
- 高頻度: blog (週〜月単位)
- 中頻度: project, gallery (半年〜1年)
- 低頻度: site-setting (年1回程度)
