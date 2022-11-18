import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

type FirebaseImage = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  handleResetUpload: () => void;
  handleSelectImage: (e: any) => void;
  handleDeleteImage: () => void;
  progress: number;
  setValue?: any;
  getValues?: any;
  imageName?: null;
  cb?: () => void;
};

export default function useFirebaseImage(
  setValue: any,
  getValues: any,
  imageName = null,
  cb = () => {}
): FirebaseImage {
  const [progress, setProgress] = useState<number>(0);
  const [image, setImage] = useState("");
  // if (!setValue || !getValues) return;

  const handleUploadImage = (file: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
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
        setImage("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );
    deleteObject(imageRef)
      .then(() => {
        console.log("Remove image successfully");

        setImage("");
        setProgress(0);
        cb();
      })
      .catch((error) => {
        console.log("handleDeleteImage ~ error", error);
        console.log("Can not delete image");
        setImage("");
      });
  };
  const handleResetUpload = (): void => {
    setImage("");
    setProgress(0);
  };
  return {
    image,
    setImage,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  };
}
