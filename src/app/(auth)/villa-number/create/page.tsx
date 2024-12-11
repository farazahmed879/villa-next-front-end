"use client";
import Grid2 from "@mui/material/Grid2";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function ClientForm() {
  const [selectedImage, setSelectedImage] = useState(null);

  type Inputs = {
    name: string;
    villaID: string;
    specialDetails: string;
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
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
        alert("Villa added successfully!");
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
          flexDirection: "column",
          width: "100%",
          padding: "2rem",
          paddingBottom: "30px",
          gap: "2rem",
        }}
      >
        <h2>Villa-Number</h2>
      </div>

      <Grid2
        container
        spacing={3}
        style={{ width: "100vw", paddingLeft: "3rem" }}
      >
        <form onSubmit={handleSubmit(submitClientData)} style={{}}>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <CustomInput
                  label="Name"
                  control={control}
                  name="name"
                  errors={errors}
                />
                <FormControl error={!!errors.villaID}>
                  <InputLabel id="villaID-label">Villa ID</InputLabel>
                  <Controller
                    name="villaID"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="villaID-label"
                        label="Villa ID"
                        fullWidth
                      >
                        <MenuItem value="villa1">Villa 1</MenuItem>
                        <MenuItem value="villa2">Villa 2</MenuItem>
                        <MenuItem value="villa3">Villa 3</MenuItem>
                        <MenuItem value="villa4">Villa 4</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </div>
            </Grid2>

            <Grid2 size={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <CustomInput
                  label="Special Details"
                  control={control}
                  name="specialDetails"
                  errors={errors}
                />
              </div>
            </Grid2>
          </Grid2>
          {/* <Grid2 container spacing={6}>
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
                label="Special Details"
                control={control}
                name="specialDetails"
                errors={errors}
              />
            </Grid2>
          </Grid2> */}

          <div style={{ marginTop: "2rem" }}>
            <CustomButton
              variant="contained"
              text="Add Villa-Number"
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </Grid2>
    </>
  );
}
