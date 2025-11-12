# ソービズ Webサイト

早稲田大学のソーシャルビジネスサークル「ソービズ」の公式Webサイトリポジトリです。

## プロジェクト構成

```
sobus/
├── app/                    # Next.js 15 App Router アプリケーション
│   ├── src/
│   │   ├── app/           # App Router (pages)
│   │   ├── components/    # Reactコンポーネント
│   │   ├── lib/          # ユーティリティ・microCMSクライアント
│   │   └── types/        # TypeScript型定義
│   ├── public/           # 静的ファイル
│   └── package.json
├── docusaurus/           # 技術ドキュメント
│   └── docs/            # 仕様書・設計書
├── .rulesync/           # AI assistant統一ルール
└── CLAUDE.md            # 開発ガイド
```

## 技術スタック

- **Next.js 16** (App Router) - フレームワーク
- **TypeScript 5** - 型安全性
- **Tailwind CSS 4** - スタイリング
- **Biome** - フォーマッター & リンター
- **microCMS** - ヘッドレスCMS
- **Vercel** - ホスティング

## ドキュメント

プロジェクトの詳細な仕様書・設計書はDocusaurusをご覧ください:

https://sobus-docusaurus.vercel.app/

## AIアシスタント用ルール

このプロジェクトは[rulesync](https://github.com/dyoshikawa/rulesync)を使用して、複数のAIコーディングアシスタント用の統一ルールを管理しています。

- **ルールソース**: `.rulesync/rules/`
- **生成ファイル**: `AGENTS.md`, `.agents/memories/`

チームメンバーは Claude Code, Cursor, GitHub Copilot, Gemini CLI など、好きなAIツールを使用できます。

## 関連リンク

- [Figmaデザイン](https://www.figma.com/design/SueA7I2vCsatvIf0s7BgB7/)
- [ヒアリングシート](https://docs.google.com/spreadsheets/d/1kes_jsUjmCYzL3CurdJzY3uCJvnFgUDqtTZzpUGx7A8/edit)
- [Instagram参考](https://www.instagram.com/wavoc_social_business_/)

## コマンド

### Next.js開発
```bash
cd app
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバー起動
npm run lint       # ESLint実行
```

### Docusaurus
```bash
cd docusaurus
npm run start      # 開発サーバー起動
npm run build      # ビルド
npm run serve      # ビルド後のプレビュー
```

### rulesync
```bash
# ルールのみ生成
npx rulesync generate --targets "claudecode,cursor,copilot" --features "rules"

# ルール + コマンド生成（推奨）
npx rulesync generate --targets "claudecode,cursor,copilot" --features "rules,commands" --simulated-commands

# 全ツール生成（17種類）
npx rulesync generate --targets "*" --features "rules,commands" --simulated-commands
```
