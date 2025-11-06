---
root: false
targets: ["*"]
description: "Frontend development standards for Next.js App Router"
globs: ["**/app/**", "**/src/**"]
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
| `<article>` | 独立したコンテンツ（ブログ記事等） |
| `<aside>` | サイドバー、補足情報 |
| `<footer>` | フッター |
| `<h1>〜<h6>` | 見出し（階層に応じて） |

## ディレクトリ構造

```
app/src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # トップページ（Container）
│   ├── projects/
│   │   └── page.tsx       # プロジェクト一覧（Container）
│   └── blog/
│       └── page.tsx       # ブログ一覧（Container）
├── components/            # Presentationalコンポーネント
│   ├── ui/               # shadcn/uiコンポーネント
│   ├── ProjectCard.tsx
│   ├── BlogCard.tsx
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

```typescript
// ✅ Good: Tailwind CSS
export const Card = ({ title }: CardProps) => {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
};
```

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
- **PascalCase**: `ProjectCard`, `BlogList`
- **説明的**: 役割が明確に分かる名前

### ファイル名
- **PascalCase**: `ProjectCard.tsx`, `BlogList.tsx`
- **コンポーネント名と一致**: ファイル名 = コンポーネント名

### Props型名
- **コンポーネント名 + Props**: `ProjectCardProps`, `BlogListProps`

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
