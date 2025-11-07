# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

早稲田大学ソーシャルビジネスサークル「ソービズ」の公式Webサイト。Next.js 15 + microCMS + Vercelで構成された、学生向け入会導線と社会人向け協賛支援のための二階層構造を持つサイト。

## Repository Architecture

### Monorepo Structure
このリポジトリは2つの独立したプロジェクトを含むmonorepo構成:

```
sobus/
├── app/              # Next.js 15 App Router (本体アプリケーション)
├── docusaurus/       # Docusaurus 3 (技術ドキュメント)
└── .rulesync/        # AI assistant統一ルール (複数AIツール間で共有)
```

**重要**: `app/`と`docusaurus/`はそれぞれ独立した`node_modules`を持つため、コマンド実行時は必ず対象ディレクトリに移動してから実行すること。

### Data Flow & Architecture

```
microCMS (CMS)
    ↓ REST API
[app/src/lib/microcms.ts] - microCMSクライアント
    ↓ Server Component fetch
[app/src/app/**/page.tsx] - Container Component (データ取得)
    ↓ props
[app/src/components/**] - Presentational Component (UI表示)
```

**設計パターン**: Presentational/Container分離
- **Container** (`app/src/app/`): データ取得・状態管理、デフォルトexport必須
- **Presentational** (`app/src/components/`): UI表示のみ、名前付きexport

### microCMS API Structure

microCMSは3つのAPIエンドポイントで構成:

| API | エンドポイント | 用途 | 更新頻度 |
|-----|--------------|------|----------|
| `projects` | `/api/v1/projects` | 活動実績 (ビジコン、ボランティア等) | 半年〜1年 |
| `blog` | `/api/v1/blog` | 日々の活動ブログ | 週〜月 |
| `gallery` | `/api/v1/gallery` | 活動写真ギャラリー | 半年〜1年 |

**データ取得パターン**: [app/src/lib/microcms.ts](app/src/lib/microcms.ts) 経由で統一的にアクセス。Server ComponentでSSG/ISR対応。

## Common Commands

### Next.js Development (app/)
```bash
cd app
npm run dev          # 開発サーバー (http://localhost:3000)
npm run build        # プロダクションビルド (型チェック含む)
npm run start        # ビルド後のプレビュー
npm run lint         # ESLint実行
```

### Docusaurus (docusaurus/)
```bash
cd docusaurus
npm run start        # 開発サーバー (http://localhost:3001)
npm run build        # ビルド (リンク切れチェック含む)
npm run serve        # ビルド後のプレビュー
```

**重要**: ドキュメント編集後は必ず `npm run build` でリンク切れチェックを実行すること。

### Environment Setup

```bash
# 初回セットアップ
cd app && cp .env.example .env.local
# .env.local のMICROCMS_SERVICE_DOMAINとMICROCMS_API_KEYを設定

# 依存関係インストール
cd app && npm install
cd docusaurus && npm install
```

### rulesync (AI Rules Management)

このプロジェクトは[rulesync](https://github.com/dyoshikawa/rulesync)で複数AIツール (Claude Code, Cursor, Copilot等) 用のルールを一元管理:

```bash
rulesync generate    # .rulesync/rules/ → AGENTS.md/.claude/等を生成
```

**Note**: `.rulesync/rules/`を編集後は`rulesync generate`で各AIツール用ファイルを再生成する必要がある。

## Key Technical Decisions

### Next.js 15 Rendering Strategy
- **デフォルト**: Server Components (すべてのコンポーネントはサーバーサイド)
- **クライアント化**: `'use client'`は onClick/useState等のインタラクション時のみ
- **ISR**: `export const revalidate = 3600` でページごとにキャッシュ戦略を設定

### Styling System
- **Tailwind CSS 4** with custom color tokens
- **必須**: `globals.css`定義のカスタムカラー (`primary: #EB8338`, `secondary: #F7F1D4`) を使用
- **shadcn/ui**: UIコンポーネントライブラリ ([components.json](app/components.json)で設定)

### Type Safety
- **TypeScript 5**: 厳格な型チェック
- **microCMS型定義**: [app/src/types/microcms.ts](app/src/types/microcms.ts) で一元管理
- **Props型**: `type ComponentProps = { ... }` で各コンポーネントに定義

## Documentation Structure

技術仕様は`docusaurus/docs/`に体系化されている:

```
docusaurus/docs/
├── requirements/       # 要件定義・FAQ
├── pages/             # ページ実装方針 (IA, データフェッチ戦略)
└── microCMS/          # microCMS API定義 (フィールド構成, クエリ例)
```

**重要な参照先**:
- API設計詳細: [docusaurus/docs/microCMS/](docusaurus/docs/microCMS/)
- ページ実装方針: [docusaurus/docs/pages/](docusaurus/docs/pages/)
- FAQ: [docusaurus/docs/requirements/FAQ.md](docusaurus/docs/requirements/FAQ.md)

## Coding Standards

**詳細は`.rulesync/rules/01-frontend-development.md`参照**。主要ルール:

1. **Component Pattern**: Presentational (名前付きexport) / Container (デフォルトexport) 分離
2. **Function Syntax**: アロー関数で統一 (`export const Component = () => {}`)
3. **Server/Client**: デフォルトはServer Component、インタラクション時のみ`'use client'`
4. **Comments**: 最小限に。TODO/NOTE/FIXME等のプレフィックス必須
5. **DRY**: 重複コード禁止、積極的に共通化
6. **Semantic HTML**: `<header>`, `<article>`, `<nav>`等を適切に使用

## Working with Documents

### Adding New microCMS API Definition

1. Create `docusaurus/docs/microCMS/[api-name].md`
2. Use template structure (概要, フィールド構成, データ例, クエリパターン, 設計方針)
3. Update `docusaurus/sidebars.ts` (microCMS設計 section)
4. Update `docusaurus/docs/microCMS/index.md` (API一覧)
5. Verify: `cd docusaurus && npm run build`

### Adding New Page Specification

1. Create `docusaurus/docs/pages/[page-name].md`
2. Include: ページ目的, 情報構成(IA), セクション別実装方針, ルーティング設計, データモデル, 取得・描画戦略
3. Update `docusaurus/sidebars.ts` (ページ実装方針 section)
4. Verify: `cd docusaurus && npm run build`

## External Resources

- **Figma Design**: https://www.figma.com/design/SueA7I2vCsatvIf0s7BgB7/
- **Deployed Docs**: https://sobus-docusaurus.vercel.app/
- **Instagram Reference**: https://www.instagram.com/wavoc_social_business_/
