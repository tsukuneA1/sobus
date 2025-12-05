---
name: review
description: Code review checklist for this project
---

以下のチェックリストに従ってコードレビューを実施してください。

## 1. フォーマット・Lint

- [ ] `npm run format` (Biome) が通っているか
- [ ] `npm run lint` (ESLint) が通っているか
- [ ] インデント、改行、スペースが統一されているか

## 2. フロントエンドコーディングルール（`.rulesync/rules/01-frontend-development.md`）

### コンポーネント設計
- [ ] Presentational/Container パターンに従っているか
- [ ] ページコンポーネント（`app/**/page.tsx`）以外は **named export** を使用しているか
- [ ] アロー関数で統一されているか (`export const Component = () => {}`)
- [ ] Props型が明示的に定義されているか (`type ComponentProps = {...}`)

### Server/Client Components
- [ ] 不要な `'use client'` を使っていないか（インタラクションがない場合はServer Componentのまま）
- [ ] データ取得はServer Componentで行っているか

### スタイリング
- [ ] `globals.css` のカスタムカラー (`primary`, `secondary`) を使用しているか
- [ ] ハードコードされたカラー値 (`#EB8338`, `orange-500` 等) を使っていないか
- [ ] Tailwind CSSのユーティリティクラスを使用しているか（インラインスタイル禁止）

### DRY原則
- [ ] 重複コードがないか（同じロジックを3回以上書いていないか）
- [ ] 共通化できる部分はコンポーネント化・関数化されているか

### セマンティックHTML
- [ ] `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` 等を適切に使っているか
- [ ] すべて `<div>` で構成されていないか

### コメント
- [ ] 不要なコメント（コードを説明するだけ）がないか
- [ ] コメントに適切なプレフィックス（`TODO:`, `NOTE:`, `FIXME:`, `WARNING:`）がついているか
- [ ] `TODO` には GitHub issue リンクがあるか

### 命名
- [ ] コンポーネント名は PascalCase か
- [ ] ファイル名とコンポーネント名が一致しているか
- [ ] 変数名・関数名は役割を明確に表しているか

## 3. Docusaurus仕様との整合性

### データモデル
- [ ] `docusaurus/docs/microCMS/*.md` で定義された型と実装が一致しているか
- [ ] microCMS APIのフィールド名が仕様通りか（例: `thumbnail` vs `sumbnail` のtypo）

### ページ実装方針
- [ ] `docusaurus/docs/pages/*.md` で定義されたIA（情報構成）に従っているか
- [ ] データ取得戦略（SSG/ISR）が仕様通りか
- [ ] ルーティング設計が仕様通りか

### 不整合チェック
- [ ] 実装とドキュメントで食い違いがある場合、どちらかを修正する必要があるか
- [ ] 新機能を追加した場合、Docusaurusのドキュメントも更新したか

## 4. 型安全性

- [ ] `app/src/types/microcms.ts` の型定義を使用しているか
- [ ] `any` 型を使っていないか
- [ ] TypeScriptの型エラーがないか (`npm run build` で確認)

## 5. パフォーマンス

- [ ] Server Componentを最大限活用しているか
- [ ] 不要なクライアントコンポーネント化をしていないか
- [ ] 画像は適切に最適化されているか（Next.js の `<Image>` コンポーネント使用）

## レビュー後のアクション

すべてのチェックが完了したら:
1. 問題点を指摘
2. 修正が必要な箇所には具体的な修正案を提示
3. 仕様と実装の不整合がある場合は、ドキュメントの更新も提案
