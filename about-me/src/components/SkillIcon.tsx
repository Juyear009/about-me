"use client";

import Image from "next/image";
import { useState } from "react";

export default function SkillIcon({ skill }) {
  const [hover, setHover] = useState(false);

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
