# プロジェクト詳細ページ 仕様および実装方針

参照デザイン: [Figma (node-id=1-867)](https://www.figma.com/design/SueA7I2vCsatvIf0s7BgB7/%E7%84%A1%E9%A1%8C?node-id=1-867&m=dev)

## 1. ページ目的・KPI
- 対象: 入会検討中の学生・協賛/支援を検討する社会人
- 目的: プロジェクトの意義/プロセス/成果を具体的に伝える
- KPI: プロジェクト閲覧完了率、関連プロジェクトへの遷移率、入会/問い合わせCTR

## 2. 情報構成(IA)
1. プロジェクトヘッダー: タイトル、期間、参加人数、カテゴリ、ヒーロー画像
2. 概要: 目的/背景/課題設定
3. 活動内容・プロセス: ステップ/タイムライン、写真
4. 成果・学び: 定量/定性の成果、学びポイント
5. メンバー紹介: 役割、コメント、アバター
6. 関連プロジェクト: 同カテゴリや前後関係の推薦
7. CTA: 入会/問い合わせ

要件出典: `docs/requirements.md`, `docs/FAQ.md`

## 3. Figmaノード情報の取り込み
MCPサーバー経由で当該Figmaノードから文言・階層を取り込み、以下のプレースホルダに反映する。

<!-- MCP-FIGMA-SECTION:START id="figma-node-1-867" src="https://www.figma.com/design/SueA7I2vCsatvIf0s7BgB7/%E7%84%A1%E9%A1%8C?node-id=1-867&m=dev" -->
未取得: MCP連携後に自動挿入(テキスト、レイヤー名、カラー/タイポ、コンポーネント構造の要約)
<!-- MCP-FIGMA-SECTION:END id="figma-node-1-867" -->

反映ルール:
- テキスト: 見出し(H1/H2/H3)→MD見出しへ、本文→該当セクションへ
- 配色/フォント: デザインシステム定義へ同期(別ドキュメント)
- コンポーネント: Atom/Molecule/Organismにマップ

## 4. セクション別 実装方針

### 4.1 プロジェクトヘッダー
- 内容: タイトル、期間、人数、カテゴリタグ、ヒーロー画像
- 実装: 画像のレスポンシブ最適化、基本情報カードで視認性確保
- CMS: 基本情報フィールドを分離管理

### 4.2 プロジェクト概要
- 内容: 目的、背景、課題設定
- 実装: テキスト主体 + 図解(任意)
- CMS: リッチテキスト対応

### 4.3 活動内容・プロセス
- 内容: ステップ/タイムライン、写真ギャラリー
- 実装: タイムラインUI、ライトボックス付きギャラリー
- CMS: ステップごとに本文/画像を管理

### 4.4 成果・学び
- 内容: 成果指標(KPI)、学びポイント
- 実装: 成果カード(数値/テキスト)、箇条書き
- CMS: 数値と本文を別フィールドで管理

### 4.5 メンバー紹介
- 内容: 役割、コメント、アバター
- 実装: メンバーカード、レスポンシブグリッド
- CMS: メンバーを参照型で紐付け

### 4.6 関連プロジェクト
- 内容: 同カテゴリ、前後関係
- 実装: カードリスト、タグ/カテゴリで抽出
- CMS: 関連付け(自動/手動)の両対応

### 4.7 CTA
- 内容: 入会/問い合わせ
- 実装: 固定フッターCTA(モバイル)、本文中CTA(デスクトップ)
- 計測: クリックイベント計測

## 5. ルーティング・情報設計
- ルート: `/projects/[slug]` (動的)
- 一覧: `/projects` からの遷移、前後ナビ
- パンくず: `ホーム > プロジェクト > 現在` を表示

## 6. データモデル(概要)
- Project: id, title, slug, period, members, goal, result, image, status, category, description, process, learnings, memberComments
- ProjectMember: id, projectId, name, role, comment, avatar
- ProjectMetric: id, projectId, label, value, unit
- ProjectStep: id, projectId, order, title, body, images

## 7. 取得・描画戦略
- 生成: ISR(増分再生成) + 動的ルーティング
- 依存: 画像はCDN、テキストはCMSからSSG時/ISR時に取得
- キャッシュ: データフェッチに短TTL、画像は長TTL

## 8. パフォーマンス・SEO
- 画像最適化: 適切なsrcset、遅延読み込み
- メタ: タイトル/説明/OGPをプロジェクト単位で生成
- 構造化データ: `Article` or `CreativeWork` を検討

## 9. アクセシビリティ
- 画像ALT必須、色コントラスト、フォーカスリング
- キーボード操作でギャラリー/タイムライン操作可能

## 10. テスト
- ビジュアルリグレッション: ヘッダー/タイムライン/カード
- E2E: 前後ナビ、関連プロジェクト、CTA

## 11. リスク・課題
- 画像アセットの準備状況
- 関連プロジェクトの定義/自動抽出の精度
- MCP(Figma API)のレート制限対応

## 付録: MCP埋め込み仕様(案)
```
<!-- MCP-FIGMA-SECTION:START id="figma-node-1-867" src="<Figma URL>" fields="text,colors,typography,components" -->
...自動生成...
<!-- MCP-FIGMA-SECTION:END id="figma-node-1-867" -->
```
