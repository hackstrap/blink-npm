import { makeStyles, useTheme } from "@material-ui/core";
import React, { useState } from "react";
// import ReactQuill from "react-quill";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import DropdownComponent from "../../../../DropdownComponent/DropdownComponent";
import styles from "./index.module.css";
const useStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxShadow: "2px 2px 9px #bbb",
      borderRadius: " 0.5rem",
      backgroundColor: "white",
      [theme.breakpoints.down("md")]: {
        padding: 16,
        paddingTop: 32,
        paddingBottom: 32,
      },
      [theme.breakpoints.up("lg")]: {
        padding: 32,
      },
    },
  };
});

interface PropsInterface {
  title: string;
  defaultValue?: string;
}

const NotesComponent = ({ title, defaultValue }: PropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [value, setValue] = useState<string>(defaultValue ? defaultValue : "");
  const options = {
    buttonList: [
      // default
      ["undo", "redo"],
      [
        ":p-More Paragraph-default.more_paragraph",
        "font",
        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
      ],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["removeFormat"],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      [
        "-right",
        ":i-More Misc-default.more_vertical",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
        "print",
        "save",
        "template",
      ],
      ["-right", ":r-More Rich-default.more_plus", "table", "imageGallery"],
      ["-right", "image", "video", "audio", "link"],
      // (min-width: 992)
      [
        "%992",
        [
          ["undo", "redo"],
          [
            ":p-More Paragraph-default.more_paragraph",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
          ],
          ["bold", "underline", "italic", "strike"],
          [
            ":t-More Text-default.more_text",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
          ],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          [
            "-right",
            ":i-More Misc-default.more_vertical",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
            "template",
          ],
          [
            "-right",
            ":r-More Rich-default.more_plus",
            "table",
            "link",
            "image",
            "video",
            "audio",
            "imageGallery",
          ],
        ],
      ],
      // (min-width: 767)
      [
        "%767",
        [
          ["undo", "redo"],
          [
            ":p-More Paragraph-default.more_paragraph",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
          ],
          [
            ":t-More Text-default.more_text",
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
          ],
          ["removeFormat"],
          ["outdent", "indent"],
          [
            ":e-More Line-default.more_horizontal",
            "align",
            "horizontalRule",
            "list",
            "lineHeight",
          ],
          [
            ":r-More Rich-default.more_plus",
            "table",
            "link",
            "image",
            "video",
            "audio",
            "imageGallery",
          ],
          [
            "-right",
            ":i-More Misc-default.more_vertical",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
            "template",
          ],
        ],
      ],
      // (min-width: 480)
      [
        "%480",
        [
          ["undo", "redo"],
          [
            ":p-More Paragraph-default.more_paragraph",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
          ],
          [
            ":t-More Text-default.more_text",
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
            "removeFormat",
          ],
          [
            ":e-More Line-default.more_horizontal",
            "outdent",
            "indent",
            "align",
            "horizontalRule",
            "list",
            "lineHeight",
          ],
          [
            ":r-More Rich-default.more_plus",
            "table",
            "link",
            "image",
            "video",
            "audio",
            "imageGallery",
          ],
          [
            "-right",
            ":i-More Misc-default.more_vertical",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
            "template",
          ],
        ],
      ],
    ],
  };

  return (
    <div className={classes.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.notesHeading}>{title}</div>
        <div>
          <DropdownComponent
            options={[{ Header: "2021", accessor: "2021" }]}
            changeHandler={() => {}}
          />
        </div>
      </div>
      <SunEditor
        setOptions={options}
        defaultValue={value}
        onChange={(val) => setValue(val)}
      />
    </div>
  );
};

export default NotesComponent;
