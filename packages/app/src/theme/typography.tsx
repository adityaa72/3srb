const THEME_TYPOGRAPHY = {
  h1: {
    fontWeight: "800",
    fontSize: 38,
  },
  h2: {
    fontWeight: "800",
    fontSize: 32,
  },
  h3: {
    fontWeight: "700",
    fontSize: 22,
  },
  h4: {
    fontWeight: "700",
    fontSize: 20,
  },
  h5: {
    fontWeight: "700",
    fontSize: 17,
  },
  h6: {
    fontWeight: "700",
    fontSize: 15,
  },
  title1: {
    fontWeight: "600",
    fontSize: 14,
  },
  title2: {
    fontWeight: "600",
    fontSize: 13,
  },
  subtitle1: {
    fontWeight: "500",
    fontSize: 14,
  },
  subtitle2: {
    fontWeight: "500",
    fontSize: 13,
  },
  body1: {
    fontSize: 14,
  },
  body2: {
    fontSize: 13,
  },
  caption: {
    fontSize: 12,
  },
  overline: {
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase" as const,
  },
  button: {
    fontWeight: "600",
    fontSize: 14,
    textTransform: "capitalize" as const,
  },
};

export type TypographyVariants = keyof typeof THEME_TYPOGRAPHY;

export default THEME_TYPOGRAPHY;
