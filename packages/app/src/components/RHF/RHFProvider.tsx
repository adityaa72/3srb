import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

// ----------------------------------------------------------------------

interface Props<T extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
}

export default function RHFProvider<T extends FieldValues>({
  children,
  methods,
}: Props<T>) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}
