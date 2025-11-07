# コンポーネント設計: 責務分離の考え方

このドキュメントでは、Reactコンポーネントの**責務分離**について解説します。「どこに何を書くべきか」が明確になれば、保守性の高いコードが書けます。

---

## 前提: なぜ責務分離が必要か

### 責務が混在したコンポーネント (悪い例)

```tsx
// ❌ データ取得、状態管理、UI表示が全部混ざってる
const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data)
        setLoading(false)
      })
  }, [])

  const filteredBlogs = blogs.filter(blog =>
    blog.title.includes(searchTerm)
  )

  if (loading) return <div className="spinner">Loading...</div>

  return (
    <div className="blog-page">
      <input
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="検索..."
      />
      <div className="blog-grid">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <img src={blog.thumbnail} alt={blog.title} />
            <h2>{blog.title}</h2>
            <p>{blog.excerpt}</p>
            <span>{new Date(blog.date).toLocaleDateString('ja-JP')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**問題点**:
- データ取得、フィルタリング、UI表示が全部同じコンポーネント
- BlogCardのデザイン変更 → BlogPageを触る必要がある
- 検索ロジックを他でも使いたい → コピペするしかない

---

## 責務分離の基本パターン

今回のReact開発における責務は大きく3つに分けられます:

| 責務 | 役割 | 配置場所 |
|------|------|---------|
| **Server Container** | データ取得 (fetch) | `app/src/app/**/page.tsx` |
| **Client Container** | 状態管理、ビジネスロジック | `app/src/app/**/_components/` |
| **Presentational** | 見た目の表示だけ | `app/src/components/` |

---

## 1. Container Component (データ層・ロジック層)

Containerには**2種類**あります:

### Server Container
- **責務**: データ取得 (API, データベース)
- **配置**: `app/src/app/**/page.tsx`
- **export**: デフォルトexport (Next.jsの要件)
- **特徴**: `async/await` でサーバーサイドfetch

### Client Container
- **責務**: 状態管理、インタラクション、ビジネスロジック
- **配置**: `app/src/app/**/_components/` (ページ固有) or `app/src/components/` (汎用)
- **export**: 名前付きexport
- **特徴**: `'use client'` 必須、useState/useEffect等を使用

### 共通の特徴

- **アロー関数で記述**
- UIは最小限、ほとんどPresentationalに委譲

### 例: Server Component (このプロジェクトの基本)

```tsx
// app/src/app/blog/page.tsx (Container)
import { getBlogs } from '@/lib/microcms'
import { BlogList } from '@/components/BlogList'

const BlogPage = async () => {
  const blogs = await getBlogs()

  return (
    <main>
      <h1>ブログ一覧</h1>
      <BlogList blogs={blogs} />
    </main>
  )
}

export default BlogPage
```

**ポイント**:
- `async/await` でデータ取得
- UIロジックは `BlogList` に委譲
- このコンポーネント自体はデータの**橋渡し役**

### 例: Server Container + Client Container (インタラクション付き)

データフェッチが必要でインタラクションもある場合、**Server ContainerとClient Containerを分ける**。

```tsx
// app/src/app/blog/page.tsx (Server Container)
import { getBlogs } from '@/lib/microcms'
import { BlogPageClient } from './_components/BlogPageClient'

const BlogPage = async () => {
  const blogs = await getBlogs()
  return <BlogPageClient initialBlogs={blogs} />
}

export default BlogPage
```

```tsx
// app/src/app/blog/_components/BlogPageClient.tsx (Client Container)
'use client'

import { useState } from 'react'
import { BlogList } from '@/components/BlogList'
import { SearchInput } from '@/components/SearchInput'
import type { Blog } from '@/types/microcms'

type BlogPageClientProps = {
  initialBlogs: Blog[]
}

export const BlogPageClient = ({ initialBlogs }: BlogPageClientProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBlogs = initialBlogs.filter(blog =>
    blog.title.includes(searchTerm)
  )

  return (
    <main>
      <h1>ブログ一覧</h1>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <BlogList blogs={filteredBlogs} />
    </main>
  )
}
```

**構造**:
1. **Server Container** (`page.tsx`) = データ取得
2. **Client Container** (`_components/`) = 状態管理、フィルタリング
3. **Presentational** (`components/`) = 表示だけ

**ポイント**:
- `_components/` = Next.jsがルーティングしない (アンダースコアプレフィックス)
- ページ固有のロジック層はここに配置
- Server/Client の責務が明確に分離される

---

## 2. Presentational Component (UI層)

### 責務

- **見た目の表示だけ**
- propsを受け取って、UIを返す
- **状態を持たない** (例外: UIローカル状態のみ、例: ドロップダウンの開閉)

### 特徴

- `app/src/components/` に配置
- **名前付きexport** (`export const ComponentName = ...`)
- **アロー関数で記述**
- **純粋関数** (同じpropsなら同じUI)

### 例: BlogList

```tsx
// app/src/components/BlogList.tsx (Presentational)
import { BlogCard } from './BlogCard'
import type { Blog } from '@/types/microcms'

type BlogListProps = {
  blogs: Blog[]
}

export const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
```

### 例: BlogCard

```tsx
// app/src/components/BlogCard.tsx (Presentational)
import Image from 'next/image'
import Link from 'next/link'
import type { Blog } from '@/types/microcms'

type BlogCardProps = {
  blog: Blog
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <article className="border rounded-lg overflow-hidden hover:shadow-lg transition">
        <Image
          src={blog.thumbnail.url}
          alt={blog.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="text-gray-600 mt-2">{blog.excerpt}</p>
          <time className="text-sm text-gray-400 mt-4 block">
            {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
          </time>
        </div>
      </article>
    </Link>
  )
}
```

**ポイント**:
- propsの `blog` を受け取って表示するだけ
- データ取得、フィルタリング等のロジックは一切ない
- **別のページでも再利用可能**

### 例外: UIローカル状態

```tsx
// app/src/components/Dropdown.tsx
'use client'

import { useState } from 'react'

type DropdownProps = {
  items: string[]
  onSelect: (item: string) => void
}

export const Dropdown = ({ items, onSelect }: DropdownProps) => {
  // UIの開閉状態だけはPresentationalで持ってもOK
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>選択</button>
      {isOpen && (
        <ul className="absolute bg-white shadow-lg">
          {items.map(item => (
            <li
              key={item}
              onClick={() => {
                onSelect(item)
                setIsOpen(false)
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

**UIローカル状態の判断基準**:
- ✅ ドロップダウンの開閉、モーダルの表示/非表示
- ✅ アニメーションの状態
- ❌ ビジネスロジックに影響する状態 (検索語、フィルタ条件等)

---

## 責務分離の判断基準

### どこに書くべきか迷ったら

| やりたいこと | 配置場所 | 理由 |
|------------|---------|------|
| API呼び出し | Container (Page Component) | データ取得はページ単位 |
| 状態管理 (ビジネスロジック) | Container | ビジネスロジックの責務 |
| UIの見た目 | Presentational | 見た目の責務 |
| UIローカル状態 (開閉等) | Presentational | UI内で完結する状態 |
| 計算ロジック (フィルタ、ソート) | Container | ビジネスロジックの一部 |
| イベントハンドラ | Container | ビジネスロジックに影響するため |

### 具体例で判断

```tsx
// ❓ この処理はどこに書くべき?
const sortedBlogs = blogs.sort((a, b) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
)
```

**判断**:
- ソートロジックは**ビジネスロジック**
- → **Container** に書く

```tsx
// ❓ この処理はどこに書くべき?
<button className={isActive ? 'bg-blue-500' : 'bg-gray-300'}>
```

**判断**:
- 見た目の切り替えだけ
- → **Presentational Component** 内でOK

```tsx
// ❓ この処理はどこに書くべき?
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  await createBlog(formData)
  router.push('/blog')
}
```

**判断**:
- ビジネスロジック (API呼び出し、画面遷移)
- → **Container** に書く

---

## まとめ: 責務の分離

1. **Container (Page Component)**
   - データ取得、状態管理、ビジネスロジック
   - デフォルトexport
   - アロー関数で記述
   - UIは最小限、Presentationalに委譲

2. **Presentational Component**
   - 見た目の表示だけ
   - 名前付きexport
   - アロー関数で記述
   - propsを受け取って描画
   - 状態は持たない (例外: UIローカル状態)

### 判断に迷ったら

**「このコンポーネントは別のページでも使えるか?」**

- Yes → Presentational (propsで汎用化)
- No → Containerに書いてOK

### AI に聞く時のコツ

```
❌ 「ブログ一覧ページ作って」

✅ 「Figmaのブログ一覧セクションを見て、
   app/src/components/BlogList.tsx (Presentational) を作って。
   propsでblogsを受け取って、グリッドレイアウトで表示。
   各ブログカードはBlogCardコンポーネントに切り出す。」
```

**ポイント**:
- **責務** と**配置場所**を明示
