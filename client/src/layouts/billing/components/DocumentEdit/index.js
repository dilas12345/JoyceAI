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

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Document.css';

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Document, Paragraph, Packer, TextRun } from 'docx';

import { Editor } from "@tinymce/tinymce-react"; // tinymce-react is imported as an ES module
import "./Styles.css";

function DocumentEdit(props, {noGutter}) {
  const { generatedText } = props;
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const inputRef = useRef(null);

  const [pdfGen, setPdfGen] = useState(false);
  const toggleSnackbar = () => setPdfGen(!pdfGen);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // The PrintDocument in PDF
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

                {/* <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                  
                  <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={exportToWord}>
                    <Icon>edit</Icon>&nbsp;Word Document
                  </MDButton>

                  <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={printDocument}>
                    <Icon>edit</Icon>&nbsp;PDF
                  </MDButton>

                </MDBox> */}
                <MDBox id="divToPrint" ref={inputRef}>

                </MDBox>
              </MDBox>
              <MDBox mb={1} lineHeight={0}  alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                <MDTypography>
                  <Editor
                    apiKey="obbqlqa91rkvis4829hrnxluw7i6fp1d1qdd41frnjdkmvxi"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>Joyce Document Editor.</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins:
                        "powerpaste casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage help formatpainter permanentpen charmap tinycomments linkchecker emoticons advtable export print autosave",
                      toolbar:
                        "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat",
                      height: "700px",
                      toolbar_sticky: false,
                      icons: "thin",
                      skin: "material-classic",
                      icons: "material",
                      content_style: "material-classic",
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
