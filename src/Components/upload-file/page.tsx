"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "../CustomButton";
import ImageUpload from "../CustomUpload";
import { useState } from "react";
import axios from "axios";
import { headers } from "next/headers";


type Inputs = {
  example: string;
  exampleRequired: string;
};

const UploadFile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<any>();

  const handleFileChange = (event: any) => {
    setSelectedImage(event.target.files[0]);
  };

  //   console.log(selectedImage)

  const onSubmit = async (data: any) => {
    const req = {
      file: selectedImage,
    };
    const result = await axios.post("http://localhost:8080/users/upload", req, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (result) console.log("uploaded successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageUpload
        name="file"
        register={register}
        selectedImages={selectedImage}
        handleFileChange={handleFileChange}
      />
      <CustomButton buttonType={"submit"} text="Upload" />
    </form>
  );
};

export default UploadFile;
