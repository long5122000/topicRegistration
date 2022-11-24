import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Radio from "../../components/radio/radio";
import { db } from "../../firebase-app/firebase-config";
import Heading from "../../layout/Heading";
import parse from "html-react-parser";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};
const BrowserTopicView = () => {
  const [params] = useSearchParams();
  const topicId: any = params.get("id");

  const [data, setData] = useState<any>([]);
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    reset,
    watch,
    getValues,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const fileUrl = getValues("cv");

  const fileRegex: any = /%2F(\S+)\?/gm.exec(fileUrl);
  const fileName: any = fileRegex?.length > 0 ? fileRegex[1] : "";
  console.log(fileName);

  const [file, setFile] = useState("");
  if (fileName.length > 0) {
    getDownloadURL(ref(getStorage(), fileName)).then((url) => {
      setFile(url);
    });
  }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  const watchStatus = watch("status");
  useEffect(() => {
    async function fetchData() {
      if (!topicId) return;
      const colRef = doc(db, "RegisterTopic", topicId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
      setData(docData.data());
    }
    fetchData();
  }, [topicId, reset]);
  interface values {
    status?: string;
    quatity?: number;
  }
  const handleBrowserTopic = async (values: values): Promise<void> => {
    console.log("je");

    if (!isValid) {
      console.log("cc");
      return;
    }
    try {
      const colRef1 = doc(db, "Topics", data.topicId);
      await updateDoc(colRef1, {
        quantity: 0,
      });
      const colRef2 = doc(db, "RegisterTopic", topicId);
      await updateDoc(colRef2, {
        status: "2",
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
      console.log(error);
    }
  };
  return (
    <div className="pb-10 bg-white">
      <Heading>Đề tài: {data.topicName}</Heading>
      <form>
        <div className="form-layout container mt-5">
          <Field>
            {" "}
            <Label>Tên sinh viên</Label>
            <Input name="name" disabled control={control}></Input>{" "}
          </Field>
          <Field>
            {" "}
            <Label>Email</Label>
            <Input name="email" disabled control={control}></Input>{" "}
          </Field>
        </div>
        <div className="form-layout container mt-5">
          <Field>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="category"
                checked={watchStatus === "1"}
                control={control}
                value={"1"}
              >
                KLTN
              </Radio>
              <Radio
                name="category"
                checked={watchStatus === "2"}
                control={control}
                value={"2"}
              >
                TTCN
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Ngày tạo</Label>
            <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
              {new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
                "vi-VI"
              )}
            </span>
          </Field>
        </div>
        <div className="form-layout container  mt-5">
          <Field>
            <Label>Lớp</Label>

            <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
              {data.class}
            </span>
          </Field>

          <Field>
            {" "}
            <Label>CV</Label>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <div>
              <p className="text-center">
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </p>
              <div className="flex justify-center gap-x-5">
                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                  className="bg-primary rounded-lg py-2 px-5 text-white"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                  className="bg-primary rounded-lg py-2 px-5 text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </Field>
        </div>
        <div className="container flex justify-center gap-x-3 pt-5">
          <Button
            kind="primary"
            type="button"
            onClick={handleBrowserTopic}
            className=""
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Duyệt đơn đăng ký
          </Button>
          <Button
            href="/ListLecturers"
            type="button"
            className="w-[250px]"
            kind="thirdary"
          >
            Từ chối đơn đăng ký
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BrowserTopicView;
