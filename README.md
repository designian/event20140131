パイロット版プロトタイプ
=============

[http://designian.github.io/event20140131/](http://designian.github.io/event20140131/)

## ページ構成

* index.html
  * 検索フォーム
* result.html
  * 検索結果
* confirm_foward.html
  * 往路予約確認
* input_backward.html
  * 復路検索
* result_backward.html
  * 復路検索結果
* confirm_backward.html
  * 往復路予約確認
* complete.html
  * 予約完了

## フォルダ構成

```
.
├── index.html
├── *.html
│
├── /css /* スタイルフォルダ */
│   ├── *.css
│   ├── *.less
│   └── *.scss
│
├── /img /* 画像フォルダ */
│   └── *.png, *.jpg, *.gif
│
└── /js /* JSフォルダ */
    ├── *.js
    ├── /tmpl /* テンプレートフォルダ */
    │    └── *.js
    └── /lib /* ライブラリ系JSフォルダ */
    　    └── *.js
```

## 使用ライブラリ

* jQuery
* Underscore.js
* moment.js

## ワイヤーフレーム

![docs/Wireframe.png](docs/Wireframe.png)