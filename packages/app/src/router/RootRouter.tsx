import Typography from "@/ui/Typography";
import Home from "@/screens/Home";
import Login from "@/screens/Login";
import Register from "@/screens/Register";
import { useAppTheme } from "@/store/theme";
import { type DrawerNavigationProp } from "@react-navigation/drawer";
import {
  NavigationContainer,
  type CompositeNavigationProp,
  type NavigationProp,
} from "@react-navigation/native";
import {
  createStackNavigator,
  type StackNavigationProp,
} from "@react-navigation/stack";
import { SafeAreaView } from "react-native";
import { type DrawerNavigationParamList } from "./DrawerRouter";

export type RootNavigatorParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

export type ScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootNavigatorParamList>,
  DrawerNavigationProp<DrawerNavigationParamList>
>;

export type RootNavigation = NavigationProp<RootNavigatorParamList>;

const Stack = createStackNavigator<RootNavigatorParamList>();
const { Navigator, Screen } = Stack;

function Router() {
  const { palette, spacing } = useAppTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer
        theme={{
          colors: {
            background: palette.background.primary,
            border: palette.divider,
            card: palette.background.secondary,
            notification: palette.background.primary,
            primary: palette.primary.main,
            text: palette.text.primary,
          },
          dark: false,
        }}
      >
        <Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: palette.background.primary,
              padding: spacing * 1,
            },
          }}
        >
          <Screen name="Home" component={Home} />
          <Screen
            name="Login"
            component={Login}
            options={{
              cardStyle: {
                padding: 0,
              },
            }}
          />
          <Screen
            name="Register"
            component={Register}
            options={{
              cardStyle: {
                padding: 0,
              },
            }}
          />
        </Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default Router;
