import { ReactNode } from "react";
export default function FilmStage({ children }: { children: ReactNode }) { return <div className="film-stage" aria-live="polite">{children}</div>; }
