import React, { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + text[index]);
        setIndex(index + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      return;
    }
  }, [index, text, displayedText]);

  return (
    <span>
      {displayedText}
      {index < text.length && <span className="typing-indicator">_</span>}
    </span>
  );
};

export default TypingEffect;
