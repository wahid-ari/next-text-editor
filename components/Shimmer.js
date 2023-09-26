import { twMerge } from 'tailwind-merge';

export default function Shimmer({ children, className, ...props }) {
  return (
    <div
      {...props}
      className={twMerge(
        'relative overflow-hidden rounded bg-neutral-200/60 p-4',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
        'before:bg-gradient-to-r before:from-transparent before:via-white/60',
        'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
        className
      )}
    >
      {children}
    </div>
  );
}
