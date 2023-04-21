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

import React, { useState, useEffect, useRef } from "react";
import { EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Document.css';

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Document, Paragraph, Packer, TextRun } from 'docx';

function DocumentEdit(props, {noGutter}) {
  const { generatedText } = props;
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const inputRef = useRef(null);

  const [pdfGen, setPdfGen] = useState(false);
  const toggleSnackbar = () => setPdfGen(!pdfGen);

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  const printDocument = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const plainText = rawContentState.blocks
      .map(block => {
        const text = block.text.trim();
        if (!text) {
          return '';
        }
        const indent = ' '.repeat(block.depth * 4);
        return `${indent}${text}\n\n`;
      })
      .join('');

    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL(plainText);
      const pdf = new jsPDF('p','pt','a4');
      pdf.text(50, 20, plainText, { align: 'center' });
      // pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  function exportToWord() {
    const doc = new Document({
      sections: [
          {
              properties: {},
              children: [
                  new Paragraph({
                      children: [
                          new TextRun("Hello World"),
                          new TextRun({
                              text: "Foo Bar",
                              bold: true,
                          }),
                          new TextRun({
                              text: "\tGithub is the best",
                              bold: true,
                          }),
                      ],
                  }),
              ],
          },
      ],
  });
  
  // Used to export the file into a .docx file
  Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("My Document.docx", buffer);
  });
  }
  

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
                  
                  <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={exportToWord}>
                    <Icon>edit</Icon>&nbsp;Word Document
                  </MDButton>

                  <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={printDocument}>
                    <Icon>edit</Icon>&nbsp;PDF
                  </MDButton>

                </MDBox>
                <MDBox id="divToPrint" ref={inputRef}>

                </MDBox>
              </MDBox>
              <MDBox mb={1} lineHeight={0}  alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                <MDTypography>
                  <Editor
                    editorState={editorState}
                    placeholder="Past or Write something!"
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbar={{
                      options: ['inline', 'blockType']
                    }}
                    hashtag={{
                      separator: ' ',
                      trigger: '#',
                    }}
                    mention={{
                      separator: ' ',
                      trigger: '@',
                      suggestions: [
                        { text: 'JavaScript', value: 'javascript', url: 'js' },
                        { text: 'Golang', value: 'golang', url: 'go' },
                      ],
                    }}
                  />
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
