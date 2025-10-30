# Claude Code向けプロジェクトガイド

このドキュメントは、Claude Codeがこのプロジェクトを理解し、効率的に作業するための情報をまとめたものです。

## プロジェクト概要

### 目的
早稲田大学のソーシャルビジネスサークル「ソービズ」のWebサイト開発

### ターゲットユーザー
- **学生**: 入会検討中の大学生（活動内容の理解 → 入会導線）
- **社会人**: 協賛/支援を検討する社会人（団体の信頼性・活動実態の確認）

### 主要機能
1. プロジェクト実績の紹介（ビジコン、ボランティア、講演会等）
2. 日々の活動ブログ（インスタ感覚の投稿）
3. MVV（Mission/Vision/Value）の表示
4. 活動写真ギャラリー
5. 年間スケジュール（Google Calendar連携予定）

## 技術スタック

### フロントエンド
- **Next.js 15** (App Router) - SSG/ISR対応
- **TypeScript 5**
- **React 19**
- **Tailwind CSS** - スタイリング
- **shadcn/ui** - UIコンポーネント（Card, Carousel, Dialog, Button）

### CMS
- **microCMS** - ヘッドレスCMS
- **@microcms/sdk** - 公式SDK

### ホスティング
- **Vercel** - Next.js最適化、自動デプロイ

### ドキュメント
- **Docusaurus 3** - 技術ドキュメント管理

## ディレクトリ構造

```
sobus/
├── docusaurus/              # 技術ドキュメント（仕様書・設計書）
│   ├── docs/
│   │   ├── index.md         # ドキュメントトップ
│   │   ├── requirements/    # 要件定義
│   │   │   ├── requirements.md
│   │   │   └── FAQ.md
│   │   ├── pages/           # ページ実装方針
│   │   │   ├── top-page.md
│   │   │   ├── project-page.md
│   │   │   └── daily-activity-page.md
│   │   ├── microCMS/        # microCMS API定義
│   │   │   ├── index.md     # API概要
│   │   │   ├── project.md   # 活動実績API
│   │   │   ├── blog.md      # ブログAPI
│   │   │   ├── site-setting.md  # サイト設定API
│   │   │   └── gallery.md   # ギャラリーAPI
│   │   └── tech-stack.md    # 技術選定
│   └── sidebars.ts          # サイドバー構成
└── README.md                # プロジェクトREADME
```

## microCMS API設計

### 設計方針
- **シンプル性の重視**: 必要最小限のフィールド構成
- **運用負荷の軽減**: 5〜10分で記事作成可能
- **段階的拡張**: 必要に応じて後からフィールド追加

### API一覧

#### 1. project (リスト形式) - 活動実績
**更新頻度**: 半年〜1年に1回

| フィールド | 種別 | 必須 | 説明 |
|-----------|------|------|------|
| title | text | ○ | プロジェクト名 |
| slug | text | ○ | URL識別子 |
| status | select | ○ | published/archived |
| category | select | - | カテゴリ |
| period | text | ○ | 実施期間 |
| members | number | - | 参加人数 |
| heroImage | media | ○ | メイン画像 |
| description | richEditor | ○ | プロジェクト概要 |
| gallery | media[] | - | ギャラリー画像 |
| achievements | textArea | - | 成果 |

#### 2. blog (リスト形式) - ブログ
**更新頻度**: 週〜月単位

| フィールド | 種別 | 必須 | 説明 |
|-----------|------|------|------|
| title | text | ○ | タイトル |
| slug | text | ○ | URL識別子 |
| status | select | ○ | published/draft |
| category | select | - | カテゴリ |
| thumbnail | media | ○ | サムネイル画像 |
| content | richEditor | ○ | 本文 |
| gallery | media[] | - | ギャラリー画像 |

#### 3. site-setting (オブジェクト形式) - サイト設定
**更新頻度**: 年1回程度

| フィールド | 種別 | 必須 | 説明 |
|-----------|------|------|------|
| logo | media | ○ | ロゴ画像 |
| siteName | text | ○ | サイト名 |
| heroImage | media | ○ | ヒーロー画像 |
| heroCopy | text | ○ | キャッチコピー |
| mission | textArea | ○ | ミッション |
| vision | textArea | ○ | ビジョン |
| values | textArea | ○ | バリュー |
| instagramUrl | text | - | Instagram URL |
| contactUrl | text | - | 問い合わせURL |

#### 4. gallery (リスト形式) - ギャラリー
**更新頻度**: 半年〜1年に1回

| フィールド | 種別 | 必須 | 説明 |
|-----------|------|------|------|
| image | media | ○ | 活動写真 |
| caption | text | - | キャプション |
| order | number | ○ | 表示順序 |

## 開発ガイドライン

### ドキュメント編集時の注意点

1. **ファイル命名規則**: 単数形を使用（`project.md`, `blog.md`）
2. **リンク参照**: 相対パスで記述（例: `../microCMS/project.md`）
3. **ビルド確認**: 編集後は必ず `npm run build` でビルドエラーがないか確認

### microCMS API設計の原則

1. **過度な構造化を避ける**
   - ❌ 複雑なrepeaterフィールドの乱用
   - ✅ リッチエディタで自由記述

2. **運用者目線で設計**
   - ❌ SEO専用フィールド（初期段階では不要）
   - ✅ 基本情報だけで運用可能

3. **拡張性の担保**
   - 将来的な拡張候補を設計方針セクションに記載
   - 例: `process` (repeater), `projectMembers` (repeater)

### ページ実装方針の記述

各ページのドキュメントには以下を含める:
- **ページ目的・KPI**: ターゲットと目的を明確化
- **情報構成(IA)**: セクション別の内容
- **セクション別実装方針**: UI/CMS接続の詳細
- **ルーティング設計**: URL構造
- **データモデル**: microCMS API定義への参照リンク
- **取得・描画戦略**: SSG/ISR/キャッシュ戦略
- **パフォーマンス・SEO**: 最適化方針

## よくある作業パターン

### 新しいAPI定義を追加する場合

1. `docusaurus/docs/microCMS/` に新しい `.md` ファイルを作成
2. 以下のテンプレートを使用:
   ```markdown
   ---
   sidebar_label: [API名] API定義
   title: [API名] API定義
   ---

   ## 概要
   - **API ID**: `[api-id]`
   - **API種別**: リスト形式 or オブジェクト形式
   - **用途**: [用途の説明]

   ## フィールド構成
   [フィールド定義テーブル]

   ## データ例
   [JSON例]

   ## 主要クエリパターン
   [クエリ例]

   ## 設計方針
   [設計の意図・理由]
   ```
3. `docusaurus/sidebars.ts` の `microCMS設計` セクションに追加
4. `docusaurus/docs/microCMS/index.md` のAPI一覧に追加
5. ビルド確認: `npm run build`

### ページ仕様を追加する場合

1. `docusaurus/docs/pages/` に新しい `.md` ファイルを作成
2. テンプレートに従って記述（既存ファイルを参考）
3. `docusaurus/sidebars.ts` の `ページ実装方針` セクションに追加
4. ビルド確認

## 参考リンク

- **Figmaデザイン**: https://www.figma.com/design/SueA7I2vCsatvIf0s7BgB7/
- **ヒアリングシート**: [Google Spreadsheet]
- **Instagram参考**: https://www.instagram.com/wavoc_social_business_/

## 連絡先・質問

プロジェクトに関する質問や不明点がある場合は、以下を確認してください:
1. `docusaurus/docs/requirements/FAQ.md` - クライアントからのFAQ
2. `docusaurus/docs/requirements/requirements.md` - 初期要件定義
