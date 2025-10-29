# ソービズ様案件管理リポジトリ

## ドキュメント構成

### 📁 docs/
プロジェクトのドキュメント一式

```
docs/
├── requirements/          # 要件定義
│   ├── requirements.md    # 基本要件（表示要素、サイトマップ）
│   └── FAQ.md            # クライアントへの質問と回答
│
├── pages/                # ページ別仕様書
│   ├── top-page.md       # トップページ仕様・実装方針
│   ├── project-page.md   # プロジェクト詳細ページ仕様
│   └── daily-activity-page.md  # ブログ/日々の活動ページ仕様
│
└── microCMS/             # microCMS API設計
    ├── projects.json     # プロジェクトAPIスキーマ定義（JSON）
    ├── schema.md         # スキーマ詳細（表形式、データ例）
    └── er-diagram.md     # ER図（Mermaid形式）
```

### 📄 ドキュメント詳細

#### 要件定義 (docs/requirements/)
- **requirements.md**: クライアントからの初期要件
  - ホームページで実現したいこと
  - 表示要素（MVV、プロジェクト、活動写真、スケジュール等）
  - サイトマップ
- **FAQ.md**: ヒアリング結果
  - MVVの具体的内容
  - 更新頻度、編集権限に関する回答

#### ページ仕様 (docs/pages/)
- **top-page.md**: トップページ
  - ページ目的・KPI
  - 情報構成（IA）
  - UIセクション別実装方針（ヒーロー、MVV、ギャラリー、プロジェクト抜粋、ブログ抜粋、歴史、スケジュール）
  - ルーティング、データモデル、パフォーマンス戦略

- **project-page.md**: プロジェクト詳細ページ
  - プロジェクトヘッダー、概要、活動プロセス、成果、メンバー紹介、CTA
  - 動的ルーティング（/projects/[slug]）
  - ISR戦略

- **daily-activity-page.md**: ブログ/日々の活動ページ
  - インスタグラム程度の粒度の投稿機能

#### microCMS設計 (docs/microCMS/)
- **projects.json**: プロジェクトAPI スキーマ定義（JSON形式）
  - microCMSへのインポート用
  - リスト形式API
  - フィールド定義（基本情報、概要、プロセス、成果、メンバー、SEO等）

- **schema.md**: スキーマ詳細ドキュメント
  - フィールド一覧（表形式）
  - データ例
  - 選択肢の説明

- **er-diagram.md**: ER図
  - Mermaid形式のエンティティ関係図
  - データフロー図
  - 主要クエリパターン
  - インデックス推奨

## 関連リンク
- [Figmaデザイン](https://www.figma.com/design/SueA7I2vCsatvIf0s7BgB7/%E7%84%A1%E9%A1%8C?node-id=1-2&m=dev)
- [ヒアリングシート](https://docs.google.com/spreadsheets/d/1kes_jsUjmCYzL3CurdJzY3uCJvnFgUDqtTZzpUGx7A8/edit?usp=sharing)
- [Instagram参考](https://www.instagram.com/wavoc_social_business_/?hl=ja)
