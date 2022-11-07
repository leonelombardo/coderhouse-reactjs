import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                overflowX: "hidden"
            }
        }
    },
    colors: {
        primary: {
            200: "#666",
            300: "#444",
            400: "#222",
            500: "#1a1a1a",
            600: "#111",
            700: "#000"
        },
        secondary: {
            500: "#fff",
            600: "#f9f9f9",
            700: "#efefef"
        }
    },
    components: {
        Container: {
            baseStyle: {
                display: "flex",
                justifyContent: "center",
                maxWidth: 1200,
                width: "100%",
                backgroundColor: "secondary.500",
                margin: 0
            }
        },
        Text: {
            baseStyle: {
                color: "primary.500"
            }
        },
        Button: {
            variants: {
                outline: {
                    paddingY: 1,
                    paddingX: 2,
                    height: "auto",
                    borderColor: "secondary",
                }
            }
        },
        Heading: {
            baseStyle: {
                fontFamily: "Inter Tight"
            }
        }
    }
})