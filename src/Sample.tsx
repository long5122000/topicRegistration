import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

const Sample = () => {
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/kltn-b2af4.appspot.com/o/images%2F22_LuongDucLong.pdf?alt=media&token=a2ba56b5-4b04-4879-927e-1507953b9897";
  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const [file, setFile] = useState("");
  console.log("f", file);

  useEffect(() => {
    getDownloadURL(ref(getStorage(), "13-02-search.pdf")).then((url) => {
      setFile(url);
    });
  }, [file]);

  const [numPages, setNumPages] = useState(null);

  function onFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};
export default Sample;
