# Lessons

## ブロックID生成は短く

`block-${Date.now()}-${random}` だと Date.now() の13桁タイムスタンプで表示が崩れる。
`block-${Math.random().toString(36).slice(2, 7)}` のようにランダム5文字だけで十分。

## ドロップダウンにIDだけ表示しない

ブロック選択セレクトに `{b.id}` だけ出してもランダム文字列では判別不能。
`blockLabel(b)` で「💬 新しいセリフ」「✏️ 郵便番号入力欄」のように絵文字＋内容を表示する。
