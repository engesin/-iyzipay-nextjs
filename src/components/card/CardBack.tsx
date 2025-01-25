"use client";

type CardBackProps = {
  cvc: string;
};

export function CardBack({ cvc }: CardBackProps) {
  return (
    <div className="relative h-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-md">
      <div className="absolute top-8 left-0 w-full h-12 bg-gray-900" />
      <div className="absolute top-24 right-8 w-16 h-8 bg-white/30 flex items-center justify-center rounded">
        <span className="text-lg tracking-widest font-medium">
          {cvc || "•••"}
        </span>
      </div>
    </div>
  );
}
