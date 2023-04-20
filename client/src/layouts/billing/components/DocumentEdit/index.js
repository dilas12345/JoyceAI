// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import {
  DraftailEditor,
  createEditorStateFromRaw,
  serialiseEditorStateToRaw
} from "draftail";
import React, { useState } from "react";
import { Editor, ContentState, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import linkifyPlugin from "./plugins/linkifyPlugin";
// import autoEmbedPlugin from "./plugins/autoEmbedPlugin";
import { INLINE_CONTROL, BLOCK_CONTROL, ENTITY_CONTROL } from "./ui";


import createHashtagPlugin from "draft-js-hashtag-plugin";
import createMentionPlugin, {
  defaultSuggestionsFilter
} from "draft-js-mention-plugin";

import createEmojiPlugin from "draft-js-emoji-plugin";
import createStickerPlugin from "draft-js-sticker-plugin";
// import ReadingTime from "./components/ReadingTime";
import { mentions } from "./plugins/mentions.js";

import { stickers } from "./plugins/stickers";
const stickerPlugin = createStickerPlugin({
  stickers: stickers,
  selectButtonContent: <button>Stickers</button>
});
const emojiPlugin = createEmojiPlugin();
const linkify = linkifyPlugin();
// const autoEmbed = autoEmbedPlugin();
const hashtagPlugin = createHashtagPlugin();
const mentionPlugin = createMentionPlugin({
  mentions,
  entityMutability: "IMMUTABLE",
  mentionComponent: mentionProps => (
    <span
      className={mentionProps.className}
      // eslint-disable-next-line no-alert
      onClick={() => alert("Clicked on the Mention!")}
    >
      {mentionProps.children}
    </span>
  ),
  // theme: mentionsStyles,
  // positionSuggestions,
  mentionPrefix: "@",
  supportWhitespace: false
});

function DocumentEdit(props, {noGutter}) {
  console.log("Props Response", props)
  const { generatedText } = props;
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [pdfGen, setPdfGen] = useState(false);
  const toggleSnackbar = () => setPdfGen(!pdfGen);

  // const initEditorState = createEditorStateFromRaw(allContentState);

  // const [editorState, setEditorState] = useState(initEditorState);
  const [suggestionsState, setSuggestionsState] = useState(mentions);

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const [contentState, setContentState] = useState(() => ContentState.createEmpty)

  const editor = React.useRef(null);
  
  function focusEditor() {
    editor.current.focus();
  }

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onChange = (state) => {
    setEditorState(state);
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    editor.current.focus();
  };

  const myKeyBindingFn = e => {
    console.log("myKeyBindingFn", e.keyCode);
    // if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    //   return 'myeditor-save';
    // }
    return getDefaultKeyBinding(e);
  };

  const onSearchChange = ({ value }) => {
    setSuggestionsState(defaultSuggestionsFilter(value, mentions));
  };

  const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
  const { MentionSuggestions } = mentionPlugin;
  const { StickerSelect } = stickerPlugin;
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Document Editor
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDButton variant="gradient" buttonColor="info" onClick={toggleSnackbar}>
        Open Snackbar
      </MDButton>
      
      <MDSnackbar
        color="info"
        icon="notifications"
        title="Your Generated document"
        content={generatedText}
        dateTime="11 mins ago"
        open={pdfGen}
        close={toggleSnackbar}
      />
      <MDBox pt={3} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <MDBox
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            bgColor={darkMode ? "transparent" : "grey-100"}
            borderRadius="lg"
            p={3}
            mb={noGutter ? 0 : 1}
            mt={2}
          >
            <MDBox width="100%" display="flex" flexDirection="column">
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
                mb={2}
              >
                <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                  To start working on your document, past Joyce's Response here!
                </MDTypography>

                <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                  <MDBox mr={1}>
                    <MDButton variant="text" color="error" onClick={onBoldClick}>
                      <Icon>bold</Icon>&nbsp;Bold
                    </MDButton>
                  </MDBox>
                  <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                    <Icon>edit</Icon>&nbsp;edit
                  </MDButton>
                  <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                    <Icon>edit</Icon>&nbsp;PDF
                  </MDButton>

                </MDBox>
              </MDBox>
              <MDBox mb={1} lineHeight={0} display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                <MDTypography variant="caption" color="text">
                  {/* <Editor
                    textAlignment
                    ref={editor}
                    editorState={editorState}
                    contentState={contentState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={onChange}
                    placeholder="Past or Write something!"
                  /> */}
                  <DraftailEditor
                    textAlignment
                    placeholder="Past or Write something!"
                    // rawContentState={allContentState}
                    // onSave={onSave}
                    editorState={editorState}
                    onChange={onChange}
                    stripPastedStyles={false}
                    enableHorizontalRule={{
                      description: "Horizontal rule"
                    }}
                    enableLineBreak={{
                      description: "Soft line break"
                    }}
                    showUndoControl={{
                      description: "Undo last change"
                    }}
                    showRedoControl={{
                      description: "Redo last change"
                    }}
                    maxListNesting={6}
                    blockTypes={Object.values(BLOCK_CONTROL)}
                    inlineStyles={Object.values(INLINE_CONTROL)}
                    entityTypes={[
                      ENTITY_CONTROL.IMAGE,
                      ENTITY_CONTROL.LINK,
                      ENTITY_CONTROL.EMBED,
                      ENTITY_CONTROL.DOCUMENT
                    ]}
                    plugins={[
                      // autoEmbed,
                      linkify,
                      hashtagPlugin,
                      mentionPlugin,
                      emojiPlugin,
                      stickerPlugin
                      // focusPlugin,
                      // resizeablePlugin
                    ]}
                    // controls={[ReadingTime]}
                    keyBindingFn={myKeyBindingFn}
                  />
                  <MentionSuggestions
                    onSearchChange={onSearchChange}
                    suggestions={suggestionsState}
                  />
                  <EmojiSuggestions />
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

DocumentEdit.defaultProps = {
  noGutter: false,
};

export default DocumentEdit;
