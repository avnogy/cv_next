"use client";
import MyLogger from "../base/logger";
import QueryProvider from "./providers/QueryProvider";
import ColorProvider from "./providers/colorSchemeProvider";

function Providers({ children }: React.PropsWithChildren) {
  MyLogger.logInfo("build layout");
  return (
    <QueryProvider>
      <ColorProvider>{children}</ColorProvider>
    </QueryProvider>
  );
}

export default Providers;
