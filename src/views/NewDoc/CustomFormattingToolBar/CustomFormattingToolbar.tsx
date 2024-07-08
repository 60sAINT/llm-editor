import React from "react";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
} from "@blocknote/react";
import { ContinuationButton } from "./ContinuationButton";
import { TranslationButton } from "./TranslationButton";
import { PolishButton } from "./PolishButton";
import { RevisionButton } from "./RevisionButton";
import { SummaryButton } from "./SummaryButton";

export function CustomFormattingToolbar() {
  return (
    <FormattingToolbar>
      <BlockTypeSelect key={"blockTypeSelect"} />

      <FileCaptionButton key={"fileCaptionButton"} />
      <FileReplaceButton key={"replaceFileButton"} />

      <BasicTextStyleButton basicTextStyle={"bold"} key={"boldStyleButton"} />
      <BasicTextStyleButton
        basicTextStyle={"italic"}
        key={"italicStyleButton"}
      />
      <BasicTextStyleButton
        basicTextStyle={"underline"}
        key={"underlineStyleButton"}
      />
      <BasicTextStyleButton
        basicTextStyle={"strike"}
        key={"strikeStyleButton"}
      />
      {/* Extra button to toggle code styles */}
      <BasicTextStyleButton key={"codeStyleButton"} basicTextStyle={"code"} />

      <TextAlignButton textAlignment={"left"} key={"textAlignLeftButton"} />
      <TextAlignButton textAlignment={"center"} key={"textAlignCenterButton"} />
      <TextAlignButton textAlignment={"right"} key={"textAlignRightButton"} />

      <ColorStyleButton key={"colorStyleButton"} />

      <NestBlockButton key={"nestBlockButton"} />
      <UnnestBlockButton key={"unnestBlockButton"} />

      <CreateLinkButton key={"createLinkButton"} />

      {/* custom buttons */}
      {<ContinuationButton key={"textContinuationButton"} />}
      {<TranslationButton key={"textTranslationButton"} />}
      {<PolishButton key={"textPolishButton"} />}
      {<RevisionButton key={"textRevisionButton"} />}
      {<SummaryButton key={"textSummaryButton"} />}
    </FormattingToolbar>
  );
}
