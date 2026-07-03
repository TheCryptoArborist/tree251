import Image from "next/image";

export function PeterHeadshot({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/arborist-logo-cropped.png"
      alt="The Arborist logo for Peter Toler"
      width={440}
      height={440}
      className={className}
      priority
    />
  );
}
