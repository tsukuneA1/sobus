---
sidebar_label: 活動実績 API定義
title: 活動実績 API定義
---

## 概要
- **API ID**: `projects`
- **API種別**: リスト形式
- **用途**: サークルの活動実績・プロジェクトを管理

## フィールド構成

#### 基本情報
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `title` | プロジェクト名 | text | ○ | プロジェクトのタイトル |
| `category` | カテゴリ | select | - | プロジェクト種別 (ビジネスコンテスト/ボランティア活動/講演会/学習会/その他) |

#### コンテンツ
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `thumbnail` | サムネイル画像 | media | ○ | 一覧表示用の画像 |
| `content` | プロジェクト概要 | textEditor | ○ | 目的・背景・活動内容の説明 |
| `gallery` | ギャラリー画像 | media (複数) | - | 追加の活動写真 |

---

## データ例

```json
{
  "id": "project-001",
  "title": "能登復興ボランティア 2024春",
  "category": "volunteer",
  "thumbnail": {
    "url": "https://images.microcms-assets.io/.../noto-thumbnail.jpg"
  },
  "content": "2024年1月に発生した能登半島地震の被災地支援を目的としたボランティア活動です。\n\n現地のニーズ調査から始まり、3ヶ月間にわたって復興支援活動を実施しました。仮設住宅での生活支援や、地域コミュニティの再建サポートなど、多岐にわたる活動に取り組みました。",
  "gallery": [
    {
      "url": "https://images.microcms-assets.io/.../activity-1.jpg"
    },
    {
      "url": "https://images.microcms-assets.io/.../activity-2.jpg"
    }
  ]
}
```

---

## 主要クエリパターン

### 1. 一覧取得（トップページ用）
```
GET /api/v1/projects?limit=3&orders=-createdAt
```
最新3件のプロジェクトを取得

### 2. 詳細取得
```
GET /api/v1/projects/[id]
```
IDでプロジェクト詳細を取得

### 3. カテゴリ別取得
```
GET /api/v1/projects?filters=category[equals]volunteer
```
カテゴリでフィルタ

### 4. 関連プロジェクト取得
```
GET /api/v1/projects?filters=category[equals][カテゴリ]&limit=3
```
同カテゴリのプロジェクトを取得（現在のプロジェクトを除外）

---

## 設計方針

### シンプル化の理由
1. **運用負荷の軽減**: 入力項目を必要最小限に絞り、5〜10分で記事作成可能
2. **柔軟性の確保**: `content`でテキスト自由記述により、小規模〜大規模プロジェクトに対応
3. **段階的拡張**: 必要に応じて後から詳細フィールド（プロセス、メンバー等）を追加可能

### 将来の拡張候補
運用状況に応じて以下のフィールド追加を検討:
- `process` (repeater) - 大規模プロジェクトのステップ管理が必要になった場合
- `projectMembers` (repeater) - メンバー紹介を構造化したい場合
- `relatedProjects` (relation) - 手動での関連付けが必要になった場合
