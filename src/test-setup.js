// Mock React Native components
jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");

  // Mock all the components we're using
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

// Silence the warning about importing from root
jest.mock("expo-constants", () => ({
  default: {
    statusBarHeight: 0
  }
}));
