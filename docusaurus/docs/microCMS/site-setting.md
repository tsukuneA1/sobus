---
sidebar_label: サイト設定 API定義
title: サイト設定 API定義
---

## 概要
- **API ID**: `site-settings`
- **API種別**: オブジェクト形式
- **用途**: サイト全体の設定（MVV、ロゴ、ヒーロー、SNSリンク等）

## フィールド構成

#### ブランディング
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `logo` | ロゴ画像 | media | ○ | ヘッダー・フッター用のロゴ |
| `siteName` | サイト名 | text | ○ | サークル名（例: ソービズ） |

#### ヒーローセクション
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `heroImage` | ヒーロー画像 | media | ○ | トップページのメインビジュアル |
| `heroCopy` | ヒーローコピー | text | ○ | キャッチコピー |

#### MVV (Mission/Vision/Value)
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `mission` | ミッション | textArea | ○ | ミッション文 |
| `vision` | ビジョン | textArea | ○ | ビジョン文 |
| `values` | バリュー | textArea | ○ | バリュー（改行区切りで複数記述可） |

#### SNS・外部リンク
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `instagramUrl` | Instagram URL | text | - | Instagram DM等のリンク |
| `contactUrl` | 問い合わせURL | text | - | 入会・問い合わせフォームのURL |

---

## データ例

```json
{
  "logo": {
    "url": "https://images.microcms-assets.io/.../logo.png"
  },
  "siteName": "ソービズ",
  "heroImage": {
    "url": "https://images.microcms-assets.io/.../hero.jpg"
  },
  "heroCopy": "社会課題とビジネスの架け橋になる",
  "mission": "社会課題とビジネスの架け橋になる",
  "vision": "ボランティアをする学生/ビジネスに関心のある学生が現場で体感・実践すると共に、「ソーシャルビジネス」を大学生に伝えていく",
  "values": "やりたいことをやる\n人を巻き込んで環境を変える",
  "instagramUrl": "https://www.instagram.com/wavoc_social_business_/",
  "contactUrl": "https://forms.gle/xxxxx"
}
```

---

## 主要クエリパターン

### 1. サイト設定取得
```
GET /api/v1/site-settings
```
オブジェクト形式なので単一データを取得

---

## 設計方針

### オブジェクト形式を選択した理由
1. **単一データ**: サイト設定は1つのみ存在
2. **更新頻度**: 低頻度（年1回程度）
3. **シンプル**: リスト形式のように複数管理する必要がない
