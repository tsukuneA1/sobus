---
sidebar_label: スキーマ定義
---

# microCMS スキーマ定義

## プロジェクト (活動実績) API

### 概要
- **API ID**: `projects`
- **API種別**: リスト形式
- **用途**: サークルの活動実績・プロジェクトを管理

### フィールド構成

#### 基本情報
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `title` | プロジェクト名 | text | ○ | プロジェクトのタイトル |
| `slug` | スラッグ | text | ○ | URL用の識別子 (例: noto-volunteer-2024) |
| `status` | ステータス | select | ○ | 公開状態 (published/archived) |
| `category` | カテゴリ | select | - | プロジェクト種別 |

##### ステータス選択肢
- `published`: 公開中
- `archived`: アーカイブ

##### カテゴリ選択肢
- `business-contest`: ビジネスコンテスト
- `volunteer`: ボランティア活動
- `lecture`: 講演会
- `learning`: 学習会
- `other`: その他

#### 期間・規模
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `period` | 実施期間 | text | ○ | 実施時期 (例: 2024年6月〜8月) |
| `startDate` | 開始日 | date | - | ソート・フィルタ用 |
| `endDate` | 終了日 | date | - | ソート・フィルタ用 |
| `members` | 参加人数 | number | ○ | プロジェクト参加人数 |

#### メディア
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `heroImage` | ヒーロー画像 | media | ○ | プロジェクトのメイン画像 |
| `galleryImages` | ギャラリー画像 | media (複数) | - | 追加画像 |

#### プロジェクト概要 (overview - repeater)
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `section` | セクション | select | ○ | purpose/background/challenge |
| `content` | 内容 | richEditor | ○ | セクションの本文 |

##### セクション選択肢
- `purpose`: 目的
- `background`: 背景
- `challenge`: 課題設定

#### 活動内容・プロセス (process - repeater)
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `order` | 順序 | number | ○ | 表示順序 |
| `stepTitle` | ステップタイトル | text | ○ | ステップの見出し |
| `description` | 説明 | richEditor | ○ | ステップの詳細内容 |
| `images` | 画像 | media (複数) | - | ステップに関連する画像 |
| `date` | 実施日 | text | - | このステップの実施日 |

#### 成果 (results - repeater)
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `label` | 成果項目名 | text | ○ | 成果の名称 (例: 参加者数) |
| `value` | 数値 | text | ○ | 成果の数値 (例: 50) |
| `unit` | 単位 | text | - | 単位 (例: 名、回、件) |
| `description` | 補足説明 | textArea | - | 成果の詳細説明 |

#### 学び
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `learnings` | 学び・気づき | richEditor | - | プロジェクトを通じて得られた学び |

#### メンバー紹介 (projectMembers - repeater)
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `name` | 名前 | text | ○ | メンバー名 |
| `role` | 役割 | text | - | プロジェクト内での役割 |
| `comment` | コメント | textArea | - | メンバーからの一言 |
| `avatar` | アバター画像 | media | - | プロフィール画像 |

#### 関連・タグ
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `relatedProjects` | 関連プロジェクト | relation (複数) | - | 他のプロジェクトへの参照 |
| `tags` | タグ | text (複数) | - | 検索・分類用タグ |

#### SEO/OGP
| フィールドID | 名前 | 種別 | 必須 | 説明 |
|------------|------|------|------|------|
| `seoTitle` | SEOタイトル | text | - | メタタイトル (未入力時はtitleを使用) |
| `seoDescription` | SEO説明文 | textArea | - | メタディスクリプション |
| `ogImage` | OGP画像 | media | - | SNSシェア用画像 (未入力時はheroImageを使用) |

---

## データ例

```json
{
  "id": "project-001",
  "title": "能登復興ボランティア 2024春",
  "slug": "noto-volunteer-2024-spring",
  "status": "published",
  "category": "volunteer",
  "period": "2024年3月〜5月",
  "startDate": "2024-03-01",
  "endDate": "2024-05-31",
  "members": 15,
  "heroImage": {
    "url": "https://images.microcms-assets.io/.../noto-hero.jpg"
  },
  "overview": [
    {
      "section": "purpose",
      "content": "<p>能登半島地震の被災地支援...</p>"
    },
    {
      "section": "background",
      "content": "<p>2024年1月に発生した...</p>"
    }
  ],
  "process": [
    {
      "order": 1,
      "stepTitle": "事前準備・計画立案",
      "description": "<p>現地のニーズ調査...</p>",
      "date": "2024年3月"
    }
  ],
  "results": [
    {
      "label": "ボランティア参加回数",
      "value": "10",
      "unit": "回",
      "description": "3ヶ月間で計10回の現地訪問を実施"
    }
  ],
  "learnings": "<p>現場での実践を通じて...</p>",
  "projectMembers": [
    {
      "name": "山田太郎",
      "role": "リーダー",
      "comment": "現地の方々との繋がりが財産になりました"
    }
  ],
  "tags": ["ボランティア", "能登", "復興支援"]
}
```
