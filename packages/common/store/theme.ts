import { create } from "zustand";
import {
  APP_COLORS,
  GRAY,
  NEUTRAL,
  SLATE,
  type PaletteColor,
} from "../theme/colors";
import THEME_TYPOGRAPHY from "../theme/typography";

export type State = {
  mode: "light" | "dark";
};

export type ThemeState = (
  | {
      mode: "light";
      palette: {
        background: {
          primary: "#fff";
          secondary: "#f2f2f2";
        };
        text: {
          primary: (typeof SLATE)[900];
          secondary: (typeof GRAY)[400];
          disabled: (typeof GRAY)[200];
        };
        divider: string;
      };
    }
  | {
      mode: "dark";
      palette: {
        background: {
          primary: (typeof NEUTRAL)[900];
          secondary: (typeof NEUTRAL)[700];
        };
        text: {
          primary: "#fff";
          secondary: (typeof GRAY)[400];
          disabled: (typeof GRAY)[200];
        };
        divider: string;
      };
    }
) & {
  palette: PaletteColor;
  spacing: number;
  borderRadius: number;
  typography: typeof THEME_TYPOGRAPHY;
};

const DARK_THEME = {
  mode: "dark" as const,
  palette: {
    ...APP_COLORS,
    background: {
      primary: NEUTRAL[900],
      secondary: NEUTRAL[700],
    },
    text: {
      primary: "#fff" as const,
      secondary: GRAY[400],
      disabled: GRAY[200],
    },
    divider: GRAY[400],
  },
};

const LIGHT_THEME = {
  mode: "light" as const,
  palette: {
    ...APP_COLORS,
    background: {
      primary: "#fff" as const,
      secondary: "#f2f2f2" as const,
    },
    text: {
      primary: SLATE[900],
      secondary: GRAY[400],
      disabled: GRAY[200],
    },
    divider: GRAY[200],
  },
};

export const useAppTheme = create<ThemeState>()(() => ({
  spacing: 8,
  borderRadius: 8,
  ...LIGHT_THEME,
  typography: THEME_TYPOGRAPHY,
}));

export const activateLightTheme = () => useAppTheme.setState(LIGHT_THEME);
export const activateDarkTheme = () => useAppTheme.setState(DARK_THEME);
export const toggleTheme = () =>
  useAppTheme.setState(state =>
    state.mode === "light" ? DARK_THEME : LIGHT_THEME,
  );

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;
type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;
export type PaletteColorKeys = DotNestedKeys<ThemeState["palette"]>;

export const getColorByNotation = (
  path: PaletteColorKeys,
  theme: ThemeState,
): string =>
  path.split(".").reduce(
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (p, c) => (p && p[c]) || null,
    theme.palette,
  ) as unknown as string;
