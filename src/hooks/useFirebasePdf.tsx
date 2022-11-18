import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

type FirebasePdf = {
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  handleResetUpload: () => void;
  handleSelectFile: (e: any) => void;
  handleDeleteFile: () => void;
  progress: number;
  setValue?: any;
  getValues?: any;
  fileName?: null;
  cb?: () => void;
};

export default function useFirebaseImage(
  setValue: any,
  getValues: any,
  fileName = null,
  cb = () => {}
): FirebasePdf {
  const [progress, setProgress] = useState<number>(0);
  const [file, setFile] = useState("");
  // if (!setValue || !getValues) return;

  const handleUploadFile = (file: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, "file/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log("Error");
        setFile("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFile(downloadURL);
        });
      }
    );
  };
  const handleSelectFile = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    setValue("file_name", file.name);
    handleUploadFile(file);
  };

  const handleDeleteFile = () => {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      "file/" + (fileName || getValues("file_name"))
    );
    deleteObject(imageRef)
      .then(() => {
        console.log("Remove image successfully");

        setFile("");
        setProgress(0);
        cb();
      })
      .catch((error) => {
        console.log("handleDeleteImage ~ error", error);
        console.log("Can not delete image");
        setFile("");
      });
  };
  const handleResetUpload = (): void => {
    setFile("");
    setProgress(0);
  };
  return {
    file,
    setFile,
    handleResetUpload,
    progress,
    handleSelectFile,
    handleDeleteFile,
  };
}
