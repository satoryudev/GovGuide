# 行政手続きチュートリアルアプリ — 実装プロンプト v2

## アプリ概要

行政手続き（引越し・マイナンバー・確定申告・育児出産など）を、ゲームのチュートリアル風に市民へ案内するシステム。

### 2つのコンポーネントで構成される

**① エディタ（Webアプリ）**
行政担当者がブロックをドラッグ&ドロップで並べ、チュートリアルシナリオを作成し、JSONファイルとして書き出す。

**② プレイヤー（埋め込みスクリプト）**
既存の行政WebサイトにJSを1行追加してJSONを読み込むだけで、そのサイトの上にチュートリアルのオーバーレイが起動する。オーバーレイ中は強調指定されたボタン以外は一切操作不可。

### 使用イメージ

```html
<!-- 既存の行政サイトのHTMLに追加するだけ -->
<script src="https://tetsuzuki-quest.app/embed.js"></script>
<script>
  TetsuzukiQuest.start('./scenario.json')
</script>
```

---

## 技術スタック

- **フレームワーク**：Next.js 14（App Router）
- **言語**：TypeScript
- **スタイリング**：Tailwind CSS
- **ドラッグ&ドロップ**：`@dnd-kit/core` + `@dnd-kit/sortable`
- **状態管理**：Zustand
- **データ保存**：LocalStorage（プロトタイプ）
- **埋め込みスクリプトビルド**：`tsup`（embed.tsを単一のembed.jsにバンドル）
- **パッケージマネージャ**：npm

---

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx                   # トップ：シナリオ一覧
│   └── editor/
│       └── [id]/page.tsx          # エディタ画面
├── components/
│   └── editor/
│       ├── BlockPalette.tsx       # 左サイドバー：ブロック一覧
│       ├── Canvas.tsx             # 中央左：ブロックを並べるキャンバス
│       ├── BlockItem.tsx          # キャンバス上の1ブロック
│       ├── BlockEditor.tsx        # 右サイドバー：ブロック設定
│       ├── PreviewPane.tsx        # 中央右：プレビューiframe（プレビュー実行機能）
│       └── PreviewToolbar.tsx     # Canvasヘッダー：実行・停止ボタン（プレビュー実行機能）
├── types/
│   └── scenario.ts                # 型定義（エディタ・プレイヤー共通）
├── store/
│   └── editorStore.ts             # Zustandストア
└── lib/
    └── scenarioStorage.ts         # LocalStorage保存・読み込み

embed/
└── index.ts                       # プレイヤー本体（embed.jsとしてビルド）
    ├── engine.ts                  # シナリオ再生エンジン
    ├── overlay.ts                 # オーバーレイ・スポットライト
    ├── inputSpotlight.ts          # 入力フォーム特化スポットライト（機能1）
    ├── documentPreview.ts         # 必要書類プレビューモーダル（機能2）
    ├── validation.ts              # ダイナミックバリデーション（機能3）
    ├── progressBar.ts             # 進行状況プログレスバー（機能4）
    ├── bubble.ts                  # キャラクター吹き出し
    └── types.ts                   # 型定義（scenario.tsと共通化）

public/
└── embed.js                       # ビルド済みプレイヤースクリプト
```

---

## 型定義（`src/types/scenario.ts`）

```typescript
export type BlockType = 'speech' | 'spotlight' | 'input-spotlight' | 'document-preview' | 'validation' | 'branch'

export interface SpeechBlock {
  id: string
  type: 'speech'
  message: string
  characterMood?: 'normal' | 'happy' | 'thinking'
  nextId: string | null
}

export interface SpotlightBlock {
  id: string
  type: 'spotlight'
  message: string
  targetSelector: string    // 強調する要素のCSSセレクタ（例: "#submit-btn"）
  targetLabel: string       // エディタ表示用のラベル名
  nextId: string | null
}

/** 機能1: 画面暗転＋スポットライト（入力フォーム特化） */
export interface InputSpotlightBlock {
  id: string
  type: 'input-spotlight'
  message: string
  targetId: string          // 強調する input 要素の id 属性値（例: "postal-code"）
  targetLabel: string       // エディタ表示用のラベル名
  nextId: string | null
}

/** 機能2: 必要書類プレビュー */
export interface DocumentPreviewBlock {
  id: string
  type: 'document-preview'
  message: string
  targetId: string          // 紐付ける入力欄の id 属性値
  targetLabel: string       // エディタ表示用のラベル名
  documentType: 'mynumber-card' | 'receipt' | 'residence-certificate' | 'custom'
  previewImageUrl?: string  // documentType === 'custom' のときに使用
  buttonLabel?: string      // 「見本を確認」ボタンの文言（デフォルト: "見本を確認"）
  nextId: string | null
}

/** 機能3: ダイナミックバリデーション */
export interface ValidationBlock {
  id: string
  type: 'validation'
  message: string
  targetSelector: string    // 検証対象の input 要素のCSSセレクタ
  targetLabel: string       // エディタ表示用のラベル名
  validationPattern: string // 検証に使う正規表現文字列（例: "^\\d{7}$"）
  errorMessage: string      // エラー時の吹き出しメッセージ（例: "！ 形式が正しくありません"）
  nextId: string | null
}

export interface BranchBlock {
  id: string
  type: 'branch'
  question: string
  yesNextId: string | null
  noNextId: string | null
}

export type Block =
  | SpeechBlock
  | SpotlightBlock
  | InputSpotlightBlock
  | DocumentPreviewBlock
  | ValidationBlock
  | BranchBlock

export interface Scenario {
  id: string
  title: string
  category: 'moving' | 'mynumber' | 'tax' | 'childcare'
  blocks: Block[]
  startBlockId: string | null
  /** 機能4: プログレスバー用の総ステップ数。省略時はブロック数から自動算出 */
  totalSteps?: number
  createdAt: string
  updatedAt: string
}
```

---

## エディタ画面仕様（`/editor/[id]`）

### レイアウト：4カラム

| 左 240px | 中央左 flex（min 320px） | 中央右 flex（min 400px） | 右 280px |
|---|---|---|---|
| BlockPalette | Canvas + PreviewToolbar | PreviewPane | BlockEditor |

Canvas と PreviewPane は横並びで同じ高さに揃える（`flex: 1` で均等配分）。

### BlockPalette（左）

6種類のブロックカードを表示。各カードはドラッグ可能。

- 「吹き出しブロック」（blue系）：キャラクターのセリフ
- 「スポットライトブロック」（amber系）：ボタンの強調
- 「入力スポットライトブロック」（indigo系）：入力フォームの強調（機能1）
- 「書類プレビューブロック」（teal系）：必要書類の見本表示（機能2）
- 「バリデーションブロック」（rose系）：入力エラーの強調（機能3）
- 「条件分岐ブロック」（red系）：はい/いいえ

### PreviewToolbar（Canvas 上部ツールバー）

Canvas の上部に固定表示するツールバー。左側に既存の操作ボタン群、右端に以下を配置する。

- **「▶ 実行」ボタン**（green系）：現在の Zustand ストアのシナリオを PreviewPane へ送信してチュートリアルを起動する
- **「■ 停止」ボタン**（gray系）：PreviewPane の iframe を `src` の再代入でリロードし、チュートリアルをリセットする（実行中のみ有効）
- ボタンの状態管理：`isPlaying: boolean` を `useState` でローカル管理し、実行中は「実行」をdisabled・停止中は「停止」をdisabledにする

### Canvas（中央左）

- `@dnd-kit/sortable` でブロックの並び替え
- 各BlockItemはクリックで右サイドバーに設定フォームを表示
- 削除ボタン（×）付き
- 空状態には「ブロックをここにドロップ」のプレースホルダー
- 上部（PreviewToolbar 内）に「JSONを書き出す」ボタン → シナリオをJSONファイルとしてダウンロード
- 上部（PreviewToolbar 内）に「総ステップ数」入力欄 → プログレスバー表示に使用（省略時はブロック数で自動算出）（機能4）

### PreviewPane（中央右）

`public/demo.html` を読み込んだ `<iframe>` を表示するコンポーネント。

```
- src="/demo.html" の iframe を flex: 1・height: 100% で配置
- iframe には ref を付与し、PreviewToolbar からコールバック経由で参照できるようにする
- 上部にラベル「プレビュー」と現在の状態（待機中 / 実行中）を表示するバッジ
- 「▶ 実行」が押されたとき：
  1. useEditorStore() から現在のシナリオオブジェクトを取得
  2. iframeRef.current.contentWindow.postMessage(
       { type: 'TETSUZUKI_QUEST_START', scenario },
       '*'
     ) を呼び出す
  3. isPlaying を true にしてバッジを「実行中」に切り替え
- 「■ 停止」が押されたとき：
  1. iframeRef.current.src = '/demo.html' で iframe をリロード
  2. isPlaying を false にしてバッジを「待機中」に切り替え
```

### BlockEditor（右）

選択中のブロック種別に応じてフォームを切り替え：

- `speech`：セリフのテキストエリア、気分セレクト（normal/happy/thinking）、次のブロック選択
- `spotlight`：説明テキストエリア、CSSセレクタ入力欄（`#button-id` など）、ラベル名入力、次のブロック選択
- `input-spotlight`：説明テキストエリア、対象 input の ID 入力欄（`postal-code` など）、ラベル名入力、次のブロック選択（機能1）
- `document-preview`：説明テキストエリア、対象 input の ID 入力欄、ラベル名入力、書類種別セレクト（mynumber-card / receipt / residence-certificate / custom）、カスタム時は画像URL入力欄、ボタン文言入力欄、次のブロック選択（機能2）
- `validation`：説明テキストエリア、CSSセレクタ入力欄、ラベル名入力、正規表現パターン入力欄、エラーメッセージ入力欄、次のブロック選択（機能3）
- `branch`：質問文入力、はい側の次ブロック選択、いいえ側の次ブロック選択

---

## プレイヤー（埋め込みスクリプト）仕様（`embed/`）

### 起動方法

```html
<script src="/embed.js"></script>
<script>
  TetsuzukiQuest.start('./scenario.json')
</script>
```

`TetsuzukiQuest.start(jsonPath)` を呼び出すと：
1. JSONファイルをfetchで読み込む
2. `startBlockId` のブロックから再生開始
3. オーバーレイをDOMに注入
4. プログレスバーをDOMの最上部に注入（機能4）

`TetsuzukiQuest.startWithScenario(scenario)` を呼び出すと（プレビュー実行機能用）：
1. JSON の fetch を行わず、引数として渡された `Scenario` オブジェクトを直接使用する
2. 以降は `start()` と同様に `startBlockId` から再生開始・オーバーレイ注入・プログレスバー注入

`TetsuzukiQuest.stop()` を呼び出すと（プレビュー実行機能用）：
1. エンジンを停止し、注入済みのオーバーレイ・プログレスバー・吹き出しをすべてDOMから除去する
2. `finish()` とは異なりアニメーションなしで即時除去する

### postMessage 受信（プレビュー実行機能）

`embed/index.ts` の初期化時に `window` に対して `message` イベントリスナーを登録する。

```typescript
window.addEventListener('message', (event) => {
  if (event.data?.type === 'TETSUZUKI_QUEST_START') {
    TetsuzukiQuest.startWithScenario(event.data.scenario)
  }
  if (event.data?.type === 'TETSUZUKI_QUEST_STOP') {
    TetsuzukiQuest.stop()
  }
})
```

これにより、エディタの PreviewPane が `postMessage` を送信するだけで iframe 内のプレイヤーが即座に起動・停止できる。

### overlay.ts — オーバーレイの実装

```
- document.bodyに固定の黒半透明オーバーレイdivを挿入（rgba(0,0,0,0.75)）
- オーバーレイ全体に pointer-events: all を設定（クリック封鎖）
- SpotlightBlockの場合：
  - targetSelectorで要素を取得し、getBoundingClientRect()で位置・サイズを取得
  - 取得した要素の位置に合わせてオーバーレイに「穴」を開ける
    → clip-path: polygon() または mix-blend-mode を使って対象エリアだけ透過
  - 対象要素に pointer-events: auto を設定（その要素だけクリック可能）
  - 対象要素の周囲にpulseアニメーションのリングを表示
  - 対象要素がクリックされたら次のブロックへ進む
- speech / branchブロックの場合：
  - オーバーレイは全面に表示（穴なし）
  - 吹き出しUIのみクリック可能
```

### inputSpotlight.ts — 入力フォーム特化スポットライト（機能1）

```
InputSpotlightBlock の処理：

- overlay.tsと同様の黒半透明オーバーレイを挿入
- document.getElementById(targetId) で対象の input 要素を取得
- getBoundingClientRect() で位置・サイズを取得し、clip-path で「穴」を開ける
  → 穴の padding は 12px（input 要素より少し広めに切り抜く）
- 対象 input 要素に pointer-events: auto を設定（入力だけ可能）
- 対象 input 要素の下に以下のキャラクター吹き出し（bubble.ts）を表示
- ユーザーが input から focus-out（blur）したタイミングで次のブロックへ進む
  → ただし input が空の場合は進まず、入力を促すメッセージを吹き出しで再表示する
```

### documentPreview.ts — 必要書類プレビューモーダル（機能2）

```
DocumentPreviewBlock の処理：

- オーバーレイは表示しない（入力は自由に操作可能）
- document.getElementById(targetId) で対象の input 要素を取得
- input 要素の直後（DOM上）に「見本を確認」ボタン（buttonLabel または "見本を確認"）を挿入
  → スタイル: teal 系のテキストボタン、🔍 アイコン付き
- ボタンがクリックされたとき、モーダルを表示する
  モーダルの仕様：
    - 背景: rgba(0,0,0,0.6) のフルスクリーンオーバーレイ
    - 中央に白いカードを表示（最大幅 480px）
    - documentType に応じて内蔵の見本画像を表示（base64 で embed.js に同梱）
      - 'mynumber-card'       → マイナンバーカードの見本（正面）
      - 'receipt'             → 領収書の見本
      - 'residence-certificate' → 住民票の写しの見本
      - 'custom'              → previewImageUrl の画像を表示
    - カード下部に「閉じる」ボタン
- キャラクター吹き出し（bubble.ts）で message を表示し「次へ」で次のブロックへ進む
```

### validation.ts — ダイナミックバリデーション（機能3）

```
ValidationBlock の処理：

- オーバーレイは表示しない（入力は自由に操作可能）
- document.querySelector(targetSelector) で対象の input 要素を取得
- input 要素の blur イベントをリッスンする
- blur 時に入力値を new RegExp(validationPattern).test(value) で検証する
  - 検証NG の場合：
    - input の outline を赤色（#ef4444）に変更し、
      box-shadow: 0 0 0 3px rgba(239,68,68,0.4) のグロー効果を付与
    - input 要素の右隣（position: absolute）に吹き出し型の div を挿入
      → 内容: errorMessage（例: "！ 形式が正しくありません"）
      → スタイル: 白背景・赤テキスト・左向き三角の吹き出し形 CSS
    - 次のブロックへは進まない
  - 検証OK の場合：
    - グロー効果と吹き出しを除去し、outline を緑色（#22c55e）に変更
    - 次のブロックへ進む
- blur イベントのたびに上記を繰り返す（再入力を許容）
```

### progressBar.ts — 進行状況プログレスバー（機能4）

```
プログレスバーの仕様：

初期化（engine.ts の start() 時に呼び出し）：
- document.body の最上部に固定（position: fixed; top: 0; left: 0; width: 100%; z-index: 99999）の
  バーコンテナ div を挿入
- 高さ 48px、背景 white、下部に薄いボーダー
- 左側に「Step X / Y」または「X%」のテキスト表示
- 右側にオレンジ系（#f97316）の塗りつぶしバー（幅は進捗率で変化）
  → transition: width 0.4s ease を付与してスムーズにアニメーション

ステップ計算：
- totalSteps が Scenario に設定されている場合はその値を使用
- 省略時は blocks 配列の length を総ステップ数として使用
- エンジンがブロックを進めるたびに progressBar.update(currentStep, totalSteps) を呼び出す
  → currentStep は 1 始まりのカウンタとして engine.ts 側で管理する

表示形式：
- デフォルトは「現在ブロック番号 / 総ステップ数」形式（例: "3 / 10"）
- パーセント表示オプション（progressBar.init({ format: 'percent' })）を指定すると「33%」形式で表示
- finish() 時にバーを 100% にしてから 0.8 秒後にフェードアウトして DOM から除去
```

### bubble.ts — キャラクター吹き出し

- 画面左下に固定表示
- 職員風キャラクターアイコン（SVGで簡易描画、眼鏡+スーツ）
- 右側に吹き出し形のdivでセリフを表示
- テキストはタイプライター風に1文字ずつ表示（setTimeoutで実装、16ms間隔）
- 「次へ」ボタンで次のブロックへ進む

### engine.ts — シナリオ再生エンジン

```typescript
class ScenarioEngine {
  private scenario: Scenario
  private currentBlockId: string | null
  private currentStep: number   // 機能4: 現在ステップ（1始まり）

  constructor(scenario: Scenario)
  start(): void               // startBlockIdから再生開始・プログレスバー初期化
  next(blockId: string): void // 指定ブロックへ進む・プログレスバー更新
  private render(block: Block): void  // ブロック種別に応じてUIを切り替え
  finish(): void              // 全ブロック完了時にオーバーレイを除去・プログレスバーを完了状態へ
  destroy(): void             // プレビュー停止用：注入済みUI要素をすべて即時除去（プレビュー実行機能）
}
```

`TetsuzukiQuest`（`embed/index.ts` のグローバルオブジェクト）に公開するAPIの全容：

```typescript
interface TetsuzukiQuestAPI {
  start(jsonPath: string): Promise<void>
  startWithScenario(scenario: Scenario): void  // プレビュー実行機能
  stop(): void                                 // プレビュー実行機能
}
```

---

## デモシナリオJSON

アプリ初回起動時に以下のサンプルJSONをLocalStorageへ自動投入する。
エディタで編集可能な状態にしておく。

```json
{
  "id": "demo-moving",
  "title": "引越し・転居届の手続き",
  "category": "moving",
  "startBlockId": "block-1",
  "totalSteps": 8,
  "blocks": [
    {
      "id": "block-1",
      "type": "speech",
      "message": "引越しが決まったんですね！一緒に転居届の手続きを進めましょう。",
      "characterMood": "happy",
      "nextId": "block-2"
    },
    {
      "id": "block-2",
      "type": "branch",
      "question": "引越し前後の住所は同じ市区町村ですか？",
      "yesNextId": "block-3a",
      "noNextId": "block-3b"
    },
    {
      "id": "block-3a",
      "type": "speech",
      "message": "同じ市区町村内なら、転居届1枚で完了です！",
      "characterMood": "happy",
      "nextId": "block-4"
    },
    {
      "id": "block-3b",
      "type": "speech",
      "message": "市区町村をまたぐ場合は、旧住所の役所で転出届、新住所の役所で転入届の2回手続きが必要です。",
      "characterMood": "thinking",
      "nextId": "block-4"
    },
    {
      "id": "block-4",
      "type": "input-spotlight",
      "message": "まず、新しい郵便番号を入力してください。",
      "targetId": "postal-code",
      "targetLabel": "郵便番号入力欄",
      "nextId": "block-5"
    },
    {
      "id": "block-5",
      "type": "validation",
      "message": "郵便番号は「1234567」のように7桁の数字で入力してください。",
      "targetSelector": "#postal-code",
      "targetLabel": "郵便番号入力欄",
      "validationPattern": "^\\d{7}$",
      "errorMessage": "！ 郵便番号は7桁の数字で入力してください",
      "nextId": "block-6"
    },
    {
      "id": "block-6",
      "type": "document-preview",
      "message": "本人確認のため、マイナンバーカードが必要です。お手元のカードと見本を照合してください。",
      "targetId": "mynumber-input",
      "targetLabel": "マイナンバー入力欄",
      "documentType": "mynumber-card",
      "buttonLabel": "マイナンバーカードの見本を確認",
      "nextId": "block-7"
    },
    {
      "id": "block-7",
      "type": "spotlight",
      "message": "では、申請ボタンを押してください。",
      "targetSelector": "#submit-btn",
      "targetLabel": "申請するボタン",
      "nextId": "block-8"
    },
    {
      "id": "block-8",
      "type": "speech",
      "message": "手続き完了です！お疲れさまでした。",
      "characterMood": "happy",
      "nextId": null
    }
  ]
}
```

---

## デモ用テストページ

`public/demo.html` として、各機能のデモが確認できるシンプルなHTMLを作成する。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>転居届申請（デモ）</title>
</head>
<body>
  <h1>転居届 オンライン申請</h1>

  <!-- 機能1: 入力スポットライト・機能3: バリデーション のデモ対象 -->
  <label for="postal-code">郵便番号</label>
  <input type="text" id="postal-code" placeholder="例: 1234567">

  <!-- 機能2: 書類プレビュー のデモ対象 -->
  <label for="mynumber-input">マイナンバー</label>
  <input type="text" id="mynumber-input" placeholder="12桁の番号">

  <input type="text" placeholder="氏名">
  <input type="text" placeholder="新住所">

  <!-- 機能1: スポットライト のデモ対象 -->
  <button id="submit-btn">申請する</button>

  <script src="/embed.js"></script>
  <script>
    // 通常起動（直接ブラウザで開いたとき）
    TetsuzukiQuest.start('./demo-scenario.json')

    // プレビュー実行機能：エディタの PostMessage を受信して起動
    // （embed.js 内部で自動登録されるため、ここへの追記は不要。
    //   embed.js が postMessage リスナーを window に登録済み）
  </script>
</body>
</html>
```

> **注意**: `public/demo.html` はエディタの iframe から読み込まれる。このとき、ページ読み込み直後に `TetsuzukiQuest.start()` が呼ばれてしまうと、エディタからの `postMessage` が届く前にシナリオが自動再生されてしまう。そのため、`demo.html` を「プレビューモード（`?preview=1` クエリパラメータあり）」で開いた場合は自動再生を抑制し、`postMessage` での起動のみを受け付けるよう条件分岐を実装する。

```html
<script>
  const isPreviewMode = new URLSearchParams(location.search).has('preview')
  if (!isPreviewMode) {
    TetsuzukiQuest.start('./demo-scenario.json')
  }
  // postMessage リスナーは embed.js が自動登録するため追記不要
</script>
```

エディタの `PreviewPane` は `<iframe src="/demo.html?preview=1">` として読み込む。

---

## セットアップコマンド

```bash
npx create-next-app@latest tetsuzuki-quest --typescript --tailwind --app --src-dir
cd tetsuzuki-quest
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities zustand tsup
```

`tsup`のビルド設定（`tsup.config.ts`）：

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['embed/index.ts'],
  outDir: 'public',
  format: ['iife'],
  globalName: 'TetsuzukiQuest',
  minify: true,
  clean: false,
})
```

---

## 実装優先順位

1. 型定義（`scenario.ts`）
2. デモ用JSONとテストページ（`public/demo.html`）
3. プレイヤーのオーバーレイ・スポットライト（`embed/overlay.ts`）
4. プレイヤーのキャラクター吹き出し（`embed/bubble.ts`）
5. プレイヤーのエンジン（`embed/engine.ts`）— `startWithScenario()` / `stop()` / `destroy()` を含む
6. **プレイヤーの `postMessage` 受信ハンドラ（`embed/index.ts`）（プレビュー実行機能）**
7. **プレイヤーの進行状況プログレスバー（`embed/progressBar.ts`）（機能4）**
8. **プレイヤーの入力フォーム特化スポットライト（`embed/inputSpotlight.ts`）（機能1）**
9. **プレイヤーのダイナミックバリデーション（`embed/validation.ts`）（機能3）**
10. **プレイヤーの書類プレビューモーダル（`embed/documentPreview.ts`）（機能2）**
11. エディタのCanvas + BlockPalette
12. **エディタのプレビューツールバー（`PreviewToolbar.tsx`）（プレビュー実行機能）**
13. **エディタのプレビューパネル（`PreviewPane.tsx`）（プレビュー実行機能）**
14. エディタのBlockEditor（設定フォーム）
15. JSONエクスポート機能
