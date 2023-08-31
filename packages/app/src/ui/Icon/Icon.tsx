import {
  type PaletteColorKeys,
  getColorByNotation,
  useAppTheme,
} from "@store/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";

export type IconFamily =
  | "FontAwesome"
  | "AntDesign"
  | "MaterialIcons"
  | "EvilIcons"
  | "Entypo"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "Zocial"
  | "Octicons"
  | "SimpleLineIcons"
  | "Fontisto"
  | "Feather"
  | "FontAwesome5";

type Props = {
  family?: IconFamily;
  name: string;
  color?: PaletteColorKeys;
  size?: number;
};
const Icon = ({ name, color = "slate.500", size = 24, family }: Props) => {
  const theme = useAppTheme();
  const props = {
    name,
    color: getColorByNotation(color, theme) ?? theme.palette.text.primary,
    size,
  };
  switch (family) {
    case "FontAwesome":
      return <FontAwesome {...props} />;
    case "AntDesign":
      return <AntDesign {...props} />;
    case "MaterialIcons":
      return <MaterialIcons {...props} />;
    case "Entypo":
      return <Entypo {...props} />;
    case "Foundation":
      return <Foundation {...props} />;
    case "Ionicons":
      return <Ionicons {...props} />;
    case "Zocial":
      return <Zocial {...props} />;
    case "Octicons":
      return <Octicons {...props} />;
    case "SimpleLineIcons":
      return <SimpleLineIcons {...props} />;
    case "Fontisto":
      return <Fontisto {...props} />;
    case "Feather":
      return <Feather {...props} />;
    case "FontAwesome5":
      return <FontAwesome5 {...props} />;
    case "MaterialCommunityIcons":
    default:
      return <MaterialCommunityIcons {...props} />;
  }
};
export default Icon;
