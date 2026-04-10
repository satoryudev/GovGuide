# TebikiChart

> 複雑な手続きや操作を、インタラクティブなチュートリアルで案内するノーコードツール

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)](https://govguide-seven.vercel.app/)

🔗 **https://govguide-seven.vercel.app/**

---

## 概要

TebikiChart は、マイナンバー申請・確定申告などの複雑な手続きを、ゲームのチュートリアル風にユーザーへ案内するシステムです。

**2つのコンポーネントで構成されています。**

| コンポーネント | 説明 |
|---|---|
| **エディタ（Webアプリ）** | ブロックをドラッグ＆ドロップで並べてシナリオを作成し、HTMLとして書き出す |
| **プレイヤー（embed.js）** | 既存のWebサイトに1行追加するだけでチュートリアルのオーバーレイが起動する |

---

## 画面イメージ

### エディタ画面
4パネルのレイアウトで、左からブロックパレット・キャンバス・プレビュー・ブロック設定が並びます。

```
[ ブロックパレット ] [ キャンバス ] [ プレビュー ] [ ブロック設定 ]
```

### プレイヤー動作イメージ

```
┌──────────────────────────────────────────────┐
│  Step 2 / 8  ████████░░░░░░░░  (進行バー)      │
├──────────────────────────────────────────────┤
│  マイナンバーカード申請                          │
│                                              │
│  郵便番号 [████████████]  ← スポットライト      │
│                                              │
│ 😊 まず、新しい郵便番号を入力してください。       │
└──────────────────────────────────────────────┘
```

---

## 機能一覧

### ブロックの種類

| ブロック | 機能 |
|---|---|
| 💬 **セリフ** | キャラクターがメッセージを話す（タイプライター表示） |
| 🔦 **スポットライト** | 対象要素を強調してクリックを促す |
| ✏️ **入力スポットライト（フォーム）** | 入力欄をハイライト → バリデーション後に次へ |
| 🔦 **入力スポットライト（ボタン）** | ボタンをパルスリング強調 → クリックで次へ |
| 📌 **入力スポットライト（エリア）** | 任意エリアを強調 → 「次へ」ボタンで進む |
| 🔀 **分岐** | 選択肢によってシナリオを分岐 |

### エディタ機能
- ドラッグ＆ドロップによるブロック並び替え
- 🎯 プレビュー上で対象要素をクリックして ID を自動取得
- バリデーションパターンのプリセット（氏名・メール・電話番号・郵便番号等）
- 書類プレビュー（マイナンバーカード等の見本をモーダルで表示）
- JSON インポート / エクスポート
- HTML ファイルへのワンクリックエクスポート（embed.js 自動注入）
- Undo / Redo（Cmd+Z / Cmd+Shift+Z）
- ダークモード対応

### プレイヤー機能
- 任意の Web ページに `<script>` 1行追加で動作
- 進行状況プログレスバー（Step X / Y 表示）
- 4分割ブロック方式のスポットライト（スタッキングコンテキストに依存しない確実なクリック誘導）
- 書類プレビューモーダル
- 入力バリデーション（正規表現対応）

---

## 技術スタック

```
フロントエンド    Next.js 14 (App Router) + TypeScript + Tailwind CSS
ドラッグ&ドロップ @dnd-kit/core + @dnd-kit/sortable
状態管理        Zustand
埋め込みビルド   tsup（embed/ → public/embed.js / IIFE形式）
デプロイ        Vercel
```

---

## セットアップ

### 前提条件
- Node.js 18 以上

### インストール・起動

```bash
git clone https://github.com/satoryudev/TebikiChart.git
cd TebikiChart
npm install

# embed.js をビルド（初回 or embed/ を編集した後に実行）
npm run embed:build

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:3000 を開くとエディタのトップ画面が表示されます。

---

## スクリプト一覧

```bash
npm run dev           # 開発サーバー起動
npm run build         # Next.js プロダクションビルド
npm run start         # プロダクションサーバー起動
npm run embed:build   # embed.js をビルド（embed/ を変更したときに実行）
```

---

## 使い方

### エディタでシナリオを作る

1. http://localhost:3000 を開く
2. 「新規作成」でシナリオを追加
3. ブロックパレットからブロックをクリックしてキャンバスに追加
4. ブロックをドラッグして順序を変更
5. ブロックの ⋮ アイコンからブロック設定を開いて内容を編集
6. プレビューパネルの「📁 開く」でローカル HTML ファイルを読み込み
7. 「▶ 実行」ボタンでチュートリアルの動作確認

### 既存サイトへの埋め込み

1. エディタから「HTMLエクスポート」でスタンドアロン HTML を生成
2. または JSON エクスポート後、対象 HTML の `</body>` 直前に追加：

```html
<script>document.write('<scr'+'ipt src="/embed.js?v='+Date.now()+'"><\/scr'+'ipt>')</script>
```

---

## ディレクトリ構成

```
TebikiChart/
├── embed/                    # プレイヤー本体（tsup で embed.js にビルド）
│   ├── index.ts              # TebikiChart グローバル API
│   ├── engine.ts             # シナリオ再生エンジン
│   ├── bubble.ts             # キャラクター吹き出し
│   ├── overlay.ts            # 暗転 + スポットライト
│   ├── inputSpotlight.ts     # ボタン・フォーム・エリア特化スポットライト
│   ├── documentPreview.ts    # 書類プレビューモーダル
│   ├── progressBar.ts        # 進行状況プログレスバー
│   └── types.ts              # 型定義
│
├── src/
│   ├── app/
│   │   ├── page.tsx          # シナリオ一覧（ダッシュボード）
│   │   ├── editor/[id]/
│   │   │   └── page.tsx      # エディタ画面（4パネル）
│   │   └── sp/
│   │       └── page.tsx      # モバイル向け活用例一覧
│   ├── components/editor/    # エディタ UI コンポーネント
│   ├── types/scenario.ts     # シナリオ型定義
│   ├── store/editorStore.ts  # Zustand ストア
│   └── middleware.ts         # スマホ → /sp 自動リダイレクト
│
├── public/
│   ├── embed.js              # ビルド済みプレイヤー
│   ├── demo.html             # デモ用テストページ
│   ├── shopping.html         # 活用例：ECサイト
│   ├── mynumber-tutorial.html      # 活用例：マイナンバー申請
│   └── kakuteishinkoku-tutorial.html  # 活用例：確定申告
│
└── tsup.config.ts            # embed.js ビルド設定
```

---

## モバイル対応

スマートフォンからアクセスすると `/sp` へ自動リダイレクトされ、活用例チュートリアルの一覧が表示されます。PC 版ではシナリオの作成・編集ができます。

---

## ライセンス

MIT
