export function PeterHeadshot({ className = "" }: { className?: string }) {
  return (
    <img
      src="/peter-toler-headshot.svg"
      alt="Peter Toler, ISA Certified Arborist"
      width={197}
      height={245}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}
