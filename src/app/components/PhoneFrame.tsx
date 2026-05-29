import { ReactNode } from "react";

export function PhoneFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-[13px] text-neutral-500 tracking-wide">{label}</span>
      <div className="relative w-[340px] h-[700px] bg-black rounded-[44px] p-[10px] shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
        <div className="relative w-full h-full bg-white rounded-[36px] overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
