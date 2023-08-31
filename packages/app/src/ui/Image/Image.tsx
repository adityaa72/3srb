import { Image as RNImage, StyleSheet, type ImageProps } from "react-native";
import tw from "twrnc";

type Props = ImageProps & {
  className?: string;
};

const Image = ({ className, ...props }: Props) => {
  return <RNImage style={[tw`${className ?? ""}`]} {...props} />;
};

export default Image;

const styles = StyleSheet.create({});
