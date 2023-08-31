import { api } from "@/utils/api";
import { APP_URL } from "@constants/app";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TRPCClientError, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Alert } from "react-native";
import superjson from "superjson";

type Props = {
  children: React.ReactNode;
};

export function TrpcProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        logger: {
          log(err) {},
          warn: (err) => {},
          error: (err) => {},
        },
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: "always",
            keepPreviousData: true,
            retry: 1,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof TRPCClientError) {
              Alert.alert(error.message);
            } else {
              console.log(error);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof TRPCClientError) {
              Alert.alert(error.message);
            } else {
              console.log(error);
            }
          },
          onSuccess(data) {
            if (
              typeof data === "object" &&
              data !== null &&
              "message" in data
            ) {
              const message = data.message as string;
              Alert.alert(message);
            }
          },
        }),
      }),
  );
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: APP_URL + "/api/trpc",
          headers() {
            return {
              authorization: "getAuthCookie",
            };
          },
        }),
      ],
    }),
  );
  return (
    <api.Provider
      client={trpcClient}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}
