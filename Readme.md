# React Native Practice

これは React Nativeの練習コードです。
Android, Webで使用を目的に作成しています。

<https://github.com/shunwitter>

作成手順。
templateオプションを付けて実行。

```bash
npx create-expo-app  --template
```

テンプレートはBlank (TypeScript)を選択。

```text
√ Choose a template: » Blank (TypeScript)
```

## TIPS

自動ネットワークインターフェースの選択が良くないため環境変数にIPアドレスを設定することで指定できる。

```bash
 $env:REACT_NATIVE_PACKAGER_HOSTNAME="192.168.10.109"
 npm run start
```

デフォルトではモバイルのみの対応のため必要なライブラリを追加でインストールする。

Web対応のプラグインインストール

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

## ESlint

ESLintのバージョン 9.xから書き方が大きく変わっている。
研修に合わせるために今回は8.xを使用する。

```bash
npm install eslint@8.57.0 --save-dev
```

```text
? What do you want to lint? ... JavaScript
? How would you like to use ESLint? ... To check syntax and find problems
? What type of modules does your project use? ... JavaScript modules (import/export)
? Which framework does your project use? ...  React
? Does your project use TypeScript? » yes
? Where does your code run? ...Node
√ Would you like to install them now? ·  Yes
? Which package manager do you want to use? ... npm
```
