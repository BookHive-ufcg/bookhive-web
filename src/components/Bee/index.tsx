// components/BeeIcon.tsx
import React from "react";

interface BeeIconProps {
  count: number;
  className?: string;
}

const BeeIcon: React.FC<BeeIconProps> = ({ count, className }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <img
          key={index}
          src="/img/abelha.png"
          alt="Bee icon"
          className={className}
          width={20}
          height={20}
        />
      ))}
    </>
  );
};

export default BeeIcon;
