import { type ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}

export default Container;
