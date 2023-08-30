import clsx from "clsx";
import React from "react";
import { StyleSheet } from "react-native";
import Box from "../Box";

type Props = {
  position: "start" | "end";
  children: React.ReactNode;
};

const Adornment = ({ children, position }: Props) => {
  return (
    <Box
      className={`flex justify-center items-center self-center shrink-0 ${clsx(
        position === "start" ? "pl-3" : "pr-3",
      )}`}
    >
      {children}
    </Box>
  );
};

export default Adornment;

const styles = StyleSheet.create({});
