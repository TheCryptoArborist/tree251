export function PeterHeadshot({ className = "" }: { className?: string }) {
  return (
    <img
      src="/assets/peter-toler-headshot.jpg?v=6"
      alt="Peter Toler, ISA Certified Arborist"
      width={320}
      height={400}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
