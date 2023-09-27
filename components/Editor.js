import { useEffect } from "react";
import { useTheme } from "next-themes";
import {
  defaultBlockSchema,
  defaultProps,
} from "@blocknote/core";
import {
  BlockNoteView, darkDefaultTheme,
  lightDefaultTheme, useBlockNote, createReactBlockSpec,
  InlineContent,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import Image from "next/image";

// Custom light theme
const lightTheme = {
  type: "light",
  colors: {
    editor: {
      text: "#222222",
      background: "#ffffff",
    },
    menu: {
      text: "#222",
      background: "#fff",
    },
    tooltip: {
      text: "#222",
      background: "#fff",
    },
    hovered: {
      text: "#222",
      background: "#e5e5e5",
    },
    selected: {
      text: "#222",
      background: "#fff",
    },
    disabled: {
      text: "#a3a3a3",
      background: "#fff",
    },
    shadow: "#e5e5e5",
    border: "#e5e5e5",
    sideMenu: "#bababa",
    highlightColors: lightDefaultTheme.colors.highlightColors,
  },
  borderRadius: 4,
  fontFamily: "Helvetica Neue, sans-serif",
};

// Custom dark theme
const darkTheme = {
  ...lightTheme,
  type: "dark",
  colors: {
    ...lightTheme.colors,
    editor: {
      text: "#ffffff",
      background: "#171717",
    },
    menu: {
      text: "#fff",
      background: "#171717",
    },
    tooltip: {
      text: "#fff",
      background: "#171717",
    },
    hovered: {
      text: "#fff",
      background: "#262626",
    },
    selected: {
      text: "#fff",
      background: "#171717",
    },
    disabled: {
      text: "#a3a3a3",
      background: "#171717",
    },
    shadow: "#0a0a0a",
    border: "#262626",
    sideMenu: "#bababa",
    highlightColors: darkDefaultTheme.colors.highlightColors,
  },
};

// Combining the custom themes into a single theme object.
const theme = {
  light: lightTheme,
  dark: darkTheme,
};

// Gets the previously stored editor contents.
// const initialContent = localStorage.getItem("editorContent");

export default function Editor({ value, setValue }) {
  const { theme: currentTheme } = useTheme();
  // Creates a custom image block.
  // FIX https://github.com/TypeCellOS/BlockNote/issues/282
  // FIX https://github.com/TypeCellOS/BlockNote/pull/331
  const ImageBlock = createReactBlockSpec({
    type: "image",
    propSchema: {
      ...defaultProps,
      src: {
        default: "https://via.placeholder.com/200",
      }
    },
    containsInlineContent: true,
    render: ({ block }) => {
      console.log("block", block)
      return (
        <div id="image-wrapper" className="editor">
          {/* <Image src={block.props.src}
            alt={"Image"}
            width={100}
            height={100}
            contentEditable={false} /> */}
          <img
            src={block.props.src}
            alt={"Image"}
            contentEditable={false}
          />
          <InlineContent />
        </div>
      )
    },
  });

  // The custom schema, which includes the default blocks and the custom image block.
  const customSchema = {
    // Adds all default blocks.
    ...defaultBlockSchema,
    // Adds the custom image block.
    image: ImageBlock,
  };

  // Creates a slash menu item for inserting an image block.
  const insertImage = {
    name: "Insert Image",
    execute: (editor) => {
      console.log("execute")
      console.log(editor)
      const src = prompt("Enter image URL");
      // const alt = prompt("Enter image alt text");
      editor.insertBlocks(
        [
          {
            // content: [
            //   {
            //     type: 'text',
            //     text: 'lala'
            //   }
            // ],
            type: "image",
            props: {
              src: src || "https://via.placeholder.com/100",
              // alt: alt || "image",
            },
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["image", "img", "picture", "media"],
    group: "Media",
    icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M5 11.1005L7 9.1005L12.5 14.6005L16 11.1005L19 14.1005V5H5V11.1005ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10Z"></path></svg>,
    hint: "Insert an image",
  };

  // / Creates a new editor instance.
  const editor = useBlockNote({
    // If the editor contents were previously saved, restores them.
    // initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    // Serializes and saves the editor contents to local storage.
    // onEditorContentChange: (editor) => {
    // localStorage.setItem(
    //   "editorContent",
    //   JSON.stringify(editor.topLevelBlocks)
    // );
    // }
    onEditorContentChange: (editor) => {
      console.log("onEditorContentChange")
      const saveBlocksAsHTML = async () => {
        const blocksToHTML = await editor.blocksToHTML(editor.topLevelBlocks);
        setValue(blocksToHTML);
        console.log(blocksToHTML)
      };
      saveBlocksAsHTML();
    },
    // Tells BlockNote which blocks to use.
    blockSchema: customSchema,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(customSchema),
      insertImage,
    ],
  });

  useEffect(() => {
    if (editor) {
      // Whenever the current HTML content changes, converts it to an array of 
      // Block objects and replaces the editor's content with them.
      console.log("useEffect editor")
      const getBlocks = async () => {
        const blocks = await editor.HTMLToBlocks(value);
        console.log(blocks)
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      getBlocks();
    }
    console.log("editor", editor)
  }, [editor]);

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} className="min-h-[200px] py-2"
    // Adding the custom themes. The editor will use the browser settings to
    // determine if the light or dark theme is used.
    theme={currentTheme == 'dark' ? theme.dark : theme.light}
  />;

}