---
sidebar_label: ギャラリー API定義
title: ギャラリー API定義
---

## 概要
- **API ID**: `gallery`
- **API種別**: リスト形式
- **用途**: トップページの活動写真カルーセル

## フィールド構成

#### 基本情報
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `image` | 画像 | media | ○ | 活動写真 |
| `caption` | キャプション | text | - | 写真の説明 |
| `order` | 表示順序 | number | ○ | カルーセルの表示順（昇順） |

---

## データ例

```json
{
  "contents": [
    {
      "id": "gallery-001",
      "image": {
        "url": "https://images.microcms-assets.io/.../activity-1.jpg"
      },
      "caption": "能登復興ボランティア活動の様子",
      "order": 1
    },
    {
      "id": "gallery-002",
      "image": {
        "url": "https://images.microcms-assets.io/.../activity-2.jpg"
      },
      "caption": "ビジネスコンテストでのプレゼンテーション",
      "order": 2
    },
    {
      "id": "gallery-003",
      "image": {
        "url": "https://images.microcms-assets.io/.../activity-3.jpg"
      },
      "caption": "学習会での議論の様子",
      "order": 3
    }
  ]
}
```

---

## 主要クエリパターン

### 1. ギャラリー画像取得（トップページ用）
```
GET /api/v1/gallery?orders=order
```
表示順序でソートして全件取得

---

## 設計方針

### シンプル化の理由
1. **更新頻度**: 半年〜1年に1回程度の低頻度
2. **管理容易性**: 順序を数値で管理、追加・削除が簡単
3. **柔軟性**: キャプションはオプションで、画像のみでも運用可能
