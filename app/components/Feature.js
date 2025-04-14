"use client";

import { cn } from "@/lib/utils";

export function Feature({ title, description, icon, index }) {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-40 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-50/80 dark:from-neutral-800/50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-40 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-50/80 dark:from-neutral-800/50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[#0a2351]">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10 font-heading">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-7 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#0a2351] transition-all duration-300 ease-out origin-center" />
        <span className="group-hover/feature:translate-x-1 transition duration-300 ease-out inline-block text-[#0a2351]">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10 font-body">
        {description}
      </p>
    </div>
  );
}
