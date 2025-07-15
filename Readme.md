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

他、必要なライブラリ

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
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

## JEST導入

### 必要なパッケージのインストール

基本的なJESTライブラリとReact Native用のテストライブラリをインストール：

```bash
npm i -D jest @types/jest babel-jest
npm install --save-dev --save-exact react-test-renderer@19.0.0
npm i -D @testing-library/react-native @testing-library/jest-native
npx expo install jest-expo
```

### ESLint用のJESTプラグイン

```bash
npm install --save-dev eslint-plugin-jest
```

### 設定ファイル

#### jest.config.js

```javascript
/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/src/test-setup.js"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/build/"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-svg)"
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.tsx"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
```

#### src/test-setup.js

React NativeコンポーネントとExpoモジュールのモック設定：

```javascript
// Mock React Native components
jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");
  RN.View = "View";
  RN.Text = "Text";
  RN.StyleSheet = {
    create: jest.fn((styles) => styles)
  };
  return RN;
});

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn()
  }
}));

// Mock expo modules
jest.mock("expo-status-bar", () => ({
  StatusBar: "StatusBar"
}));

jest.mock("expo-constants", () => ({
  default: {
    statusBarHeight: 0
  }
}));
```

### ESLint設定

`.eslintrc.json`にJEST関連の設定を追加：

```json
{
  "plugins": ["react", "jest"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended"
  ],
  "env": {
    "node": true,
    "es2021": true,
    "jest": true
  },
  "overrides": [
    {
      "files": ["**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**/*", "**/test-setup.js"],
      "env": {
        "jest": true
      },
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off",
        "jest/no-focused-tests": "error",
        "jest/no-disabled-tests": "warn",
        "jest/prefer-to-be": "warn",
        "jest/no-identical-title": "error",
        "jest/valid-expect": "error"
      }
    }
  ]
}
```

### VSCode設定

#### .vscode/settings.json

```json
{
  "jest.jestCommandLine": "npm test --",
  "jest.runMode": "on-demand",
  "jest.rootPath": ".",
  "jest.outputConfig": {
    "revealOutput": "on-run"
  },
  "jest.enable": true,
  "jest.disabledWorkspaceFolders": []
}
```

#### .vscode/tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "shell",
      "label": "Jest Test",
      "command": "npm",
      "args": ["test"],
      "group": {
        "kind": "test",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always"
      },
      "problemMatcher": "$tsc"
    }
  ]
}
```

### テストの実行

```bash
# 全テストを実行
npm test

# ウォッチモードで実行
npm run test:watch

# VSCode内でテスト実行
# 1. コマンドパレット (Ctrl+Shift+P) → "Tasks: Run Test Task"
# 2. テストファイル内の "Run | Debug" ボタンをクリック
# 3. Testing サイドバーからテストを個別実行
```

### テストファイルの例

#### コンポーネントテスト

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Hello from './Hello';

describe('Hello Component', () => {
  it('renders Hello text with children', () => {
    render(<Hello>World</Hello>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });
});
```

#### 基本テスト

```typescript
describe('Basic Test', () => {
  it('should work', () => {
    expect(1 + 1).toBe(2);
  });
});
```

### 主要な機能

- **React Nativeコンポーネントテスト**: モック化されたコンポーネントでテスト実行
- **ESLint統合**: JESTベストプラクティスの強制
- **VSCode統合**: テストの実行、デバッグ、結果表示
- **TypeScript対応**: 型安全なテストコード
- **Expo対応**: Expoモジュールのモック設定
