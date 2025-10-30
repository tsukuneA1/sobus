---
sidebar_label: ブログ API定義
title: ブログ API定義
---

## 概要
- **API ID**: `blog`
- **API種別**: リスト形式
- **用途**: インスタ投稿レベルの日常的な活動を発信

## フィールド構成

#### 基本情報
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `title` | タイトル | text | ○ | 記事のタイトル |
| `slug` | スラッグ | text | ○ | URL用の識別子 (例: spring-orientation-2024) |
| `status` | ステータス | select | ○ | 公開状態 (published/draft) |
| `category` | カテゴリ | select | - | 活動種別 (ビジネスコンテスト/ボランティア活動/講演会/学習会/イベント/日常活動/その他) |

#### コンテンツ
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `thumbnail` | サムネイル画像 | media | ○ | 一覧表示用の画像 |
| `content` | 本文 | richEditor | ○ | 記事本文 |
| `gallery` | ギャラリー画像 | media (複数) | - | 追加の写真 |

---

## データ例

```json
{
  "id": "blog-001",
  "title": "新入生歓迎会を開催しました！",
  "slug": "spring-orientation-2024",
  "status": "published",
  "category": "event",
  "thumbnail": {
    "url": "https://images.microcms-assets.io/.../orientation-thumb.jpg"
  },
  "content": "<p>2024年4月、新入生歓迎会を開催しました！</p><p>今年は30名の新入生が参加してくれて、ソーシャルビジネスについてのワークショップや先輩との交流会を行いました。</p>",
  "gallery": [
    {
      "url": "https://images.microcms-assets.io/.../orientation-1.jpg"
    },
    {
      "url": "https://images.microcms-assets.io/.../orientation-2.jpg"
    }
  ]
}
```

---

## 主要クエリパターン

### 1. 一覧取得（トップページ用）
```
GET /api/v1/blog?limit=6&filters=status[equals]published&orders=-createdAt
```
公開中の記事を最新6件取得

### 2. 詳細取得
```
GET /api/v1/blog/[slug]
```
スラッグで記事詳細を取得

### 3. カテゴリ別取得
```
GET /api/v1/blog?filters=category[equals]volunteer,status[equals]published
```
カテゴリでフィルタ

---

## 設計方針

### シンプル化の理由
1. **更新頻度の高さ**: インスタ感覚で投稿できる軽量設計
2. **柔軟性**: リッチテキストで自由な表現が可能
3. **運用負荷**: 著者情報、タグ、アーカイブ、人気記事などは初期段階では不要
