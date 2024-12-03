"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import CustomButton from "@/Components/CustomButton";
export default function ProductForm() {

  
  type Inputs = {
    name: string;
    description: string;
    file: String;
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>();

  const submitProductData = async (data: Inputs) => {
    try {
      const response = await fetch("http://localhost:8080/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error", error);
      alert("Failed to submit form, please try again");
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
        <h2>New Product Form</h2>
      </div>

      <Grid2
        container
        spacing={3}
        style={{ width: "80vw", paddingLeft: "3rem" }}
      >
        <form
          onSubmit={handleSubmit(submitProductData)}
          style={{
            width: "100%",
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
                label="Description"
                control={control}
                name="description"
                errors={errors}
              />

              <CustomInput
                label="File"
                control={control}
                name="file"
                errors={errors}
              />
            </Grid2>

          </Grid2>
          <div style={{ marginTop: "2rem" }}>
            <CustomButton
              variant="contained"
              text="Add new Product "
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </Grid2>
    </>
  );
}
