---
root: true
targets: ["*"]
description: "microCMS API design principles and conventions"
globs: ["**/microCMS/**", "**/docs/microCMS/**"]
---

# microCMS API設計原則

## 命名規則

### API名・ファイル名は単数形
- ✅ `project`, `blog`, `site-setting`, `gallery`
- ❌ `projects`, `blogs`, `site-settings`, `galleries`

### フィールドIDはキャメルケース
- ✅ `heroImage`, `siteSettings`, `startDate`
- ❌ `hero_image`, `site_settings`, `start_date`

## フィールド設計原則

### 1. シンプル性の重視
- **必要最小限のフィールド構成**
- 運用者が5〜10分で記事作成できることを目標
- 複雑すぎるスキーマは避ける

### 2. 過度な構造化を避ける
```markdown
❌ 避けるべきパターン:
- repeaterフィールドの乱用
- 細かすぎる正規化（overview, process, resultsなど）
- SEO専用フィールド（初期段階では不要）

✅ 推奨パターン:
- リッチエディタで自由記述
- シンプルなtextArea
- 基本情報のみで運用可能
```

### 3. 運用負荷を考慮
- タグ、著者情報、アーカイブなどは初期段階では不要
- 更新頻度が低い情報はオブジェクト形式を検討
- カテゴリは選択肢を絞る（5〜7個程度）

## API種別の選択基準

### リスト形式を選ぶケース
- 複数のエントリーが存在する（例: project, blog, gallery）
- 定期的に追加・更新される
- 一覧表示・フィルタリングが必要

### オブジェクト形式を選ぶケース
- 単一のデータのみ存在する（例: site-setting）
- 更新頻度が非常に低い（年1回程度）
- サイト全体の設定・設定値

## 実装例

### Good Example: シンプルなblog API
```markdown
#### 基本情報
| フィールドID | 種別 | 必須 |
|------------|------|------|
| title | text | ○ |
| slug | text | ○ |
| status | select | ○ |
| category | select | - |

#### コンテンツ
| フィールドID | 種別 | 必須 |
|------------|------|------|
| thumbnail | media | ○ |
| content | richEditor | ○ |
| gallery | media[] | - |
```

### Bad Example: 過度に構造化されたAPI
```markdown
❌ 避けるべき:
- overview (repeater) - 目的/背景/課題
- process (repeater) - ステップごとの詳細
- results (repeater) - 成果指標
- projectMembers (repeater) - メンバー情報
- SEO/OGP専用フィールド群
```

## フィールド定義のテンプレート

新しいAPI定義を作成する際は、以下の構成に従う:

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
[テーブル形式で記述]

## データ例
[JSON例]

## 主要クエリパターン
[よく使うクエリ例]

## 設計方針
[シンプル化の理由、将来の拡張候補]
```

## 段階的拡張の考え方

初期段階では最小限、必要に応じて拡張:

```markdown
### 将来の拡張候補
運用状況に応じて以下のフィールド追加を検討:
- `process` (repeater) - 大規模プロジェクトのステップ管理
- `projectMembers` (repeater) - メンバー紹介を構造化
- `relatedProjects` (relation) - 手動での関連付け
```

## microCMS SDK使用時の注意

### TypeScript型定義
- microCMSの型定義は自動生成されないため、手動で定義
- API IDは単数形に合わせる

### クエリの書き方
```typescript
// Good: フィルタとソートを明示
const projects = await client.get({
  endpoint: 'project',
  queries: {
    filters: 'status[equals]published',
    orders: '-createdAt',
    limit: 10,
  },
});

// 関連データの取得は同カテゴリで自動化
const related = await client.get({
  endpoint: 'project',
  queries: {
    filters: `category[equals]${currentProject.category}`,
    limit: 3,
  },
});
```
