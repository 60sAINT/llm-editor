import React from "react";
import { BlockNoteSchema, defaultStyleSpecs } from "@blocknote/core";
import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import { RiText } from "react-icons/ri";

import { Font } from "./Font";

// Our schema with style specs, which contain the configs and implementations for styles
// that we want our editor to use.
const schema = BlockNoteSchema.create({
  styleSpecs: {
    // Adds all default styles.
    ...defaultStyleSpecs,
    // Adds the Font style.
    font: Font,
  },
});

// Formatting Toolbar button to set the font style.
export const SetFontStyleButton = () => {
  const editor = useBlockNoteEditor<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  >();

  const Components = useComponentsContext()!;

  return (
    <Components.FormattingToolbar.Button
      label="Set Font"
      mainTooltip={"Set Font"}
      icon={<RiText />}
      onClick={() => {
        const fontName = prompt("Enter a font name") || "Comic Sans MS";

        editor.addStyles({
          font: fontName,
        });
      }}
    />
  );
};
