---
root: true
targets: ["*"]
description: "Project overview and architecture guide"
globs: ["*"]
---

# ソービズ Webサイトプロジェクト

## プロジェクト概要

早稲田大学のソーシャルビジネスサークル「ソービズ」のWebサイト開発プロジェクトです。

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
- **TypeScript 5** - 型安全性
- **React 19** - UIライブラリ
- **Tailwind CSS** - ユーティリティファーストCSS
- **shadcn/ui** - UIコンポーネント（Card, Carousel, Dialog, Button）

### CMS
- **microCMS** - ヘッドレスCMS、REST API提供
- **@microcms/sdk** - 公式TypeScript SDK

### ホスティング
- **Vercel** - Next.js最適化、自動デプロイ、エッジCDN

### ドキュメント
- **Docusaurus 3** - 技術ドキュメント管理（`/docusaurus`）

## ディレクトリ構造

```
sobus/
├── app/                     # Next.js 15 App Router アプリケーション
│   ├── src/
│   │   ├── app/            # App Router (pages)
│   │   │   ├── layout.tsx  # ルートレイアウト
│   │   │   ├── page.tsx    # トップページ
│   │   │   └── globals.css # グローバルスタイル
│   │   ├── components/     # Reactコンポーネント
│   │   │   └── ui/        # shadcn/uiコンポーネント
│   │   ├── lib/           # ユーティリティ
│   │   │   ├── microcms.ts # microCMSクライアント
│   │   │   └── utils.ts    # ヘルパー関数
│   │   └── types/         # TypeScript型定義
│   │       └── microcms.ts # microCMS型定義
│   ├── public/            # 静的ファイル
│   ├── .env.local         # 環境変数（gitignore）
│   ├── .env.example       # 環境変数テンプレート
│   └── package.json
├── docusaurus/            # 技術ドキュメント（仕様書・設計書）
│   ├── docs/
│   │   ├── requirements/  # 要件定義
│   │   ├── pages/         # ページ実装方針
│   │   ├── microCMS/      # microCMS API定義
│   │   └── tech-stack.md
│   └── sidebars.ts
├── .rulesync/             # AI assistant統一ルール
│   ├── rules/
│   └── commands/
├── CLAUDE.md              # 開発ガイド
└── README.md
```

## Next.js App Router構成

### ページルーティング
- `app/src/app/page.tsx` - トップページ (`/`)
- `app/src/app/project/page.tsx` - プロジェクト一覧 (`/project`)
- `app/src/app/project/[slug]/page.tsx` - プロジェクト詳細 (`/project/noto-volunteer-2024`)
- `app/src/app/blog/page.tsx` - ブログ一覧 (`/blog`)
- `app/src/app/blog/[slug]/page.tsx` - ブログ詳細 (`/blog/spring-orientation-2024`)

### レイアウト
- `app/src/app/layout.tsx` - ルートレイアウト（全ページ共通）
- `app/src/app/project/layout.tsx` - プロジェクトセクション共通レイアウト（必要に応じて）

### コンポーネント配置
- `app/src/components/ui/` - shadcn/uiコンポーネント（Button, Card等）
- `app/src/components/` - カスタムコンポーネント（Header, Footer, ProjectCard等）

### データフェッチ
- `app/src/lib/microcms.ts` - microCMSクライアントの初期化
- Server Componentで直接データフェッチ（async/await）
- ISR対応（revalidate設定）

## 開発方針

### パフォーマンス重視
- SSG/ISR による高速ページ生成
- CDNによる画像配信最適化
- クリティカルCSSの最適化

### 運用負荷の軽減
- microCMSで非エンジニアでも編集可能
- シンプルなAPI設計（5〜10分で記事作成可能）
- 段階的な機能拡張

### SEO対策
- 適切なメタタグ・OGP設定
- 構造化データ（Schema.org）
- Next.js の自動最適化機能活用

## 参考リンク

- **Figmaデザイン**: https://www.figma.com/design/SueA7I2vCsatvIf0s7BgB7/
- **Instagram参考**: https://www.instagram.com/wavoc_social_business_/
- **技術ドキュメント**: `/docusaurus/docs/`
