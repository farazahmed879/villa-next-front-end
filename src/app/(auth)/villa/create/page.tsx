"use client";
import Grid2 from "@mui/material/Grid2";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";
import { File } from "buffer";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ClientForm() {
  const [selectedImage, setSelectedImage] = useState(null);

  type Inputs = {
    name: string;
    details: string;
    rate: number;
    occupancy: number;
    imageUrl: string;
    amenity: string;
    sqft: number;
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

  const { data: session, status: sessionStatus } = useSession();
  const submitClientData = async (data: Inputs) => {
    const obj = { ...data, createdDate: "", createdBy: 0 };

    console.log(obj);

    const token = session?.user?.token;
    console.log("This is the token", token);
    try {
      const response: any = await axios.post(
        "http://localhost:5165/api/v2/VillaAPI/Create",
        obj
      );
      // const response = await fetch(
      //   "http://localhost:5165/api/v2/VillaAPI/Create",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     body: JSON.stringify(obj),
      //   }
      // );

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
        <h2>New Villa</h2>
      </div>

      <Grid2
        container
        spacing={3}
        style={{ width: "80vw", paddingLeft: "3rem" }}
      >
        <form onSubmit={handleSubmit(submitClientData)} style={{}}>
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
                label="Rate"
                control={control}
                name="rate"
                errors={errors}
                type="number"
              />

              <CustomInput
                label="Amenity"
                control={control}
                name="amenity"
                errors={errors}
              />

              <CustomInput
                label="Details"
                control={control}
                name="details"
                errors={errors}
                multiline={true}
              />
            </Grid2>

            <Grid2
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30vw",
                marginLeft: "8rem",
              }}
            >
              <CustomInput
                label="Occupancy"
                control={control}
                name="occupancy"
                errors={errors}
                type="number"
              />
              <CustomInput
                label="Square feet"
                control={control}
                name="sqft"
                type="number"
                errors={errors}
              />

              <CustomInput
                label="Image URL"
                control={control}
                name="imageUrl"
                errors={errors}
              />
            </Grid2>
          </Grid2>
          <div style={{ marginTop: "2rem" }}>
            <CustomButton
              variant="contained"
              text="Add"
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </Grid2>
    </>
  );
}
