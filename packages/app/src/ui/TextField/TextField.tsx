import { useAppTheme } from "@store/theme";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
  type TextInputProps,
} from "react-native";
import tw from "twrnc";
import Box from "../Box";
import FormHelperText from "../FormHelperText";
import Stack from "../Stack";
import Adornment from "./Adornment";
import Label, { type TextFieldLabelProps } from "./Label";
import Outlined from "./Outlined";

const FONT_SIZE = 16;

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: boolean;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const TextField = ({
  label,
  error,
  helperText,
  onFocus,
  onBlur,
  startAdornment,
  endAdornment,
  ...rest
}: TextFieldProps) => {
  const { palette } = useAppTheme();
  const isControlled = rest.value !== undefined;

  const validInputValue = isControlled ? rest.value : rest.defaultValue;
  const [uncontrolledValue, setUncontrolledValue] = useState<
    string | undefined
  >(validInputValue);

  const value = isControlled ? rest.value : uncontrolledValue;
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (value: string) => {
    if (!isControlled) setUncontrolledValue(value);
    rest.onChangeText?.(value);
  };

  const isActive = !!(value || isFocused);

  const LABEL_OFFSET: TextFieldLabelProps["offset"] = {
    x0: 14,
    y0: 22,
    x1: 14,
    y1: -4,
  };

  startAdornment && (LABEL_OFFSET.x0 += 24);

  useEffect(() => {
    if (!isControlled) setUncontrolledValue(validInputValue);
  }, [isControlled, validInputValue]);

  return (
    <Box className="relative ">
      <Stack direction="row">
        {startAdornment && (
          <Adornment position="start">{startAdornment}</Adornment>
        )}
        <TextInput
          selectionColor={palette.primary.main}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={value}
          underlineColorAndroid="transparent"
          onChangeText={handleChangeText}
          autoCapitalize="none"
          style={[
            tw`flex-grow flex-shrink ${clsx({
              "pl-4": !startAdornment,
              "pr-4": !endAdornment,
            })}`,
            styles.input,
            {
              color: palette.text.primary,
            },
          ]}
          {...rest}
        />
        {endAdornment && <Adornment position="end">{endAdornment}</Adornment>}
      </Stack>

      <Label
        error={error}
        label={label}
        offset={LABEL_OFFSET}
        isActive={isActive}
        containerStyle={{
          backgroundColor: palette.background.primary,
          paddingHorizontal: 4,
          zIndex: 1,
        }}
        isFocused={isFocused}
      />
      <Outlined isFocused={isFocused} error={error} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Box>
  );
};
export default TextField;

const styles = StyleSheet.create({
  input: {
    margin: 0,
    height: 56,
    paddingVertical: 14,
    fontSize: FONT_SIZE,
  },
});
