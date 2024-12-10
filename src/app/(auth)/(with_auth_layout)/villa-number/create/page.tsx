"use client"
import Grid2 from "@mui/material/Grid2";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";
import { File } from "buffer";

export default function ClientForm() {
  const [selectedImage, setSelectedImage] = useState(null);

  type Inputs = {
    name: string;
    email: string;
    description: string;
    location: string;
    file: File;
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>();

  const handleFileChange = (event: any) => {
    setSelectedImage(event.target.files[0]);
  };

  const submitClientData = async (data: Inputs) => {
    try {
      const response = await fetch("http://localhost:8080/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Client added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error", error);
      alert("An error has occurred, please try again");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "80vw",
          padding: " 2rem",
          paddingLeft: "3rem",
          paddingBottom: "30px",
        }}
      >
        <h2>New Client Details</h2>
      </div>

      <Grid2
        container
        spacing={3}
        style={{ width: "80vw", paddingLeft: "3rem" }}
      >
        <form
          onSubmit={handleSubmit(submitClientData)}
          style={{
           
          }}
        >
          <Grid2 container spacing={6}>
           
            <Grid2
       
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30vw",
              }}
            >
              <CustomInput
                label="Name"
                control={control}
                name="name"
                errors={errors}
              />
              <CustomInput
                label="Email"
                control={control}
                name="email"
                errors={errors}
              />
              
            </Grid2>

       
            <Grid2
    
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30vw",
                marginLeft:"8rem"
              }}
            >
              <CustomInput
                label="Description"
                control={control}
                name="description"
                errors={errors}
              />
              <CustomInput
                label="Location"
                control={control}
                name="location"
                errors={errors}
              />
            </Grid2>
          </Grid2>
          <div style={{marginTop:"2rem",}}>
            <CustomButton
              variant="contained"
              text="Add new Client +"
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </Grid2>
    </>
  );
}
