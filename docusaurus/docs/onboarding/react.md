# React思想

このドキュメントではReactのメンタルモデルを伝えます。詳しい文法については公式ドキュメントやAIに質問して適宜キャッチアップをお願いします

---

## 前提: jQueryの問題点から学ぶ

### jQuery時代の問題点 (命令的UI)

```javascript
// カウンターアプリ (jQuery版)
$('#button').click(() => {
  const count = parseInt($('#count').text()) + 1
  $('#count').text(count)

  if (count > 10) {
    $('#message').text('10を超えました!')
    $('#button').css('background', 'red')
  } else {
    $('#message').text('')
    $('#button').css('background', 'blue')
  }
})
```

**問題点**:
- 状態が散らばる (`#count`のテキスト、`#button`の色、`#message`の内容)
- UI変更の手順を命令的に書く必要がある (「これをこうして、あれをああして...」)
- バグが起きやすい (「ボタンの色戻すの忘れた」等)
- 複雑になると予測不能

---

## 1. 宣言的UI: 状態の写像としてのUI

### Reactの根本思想

> **UI = f(state)**
>
> UIは状態の関数である。状態が決まればUIはただ一つに決まる。

```jsx
// 同じカウンターアプリ (React版)
const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <button
        onClick={() => setCount(count + 1)}
        style={{ background: count > 10 ? 'red' : 'blue' }}
      >
        +1
      </button>
      <div>{count}</div>
      {count > 10 && <div>10を超えました!</div>}
    </>
  )
}
```

**何が違うか**:
- **状態は1箇所** (`count`)
- **UIの見た目を宣言するだけ** (「countが10超えたら赤」)
- **手順を書かない** (ReactがDOMを勝手に更新)
- **予測可能** (countが5なら、UIは必ずこの形)

### メンタルモデル

```
状態が変わる (setState)
  ↓
Reactがコンポーネント関数を再実行
  ↓
新しいUIが返される
  ↓
仮想DOMで差分だけ更新
  ↓
画面に反映
```

**だから `setCount(count + 1)` するだけで画面が変わる**。

---

## 2. 仮想DOM: なぜReactは速いのか

### 問題: DOM操作は遅い

jQueryで `$('#count').text(100)` みたいな直接DOM操作は、ブラウザの再描画コストが高い。

### 解決: 仮想DOM

1. **仮想DOM** = JSONみたいな木構造のオブジェクト (実際のDOMより軽い)
2. 状態変更 → 新しい仮想DOMを作る
3. **差分検出 (Reconciliation)** = 前の仮想DOMと比較
4. **変更箇所だけ実DOMに適用**

```
旧仮想DOM: { type: 'div', children: '5' }
新仮想DOM: { type: 'div', children: '6' }
差分: テキストだけ変更
実DOM: document.querySelector('div').textContent = '6'
```

**結果**: 無駄な再描画が減り、パフォーマンス向上。

**（中身のアルゴリズムは複雑すぎるので経験則ベースと理解しておけばOK）**

---

## 3. useEffect: 副作用の分離

### なぜuseEffectが必要か

Reactは「状態 → UI」の**純粋な関数**を目指している。でも実際のアプリには:
- API通信
- タイマー
- ブラウザAPI (localStorage等)

といった**副作用** (外部世界とのやりとり) が必要。

### 副作用をコンポーネント本体に書くと地獄

```jsx
// ❌ 無限ループ
const BadComponent = () => {
  const [data, setData] = useState(null)

  fetch('/api/data')
    .then(res => res.json())
    .then(json => setData(json)) // setData → 再レンダリング → fetch → setData → ...

  return <div>{data}</div>
}
```

### useEffectで副作用を隔離

```jsx
// ✅ 初回だけfetch
const GoodComponent = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => setData(json))
  }, []) // 依存配列が空 = 初回レンダリング後だけ実行

  return <div>{data}</div>
}
```

### 依存配列の振る舞い

| 依存配列 | 実行タイミング |
|---------|--------------|
| `[]` (空配列) | 初回レンダリング後に1回だけ |
| `[count]` | 初回 + countが変わるたびに |
| 省略 | **毎回レンダリング後** (無限ループの温床、絶対NG) |

**原則**: 副作用を持つ関数は必ずuseEffectの中に入れる。

---

## 4. 再レンダリング最適化

### 問題: 宣言的UIは再レンダリングが多い

状態が変わる → コンポーネント関数が再実行 → 子コンポーネントも全部再実行

**重い計算をする子コンポーネントがあると遅くなる**。

### React.memo: propsが変わらなければスキップ

```jsx
// 重い計算をするコンポーネント
const HeavyComponent = React.memo(({ data }) => {
  const result = expensiveCalculation(data) // 重い処理
  return <div>{result}</div>
})
```

**propsの `data` が前回と同じなら、再レンダリングしない**。

### useCallback: 関数の参照を固定

```jsx
const Parent = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // ❌ textが変わるたびにhandleClickの参照が変わる → React.memoが無効化
  const handleClick = () => setCount(count + 1)

  // ✅ 依存配列が空なので参照が固定される
  const handleClick = useCallback(() => setCount(count + 1), [count])

  return <HeavyComponent onClick={handleClick} />
}
```

### useMemo: 計算結果をキャッシュ

```jsx
const Component = ({ items }) => {
  // ❌ 毎回再計算
  const total = items.reduce((sum, item) => sum + item.price, 0)

  // ✅ itemsが変わった時だけ再計算
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  )

  return <div>{total}</div>
}
```

### まとめ

| Hook | 用途 |
|------|------|
| `React.memo` | コンポーネントの再レンダリングをスキップ |
| `useCallback` | 関数の参照を固定 (React.memoと組み合わせ) |
| `useMemo` | 重い計算結果をキャッシュ |

**総じて: 重い処理の再実行タイミングを自分で制御するための仕組み**

---

## 5. カスタムフック: ロジックの再利用

**カスタムフック = React Hooksを含む関数の切り出し**

```jsx
// ローカルストレージと同期するstate
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// 使う側
const Component = () => {
  const [name, setName] = useLocalStorage('name', '')
  return <input value={name} onChange={e => setName(e.target.value)} />
}
```

**複数コンポーネントで使い回せるロジックは、カスタムフックに切り出す**。

---

## 6. データフェッチ: TanStack Query / SWR

### useEffectでのデータフェッチは面倒

```jsx
const Component = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{data}</div>
}
```

**命令的で保守性が悪い**。

### TanStack Query / SWRで宣言的に

```jsx
import { useQuery } from '@tanstack/react-query'

const Component = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: () => fetch('/api/data').then(res => res.json())
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{data}</div>
}
```

**Loading状態、エラー処理、キャッシュ、再取得を全部やってくれる**。

### 哲学の違い

| ライブラリ | 哲学 |
|-----------|------|
| **TanStack Query** | サーバー状態管理 (キャッシュ、バックグラウンド更新、楽観的更新) |
| **SWR** | Stale-While-Revalidate (古いデータ表示 → 裏で更新 → 新しいデータに差し替え) |

**TanStack Queryの方が高機能**。SWRはシンプル。

---

## このプロジェクトでの実践

### Next.js App Router = Server Component中心

```jsx
// app/src/app/blog/page.tsx (Server Component)
import { getBlogs } from '@/lib/microcms'

export default async function BlogPage() {
  const blogs = await getBlogs() // サーバーサイドでfetch

  return (
    <div>
      {blogs.map(blog => (
        <article key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </article>
      ))}
    </div>
  )
}
```

**TanStack Query不要**。Server Componentがサーバーでデータ取得 → HTMLで返す。

### Client Componentはインタラクションだけ

```jsx
// app/src/components/LikeButton.tsx
'use client'
import { useState } from 'react'

export const LikeButton = () => {
  const [liked, setLiked] = useState(false)

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  )
}
```

**`'use client'` はクリック、アニメーション等のインタラクション時だけ**。

---

## まとめ: Reactの進化の歴史

```
jQuery (命令的UI)
  ↓ 予測不能、バグりやすい
React (宣言的UI + 仮想DOM)
  ↓ useEffectでのデータフェッチが面倒
TanStack Query / SWR (サーバー状態の宣言的管理)
  ↓ クライアントでのfetchすら不要に
Next.js Server Components (サーバーでfetch → HTML返す)
```

**全部「より宣言的に、より予測可能に」の進化**。

---

## AI駆動開発との組み合わせ

### この思想を理解した上でAIを使う

```
❌ 「ボタン作って」 → AIがコード出す → 動いた (なぜ動くか分からない)

✅ 「ボタン作って」 → AIがコード出す →
   「なるほど、setStateで状態変えて、UIが再レンダリングされるのか」
```

**思想 = AIの出力を理解するフレームワーク**

### AIへの質問の質が上がる

```
❌ 「カウンター作って」

✅ 「countというstateを持って、ボタンクリックでsetCountする
    コンポーネントを作って。count > 10の時だけメッセージ表示」
```

**宣言的に要件を伝えられる = AIの出力精度が上がる**

---
