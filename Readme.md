# 手順

```bash
npx create-expo-app  --template
```

Need to install the following packages:
create-expo-app@3.4.2
Ok to proceed? (y) y

√ Choose a template: » Blank (TypeScript)
√ What is your app named? ... my-app

自動ネットワークインターフェースの選択が良くないため環境変数にIPアドレスを設定することで指定できる。

```bash
 $env:REACT_NATIVE_PACKAGER_HOSTNAME="192.168.10.109"
```

Web対応のプラグインインストール

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```
