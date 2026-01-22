"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SkillIcon({
  skill,
}: {
  skill: { hover: string; default: string; size: number; name: string };
}) {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = skill.hover;
  }, [skill.hover]);

  return (
    <Image
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      src={hover ? skill.hover : skill.default}
      width={skill.size}
      height={skill.size}
      alt={`${skill.name} logo`}
    />
  );
}
