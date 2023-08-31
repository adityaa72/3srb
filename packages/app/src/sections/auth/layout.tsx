import Box from "@/ui/Box";
import Button from "@/ui/Button";
import Divider from "@/ui/Divider";
import Image from "@/ui/Image";
import Typography from "@/ui/Typography";
import { APP_COLORS } from "@/theme/colors";
import React from "react";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <LinearGradient
      style={{ flex: 1, width: "100%" }}
      colors={[
        APP_COLORS.sky[500],
        APP_COLORS.blue[500],
        APP_COLORS.indigo[500],
      ]}
    >
      <Box className="min-h-full">
        <Box className="justify-center items-center" style={{ height: 350 }}>
          <Image
            className="w-40 h-40 self-center"
            source={{
              uri: "https://cdn3d.iconscout.com/3d/free/thumb/free-om-coin-4268033-3543579.png",
            }}
          />
          <Typography variant="h4" color="text.primary" className="text-white">
            Verify Your Email
          </Typography>
          <Typography>Enter your details to get started</Typography>
        </Box>
        <Box className="flex-1 bg-white rounded-t-3xl gap-6 p-5 ">
          <Button color="error.main" size="large">
            Login with Google
          </Button>
          <Divider>
            <Typography style={{ fontWeight: "bold" }}>OR</Typography>
          </Divider>
          {children}
        </Box>
      </Box>
    </LinearGradient>
  );
};

export default AuthLayout;
