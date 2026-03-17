import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import { useContext } from "react";

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
