import React from "react";
import { Document, PDFViewer, Page } from "@react-pdf/renderer";
import Template1 from "../Templates/Template1";
import Template1lg from "../TemplatesHtml/Template1lg";
import Template1sm from "../TemplateSmall/Template1sm";
import Template2 from "../Templates/Template2";
import Template2lg from "../TemplatesHtml/Template2lg";
import Template3 from "../Templates/Template3";
import Template3lg from "../TemplatesHtml/Template3lg";
import Template3sm from "../TemplateSmall/Template3sm";
import Template4 from "../Templates/Template4";
import Template4lg from "../TemplatesHtml/Template4lg";
import Template5 from "../Templates/Template5";
import Template5lg from "../TemplatesHtml/Template5lg";
import Template5sm from "../TemplateSmall/template5sm";
import Template6 from "../Templates/Template6";
import Template6lg from "../TemplatesHtml/Template6lg";
import Template6sm from "../TemplateSmall/Template6sm";
import Template7 from "../Templates/Template7";
import Template7lg from "../TemplatesHtml/Template7lg";
import Template7sm from "../TemplateSmall/Template7sm";
import Template8 from "../Templates/Template8";
import Template8lg from "../TemplatesHtml/Template8lg";
import Template8sm from "../TemplateSmall/Template8sm";
import Template9 from "../Templates/Template9";
import Template9lg from "../TemplatesHtml/Template9lg";
import Template9sm from "../TemplateSmall/Template9sm";

interface TemplateManagementProps {
  name: string; // Prop to specify template name
  bgColor: string; // Prop to specify background color
  resumeData: any;
  cvInfo: any;
  height?: any;
  tag?: string;
  width?: any;
  maxWidth?: any;
  maxHeight?: any;
}

const TemplateManagement: React.FC<TemplateManagementProps> = ({
  name,
  bgColor,
  resumeData,
  cvInfo,
  height,
  width,
  maxWidth,
  maxHeight,
  tag = "pdf",
}) => {
  const renderTemplate = () => {
    switch (name) {
      case "tempate a":
        if (tag === "pdf") {
          return (
            <PDFViewer showToolbar={false} width="100%" height="100%">
              <Template1
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </PDFViewer>
          );
        } else if (tag === "html") {
          return (
            <div
              style={{
                padding: 15,
                height: height,
                maxHeight: maxHeight,
                width: width,
                maxWidth: maxWidth,
              }}
            >
              <Template1lg
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </div>
          );
        } else if (tag === "htmlsm") {
          return (
            <Template1sm
              resumeData={resumeData}
              cvInfo={cvInfo}
              bgColor={bgColor}
            />
          );
        }
      // case "tempate b":
      //   if (tag === "pdf") {
      //     return (
      //       <PDFViewer showToolbar={false} width="100%" height="100%">
      //         <Template2
      //           resumeData={resumeData}
      //           cvInfo={cvInfo}
      //           bgColor={bgColor}
      //         />
      //       </PDFViewer>
      //     );
      //   } else if (tag === "html") {
      //     return (
      //       <div
      //         style={{
      //           padding: 15,
      //           height: height,
      //           width: width,
      //           maxWidth: maxWidth,
      //         }}
      //       >
      //         <Template2lg
      //           resumeData={resumeData}
      //           cvInfo={cvInfo}
      //           bgColor={bgColor}
      //         />
      //       </div>
      //     );
      //   } else if (tag === "htmlsm") {
      //     return (
      //       <Template2lg
      //         resumeData={resumeData}
      //         cvInfo={cvInfo}
      //         bgColor={bgColor}
      //       />
      //     );
      //   }
      case "tempate c":
        if (tag === "pdf") {
          return (
            <PDFViewer showToolbar={false} width="100%" height="100%">
              <Template3
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </PDFViewer>
          );
        } else if (tag === "html") {
          return (
            <div
              style={{
                padding: 15,
                height: height,
                width: width,
                maxWidth: maxWidth,
              }}
            >
              <Template3lg
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </div>
          );
        } else if (tag === "htmlsm") {
          return (
            <Template3sm
              resumeData={resumeData}
              cvInfo={cvInfo}
              bgColor={bgColor}
            />
          );
        }
      // case "template d":
      //   if (tag === "pdf") {
      //     return (
      //       <PDFViewer showToolbar={false} width="100%" height="100%">
      //         <Template4
      //           resumeData={resumeData}
      //           cvInfo={cvInfo}
      //           bgColor={bgColor}
      //         />
      //       </PDFViewer>
      //     );
      //   } else if (tag === "html") {
      //     return (
      //       <div
      //         style={{
      //           padding: 15,
      //           height: height,
      //           width: width,
      //           maxWidth: maxWidth,
      //         }}
      //       >
      //         <Template4lg
      //           resumeData={resumeData}
      //           cvInfo={cvInfo}
      //           bgColor={bgColor}
      //         />
      //       </div>
      //     );
      //   } else if (tag === "htmlsm") {
      //     <Template4lg
      //       resumeData={resumeData}
      //       cvInfo={cvInfo}
      //       bgColor={bgColor}
      //     />;
      //   }
      case "tempate e":
        if (tag === "pdf") {
          return (
            <PDFViewer showToolbar={false} width="100%" height="100%">
              <Template5
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </PDFViewer>
          );
        } else if (tag === "html") {
          return (
            <div
              style={{
                padding: 15,
                height: height,
                width: width,
                maxWidth: maxWidth,
              }}
            >
              <Template5lg
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </div>
          );
        } else if (tag === "htmlsm") {
          return (
            <Template5sm
              resumeData={resumeData}
              cvInfo={cvInfo}
              bgColor={bgColor}
            />
          );
        }
      case "tempate f":
        if (tag === "pdf") {
          return (
            <PDFViewer showToolbar={false} width="100%" height="100%">
              <Template6
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </PDFViewer>
          );
        } else if (tag === "html") {
          return (
            <div
              style={{
                padding: 15,
                height: height,
                width: width,
                maxWidth: maxWidth,
              }}
            >
              <Template6lg
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </div>
          );
        } else if (tag === "htmlsm") {
          return (
            <Template6sm
              resumeData={resumeData}
              cvInfo={cvInfo}
              bgColor={bgColor}
            />
          );
        }
      case "tempate g":
        if (tag === "pdf") {
          return (
            <PDFViewer showToolbar={false} width="100%" height="100%">
              <Template7
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </PDFViewer>
          );
        } else if (tag === "html") {
          return (
            <div
              style={{
                // padding: 15,
                height: height,
                width: width,
                maxWidth: maxWidth,
              }}
            >
              <Template7lg
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </div>
          );
        } else if (tag === "htmlsm") {
          return (
            <Template7sm
              resumeData={resumeData}
              cvInfo={cvInfo}
              bgColor={bgColor}
            />
          );
        }
      case "tempate h":
        if (tag === "pdf") {
          return (
            <PDFViewer showToolbar={false} width="100%" height="100%">
              <Template8
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </PDFViewer>
          );
        } else if (tag === "html") {
          return (
            <div
              style={{
                padding: 15,
                height: height,
                width: width,
                maxWidth: maxWidth,
              }}
            >
              <Template8lg
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </div>
          );
        } else if (tag === "htmlsm") {
          return (
            <Template8sm
              resumeData={resumeData}
              cvInfo={cvInfo}
              bgColor={bgColor}
            />
          );
        }
      case "tempate i":
        if (tag === "pdf") {
          return (
            <PDFViewer showToolbar={false} width="100%" height="100%">
              <Template9
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </PDFViewer>
          );
        } else if (tag === "html") {
          return (
            <div
              style={{
                padding: 15,
                height: height,
                width: width,
                maxWidth: maxWidth,
              }}
            >
              <Template9lg
                resumeData={resumeData}
                cvInfo={cvInfo}
                bgColor={bgColor}
              />
            </div>
          );
        } else if (tag === "htmlsm") {
          return (
            <Template9sm
              resumeData={resumeData}
              cvInfo={cvInfo}
              bgColor={bgColor}
            />
          );
        }
      default:
        return (
          <PDFViewer showToolbar={false} width="100%" height="100%">
            <Document>
              <Page size="A4"></Page>
            </Document>
          </PDFViewer>
        );
    }
  };

  return <div className="h-screen">{renderTemplate()}</div>;
};

export default TemplateManagement;
