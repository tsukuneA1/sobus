---
description: Frontend development standards for Next.js App Router
applyTo: '**/app/**,**/src/**'
---
# フロントエンド開発規約

## コンポーネント設計

### Presentational/Containerパターン

コンポーネントは**Presentational/Container**パターンに従って設計する。

#### Presentationalコンポーネント（表示コンポーネント）
- **役割**: UIの見た目のみを担当
- **特徴**: propsで受け取ったデータを表示するだけ
- **配置**: `src/components/` 以下

```typescript
// ✅ Good: Presentational Component
type ProjectCardProps = {
  title: string;
  category: string;
  thumbnail: string;
};

const ProjectCard = ({ title, category, thumbnail }: ProjectCardProps) => {
  return (
    <div className="card">
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <span>{category}</span>
    </div>
  );
};

export { ProjectCard };
```

#### Containerコンポーネント（ロジックコンポーネント）
- **役割**: データ取得・状態管理を担当
- **特徴**: APIコール、データ加工、状態管理を行い、Presentationalコンポーネントにpropsを渡す
- **配置**: `src/app/` 以下（ページコンポーネント）

```typescript
// ✅ Good: Container Component
const ProjectListPage = async () => {
  // データ取得
  const projects = await getProjects();

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          category={project.category}
          thumbnail={project.thumbnail.url}
        />
      ))}
    </div>
  );
};

export default ProjectListPage;
```

### Export規約

#### Named Export（名前付きエクスポート）
- **使用対象**: すべてのPresentationalコンポーネント、ユーティリティ関数、型定義
- **理由**: 再利用性、明示性、リファクタリングの容易性

```typescript
// ✅ Good: Named Export
export const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

export const Card = ({ title }: CardProps) => {
  return <div>{title}</div>;
};
```

```typescript
// ❌ Bad: Default Export
const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

export default Button;
```

#### Default Export（デフォルトエクスポート）
- **使用対象**: ページコンポーネント（`src/app/**/page.tsx`）のみ
- **理由**: Next.js App Routerの要件

```typescript
// ✅ Good: ページコンポーネントのみDefault Export
const TopPage = async () => {
  return <div>Top Page</div>;
};

export default TopPage;
```

## コンポーネント記法

### アロー関数で統一

すべてのコンポーネント宣言は**アロー関数**で統一する。

```typescript
// ✅ Good: アロー関数
export const ProjectCard = ({ title }: ProjectCardProps) => {
  return <div>{title}</div>;
};
```

```typescript
// ❌ Bad: function宣言
export function ProjectCard({ title }: ProjectCardProps) {
  return <div>{title}</div>;
}
```

### 型定義

#### Props型の定義
- コンポーネントごとに明示的に型を定義
- `type`を使用（`interface`は使わない）

```typescript
// ✅ Good
type ProjectCardProps = {
  title: string;
  category: string;
  thumbnail: string;
};

export const ProjectCard = ({ title, category, thumbnail }: ProjectCardProps) => {
  return <div>{title}</div>;
};
```

```typescript
// ❌ Bad: 型定義なし
export const ProjectCard = ({ title, category, thumbnail }) => {
  return <div>{title}</div>;
};
```

## サーバー/クライアントコンポーネント

### 基本方針: サーバーコンポーネントを優先

Next.js 15では**すべてのコンポーネントがデフォルトでサーバーコンポーネント**。

#### サーバーコンポーネント（デフォルト）
- **使用条件**: データ取得、静的UI、SEOが必要な部分
- **メリット**: バンドルサイズ削減、初期表示高速化、SEO最適化

```typescript
// ✅ Good: サーバーコンポーネント（'use client'なし）
const ProjectList = async () => {
  const projects = await getProjects();

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
```

#### クライアントコンポーネント
- **使用条件**: ユーザーインタラクション（onClick、useState、useEffect等）が必要な場合のみ
- **宣言**: ファイル先頭に`'use client'`を記述

```typescript
// ✅ Good: インタラクションが必要な場合のみクライアントコンポーネント
'use client';

import { useState } from 'react';

export const SearchForm = () => {
  const [query, setQuery] = useState('');

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
```

```typescript
// ❌ Bad: インタラクションがないのにクライアントコンポーネント
'use client';

export const ProjectCard = ({ title }: ProjectCardProps) => {
  return <div>{title}</div>;  // インタラクションなし
};
```

### 判断基準

| 機能 | サーバー | クライアント |
|-----|---------|------------|
| データ取得（fetch） | ✅ | ❌ |
| 静的UI | ✅ | ❌ |
| onClick等のイベント | ❌ | ✅ |
| useState/useEffect | ❌ | ✅ |
| useRouter（ナビゲーション） | ❌ | ✅ |
| フォーム送信（インタラクション） | ❌ | ✅ |

## コーディング原則

### DRY原則（Don't Repeat Yourself）

同じコードを繰り返さない。共通化できる部分は積極的にコンポーネント化・関数化する。

```typescript
// ❌ Bad: 同じコードの繰り返し
const ProjectPage = () => {
  return (
    <div>
      <div className="card">
        <h3>Project 1</h3>
        <p>Description 1</p>
      </div>
      <div className="card">
        <h3>Project 2</h3>
        <p>Description 2</p>
      </div>
    </div>
  );
};
```

```typescript
// ✅ Good: コンポーネント化
type CardProps = {
  title: string;
  description: string;
};

const Card = ({ title, description }: CardProps) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const ProjectPage = () => {
  const projects = [
    { title: 'Project 1', description: 'Description 1' },
    { title: 'Project 2', description: 'Description 2' },
  ];

  return (
    <div>
      {projects.map((project, i) => (
        <Card key={i} {...project} />
      ))}
    </div>
  );
};
```

### セマンティックHTML

HTMLタグは意味に応じて適切に使い分ける。

```typescript
// ✅ Good: セマンティックなHTML
export const Article = ({ title, content }: ArticleProps) => {
  return (
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <section>
        <p>{content}</p>
      </section>
    </article>
  );
};
```

```typescript
// ❌ Bad: すべてdiv
export const Article = ({ title, content }: ArticleProps) => {
  return (
    <div>
      <div>
        <div>{title}</div>
      </div>
      <div>
        <div>{content}</div>
      </div>
    </div>
  );
};
```

#### セマンティックタグの使い分け

| タグ | 用途 |
|-----|------|
| `<header>` | ページ・セクションのヘッダー |
| `<nav>` | ナビゲーション |
| `<main>` | メインコンテンツ |
| `<section>` | セクション区切り |
| `<article>` | 独立したコンテンツ（記事等） |
| `<aside>` | サイドバー、補足情報 |
| `<footer>` | フッター |
| `<h1>〜<h6>` | 見出し（階層に応じて） |

## ディレクトリ構造

```
app/src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # トップページ（Container）
│   └── projects/
│       └── page.tsx       # プロジェクト一覧（Container）
├── components/            # Presentationalコンポーネント
│   ├── ui/               # shadcn/uiコンポーネント
│   ├── ProjectCard.tsx
│   └── Header.tsx
├── lib/                   # ユーティリティ
│   ├── microcms.ts       # microCMSクライアント
│   └── utils.ts          # ヘルパー関数
└── types/                # 型定義
    └── microcms.ts       # microCMS型定義
```

## スタイリング

### Tailwind CSS

- **基本**: Tailwind CSSでスタイリング
- **カスタムCSS**: 極力避け、Tailwindのユーティリティクラスで対応

#### カスタムカラーの使用（必須）

`globals.css`で定義されたカスタムカラーを**必ず使用**すること。

**現在定義されているカラー**:
- `primary`: `#EB8338` - ブランドカラー（オレンジ）
- `secondary`: `#F7F1D4` - セカンダリカラー（ベージュ）

```typescript
// ✅ Good: カスタムカラーを使用
export const Card = ({ title }: CardProps) => {
  return (
    <div className="bg-primary text-primary-foreground rounded-lg p-4">
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
};

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
      {children}
    </button>
  );
};
```

```typescript
// ❌ Bad: ハードコードされたカラー
export const Card = ({ title }: CardProps) => {
  return (
    <div className="bg-orange-500 text-white rounded-lg p-4">
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
};

// ❌ Bad: HEXコードを直接使用
export const Button = ({ children }: ButtonProps) => {
  return (
    <button style={{ backgroundColor: '#EB8338' }}>
      {children}
    </button>
  );
};
```

#### カラー使用ガイドライン

| 用途 | 使用するカラー | クラス例 |
|-----|--------------|---------|
| メインアクション（CTA） | `primary` | `bg-primary text-primary-foreground` |
| 背景・補助要素 | `secondary` | `bg-secondary text-secondary-foreground` |
| テキスト | `foreground` | `text-foreground` |
| 背景 | `background` | `bg-background` |
| ボーダー | `border` | `border-border` |
| ミュート | `muted` | `bg-muted text-muted-foreground` |

#### カスタムカラーの確認方法

スタイリング前に必ず`app/src/app/globals.css`の`:root`セクションを確認すること。

```css
/* app/src/app/globals.css */
:root {
  --primary: #EB8338;        /* メインカラー */
  --secondary: #F7F1D4;      /* セカンダリカラー */
  --background: oklch(1 0 0); /* 背景色 */
  --foreground: oklch(0.145 0 0); /* テキスト色 */
  /* ... */
}
```

新しいカラーを追加する場合は、`globals.css`に定義してから使用する。

```typescript
// ❌ Bad: インラインスタイル
export const Card = ({ title }: CardProps) => {
  return (
    <div style={{ borderRadius: '8px', padding: '16px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</h3>
    </div>
  );
};
```

## 命名規約

### コンポーネント名
- **PascalCase**: `ProjectCard`, `ProjectList`
- **説明的**: 役割が明確に分かる名前

### ファイル名
- **PascalCase**: `ProjectCard.tsx`, `ProjectList.tsx`
- **コンポーネント名と一致**: ファイル名 = コンポーネント名

### Props型名
- **コンポーネント名 + Props**: `ProjectCardProps`, `ProjectListProps`

```typescript
// ✅ Good
type ProjectCardProps = {
  title: string;
};

export const ProjectCard = ({ title }: ProjectCardProps) => {
  return <div>{title}</div>;
};
```

## データ取得

### Server Componentsでのfetch

```typescript
// ✅ Good: Server Componentでのデータ取得
import { getProjects } from '@/lib/microcms';

const ProjectListPage = async () => {
  const projects = await getProjects();

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default ProjectListPage;
```

### キャッシュ戦略

Next.js 15では`fetch`のキャッシュはデフォルトで無効化されている。
必要に応じて`revalidate`オプションを使用。

```typescript
// ISR（Incremental Static Regeneration）
export const revalidate = 3600; // 1時間ごとに再生成

const ProjectListPage = async () => {
  const projects = await getProjects();
  return <div>{/* ... */}</div>;
};

export default ProjectListPage;
```

## コメント規約

### 基本方針: コメントは最小限に

**コードは自己文書化されているべき**。不要なコメントは書かない。

#### ❌ 禁止されるコメント

```typescript
// ❌ Bad: コードを説明するだけのコメント
// プロジェクトカードを返す
export const ProjectCard = ({ title }: ProjectCardProps) => {
  return <div>{title}</div>;
};

// ❌ Bad: 変数名を繰り返すだけ
// タイトル
const title = project.title;

// ❌ Bad: 何をするか分からないコメント
// 処理
const result = processData(data);
```

#### ✅ 許可されるコメント

コメントには**必ずプレフィックス**をつけ、明確な意図を示す。

##### 1. TODO（要実装・修正）
GitHubのissueリンク付きで記載する。

```typescript
// TODO: カテゴリフィルタ機能を実装 (https://github.com/user/repo/issues/123)
export const ProjectList = () => {
  // ...
};
```

##### 2. NOTE（補足説明）
非自明なロジックや、なぜそうしたかの理由を説明。

```typescript
// NOTE: microCMSのリッチエディタはHTMLを返すため、dangerouslySetInnerHTMLを使用
<div dangerouslySetInnerHTML={{ __html: project.description }} />

// NOTE: Next.js 15ではfetchのキャッシュがデフォルトで無効化されているため、
//       ISRを使う場合は明示的にrevalidateを指定する必要がある
export const revalidate = 3600;
```

##### 3. FIXME（既知のバグ）
一時的な回避策や、既知の問題を明示。

```typescript
// FIXME: 画像が読み込めない場合のフォールバック処理を追加 (https://github.com/user/repo/issues/789)
<img src={project.thumbnail.url} alt={project.title} />
```

##### 4. WARNING（警告）
削除・変更してはいけない重要な注意事項。

```typescript
// WARNING: この関数はSSR時にのみ実行される。クライアント側では動作しない
export const getServerSideData = async () => {
  // ...
};
```

### JSDocコメント

公開API（exportされた関数・型）には**JSDocを推奨**。

```typescript
/**
 * プロジェクト一覧を取得
 * @param queries - microCMSクエリパラメータ
 * @returns プロジェクト配列
 * @example
 * ```typescript
 * const projects = await getProjects({ limit: 3, orders: '-createdAt' });
 * ```
 */
export const getProjects = async (queries?: MicroCMSQueries) => {
  // ...
};
```

### コメント削除の基準

以下の場合はコメントではなく**コードで表現**する。

| コメント例 | 改善方法 |
|-----------|---------|
| `// ユーザー名を取得` | 関数名を`getUserName()`にする |
| `// データが空の場合` | `if (isEmpty(data))`のようなヘルパー関数を作る |
| `// ローディング中` | `isLoading`のような変数名にする |

```typescript
// ❌ Bad
// データが空かチェック
if (data.length === 0) {
  // ...
}

// ✅ Good
const isEmpty = data.length === 0;
if (isEmpty) {
  // ...
}

// ✅ Better
if (isEmpty(data)) {
  // ...
}
```

## コードフォーマット・Lint

### Biome設定

このプロジェクトでは**Biome**をフォーマッター・リンターとして使用（Prettier/ESLint代替）。

**設定ファイル**: `app/biome.json`

```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  }
}
```

**コマンド**:
```bash
npm run format  # コードフォーマット
npm run check   # フォーマット + Lint + 自動修正
```

**重要**: `globals.css`はBiomeの対象外（`files.ignore`に追加済み）

## 静的アセット管理

### assetsディレクトリ構成

SVGやロゴなどの静的アセットは`src/assets/`に配置:

```
src/assets/
├── logo/
│   ├── social-business-logo.svg  # メインロゴ
│   └── footer-logo.svg           # フッターロゴ
└── guide-button/
    └── next.svg                  # UIアイコン
```

### SVG画像の使用方法

**Next.js Imageコンポーネント経由で読み込む**（SVGRは未設定のため）:

```typescript
import Image from "next/image";
import LogoSvg from "@/assets/logo/social-business-logo.svg";

export const Header = () => {
  return (
    <Image
      src={LogoSvg}
      alt="ソービズロゴ"
      width={182}
      height={48}
      className="h-12 w-auto"
      priority
    />
  );
};
```

**注意点**:
- SVGは直接Reactコンポーネントとして使用不可（SVGRが未設定）
- 必ず`width`と`height`を指定
- `priority`属性でロゴなど重要画像の優先読み込み

### microCMS画像の設定

外部画像（microCMS）を使用する場合、`next.config.ts`に許可設定が必要:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};
```

## まとめ

### チェックリスト

- [ ] Presentational/Containerパターンに従っている
- [ ] ページコンポーネント以外はnamed exportを使用
- [ ] コンポーネントはアロー関数で記述
- [ ] 不要な`'use client'`を使っていない
- [ ] DRY原則を守り、重複コードを避けている
- [ ] セマンティックHTMLを使用している
- [ ] Props型を明示的に定義している
- [ ] Tailwind CSSでスタイリングしている
- [ ] `globals.css`で定義されたカスタムカラー（primary/secondary等）を使用している
- [ ] 不要なコメントを書いていない（TODO/NOTE/FIXME等のプレフィックス付きのみ）
- [ ] コミット前に`npm run check`でフォーマット・Lintを実行
- [ ] SVG画像はNext.js Imageコンポーネント経由で使用（width/height必須）
