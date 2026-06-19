import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Logo from "./Logo";

interface PageShellProps {
  children: ReactNode;
  back?: boolean;
  rightSlot?: ReactNode;
}

export default function PageShell({ children, back, rightSlot }: PageShellProps) {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 sm:px-6">
      <header className="flex items-center justify-between py-6">
        {back ? (
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/25 transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        ) : (
          <Logo />
        )}
        {rightSlot}
      </header>
      <main className="flex-1 pb-16">{children}</main>
    </div>
  );
}
