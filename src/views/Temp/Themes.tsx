import React, { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Radio, RadioChangeEvent } from "antd";
import "./cssEditor.css";

// Base theme
const lightRedTheme = {
  colors: {
    editor: {
      text: "#222222",
      background: "#ffeeee",
    },
    menu: {
      text: "#ffffff",
      background: "#9b0000",
    },
    tooltip: {
      text: "#ffffff",
      background: "#b00000",
    },
    hovered: {
      text: "#ffffff",
      background: "#b00000",
    },
    selected: {
      text: "#ffffff",
      background: "#c50000",
    },
    disabled: {
      text: "#9b0000",
      background: "#7d0000",
    },
    shadow: "#640000",
    border: "#870000",
    sideMenu: "#bababa",
    highlights: lightDefaultTheme.colors!.highlights,
  },
  borderRadius: 4,
  fontFamily: "Helvetica Neue, sans-serif",
} satisfies Theme;

// The theme for dark mode,
// users the light theme defined above with a few changes
const darkRedTheme = {
  ...lightRedTheme,
  colors: {
    ...lightRedTheme.colors,
    editor: {
      text: "#ffffff",
      background: "#9b0000",
    },
    sideMenu: "#ffffff",
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

// The combined "red theme",
// we pass this to BlockNoteView and then the editor will automatically
// switch between lightRedTheme / darkRedTheme based on the system theme
const redTheme = {
  light: lightRedTheme,
  dark: darkRedTheme,
};
// 传递以下对象类型来分别覆盖浅色和深色主题的CSS变量
export interface Themes {
  light: Theme;
  dark: Theme;
}
/* type Theme & ColorScheme & CombinedColor
    type Theme = Partial<{
      colors: ColorScheme;
      borderRadius: number;
      fontFamily: string;
    }>;
    type ColorScheme = Partial<{
      editor: CombinedColor;
      menu: CombinedColor;
      tooltip: CombinedColor;
      hovered: CombinedColor;
      selected: CombinedColor;
      disabled: CombinedColor;
      shadow: string;
      border: string;
      sideMenu: string;
      highlights: Partial<{
        gray: CombinedColor;
        brown: CombinedColor;
        red: CombinedColor;
        orange: CombinedColor;
        yellow: CombinedColor;
        green: CombinedColor;
        blue: CombinedColor;
        purple: CombinedColor;
        pink: CombinedColor;
      }>;
    }>;
    type CombinedColor = Partial<{
      text: string;
      background: string;
    }>;
*/

export default function Themes() {
  const [theme, setTheme] = useState<Theme | Themes>(redTheme);
  const onChange = (e: RadioChangeEvent) => {
    setTheme(e.target.value);
  };
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "Open up a menu or toolbar to see more of the red theme",
      },
      {
        type: "paragraph",
        content:
          "Toggle light/dark mode in the page footer and see the theme change too",
      },
      {
        type: "paragraph",
      },
    ],
  });
  const cssEditor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "You'll see that the text is now blue",
      },
      {
        type: "paragraph",
        content:
          "Press the '/' key - the hovered Slash Menu items are also blue",
      },
      {
        type: "paragraph",
      },
    ],
  });
  const domEditor = useCreateBlockNote({
    // Sets attributes on DOM elements in the editor.
    domAttributes: {
      // Adds a class to all `blockContainer` elements.
      block: {
        class: "rounded border-gray border-2 p-0.5 m-0.5",
      },
    },
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "You can see there's a border around each block",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is because there's a CSS rule using the ",
            styles: {},
          },
          {
            type: "text",
            text: "hello-world-block",
            styles: { code: true },
          },
          {
            type: "text",
            text: " class we added",
            styles: {},
          },
        ],
      },
      {
        type: "paragraph",
      },
    ],
  });

  // Renders the editor instance using a React component.
  return (
    <>
      <h1 className="text-4xl font-bold text-primary mt-3">主题</h1>
      <BlockNoteView editor={editor} theme={theme} />
      <Radio.Group onChange={onChange} value={theme}>
        <Radio value={redTheme.light}>浅色主题</Radio>
        <Radio value={redTheme.dark}>深色主题</Radio>
      </Radio.Group>
      <h1 className="text-4xl font-bold text-primary mt-3">覆盖CSS</h1>
      {/* Adds `data-theming-css-demo` to restrict styles to only this demo.  */}
      <BlockNoteView editor={cssEditor} data-theming-css-demo />;
      <h1 className="text-4xl font-bold text-primary mt-3">添加DOM属性</h1>
      <BlockNoteView editor={domEditor} />;
    </>
  );
}
