import { useState } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import Box from "../Box";
import FormHelperText from "../FormHelperText/FormHelperText";
import Icon from "../Icon";
import IconButton from "../IconButton";
import TextField, { type TextFieldProps } from "../TextField";

type Props<T extends FieldValues> = UseControllerProps<T> &
  TextFieldProps & {
    showPassword?: boolean;
    onTogglePassword?: () => void;
  };

const RHFTextField = <T extends FieldValues>({
  name,
  secureTextEntry,
  onTogglePassword,
  ...restProps
}: Props<T>) => {
  const { control } = useFormContext<T>();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <Box>
          <TextField
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!error?.message}
            secureTextEntry={!showPassword && secureTextEntry}
            {...(secureTextEntry && {
              endAdornment: (
                <IconButton onPress={onTogglePassword ?? handleTogglePassword}>
                  <Icon
                    name={
                      restProps.showPassword || showPassword ? "eye-off" : "eye"
                    }
                    family="MaterialCommunityIcons"
                  />
                </IconButton>
              ),
            })}
            {...restProps}
          />
          {error?.message && (
            <FormHelperText error>{error.message}</FormHelperText>
          )}
        </Box>
      )}
    />
  );
};

export default RHFTextField;
