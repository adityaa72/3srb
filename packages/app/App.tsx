import { TrpcProvider } from "@/providers/TrpcProvider";
import Router from "@/router/RootRouter";
import "react-native-gesture-handler";


const App = () => (
  <TrpcProvider>
    <Router />
  </TrpcProvider>
);

export default App;
