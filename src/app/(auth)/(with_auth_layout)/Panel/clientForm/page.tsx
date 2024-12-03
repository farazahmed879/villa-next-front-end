import {
  Grid,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";
import ImageUpload from "@/Components/CustomUpload";

export default function ClientForm() {
  const [selectedImage, setSelectedImage] = useState(null);

  type Inputs = {
    example: string;
    exampleRequired: string;
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

  function hello() {
    console.log("Dummy function");
  }

  return (
    <Grid
      container
      spacing={3} 
      style={{ minHeight: "100vh", padding: "20px" }}
    >
   
      <Grid item xs={12} sm={12} md={6}>
        <div
          style={{
            display: "flex",
            width: "80vw",
            justifyContent:"center",
            paddingBottom: "30px",
            // backgroundColor:"blue"
          }}
        >
          <h2>New Client Details</h2>
        </div>
        <div
          style={{
            padding: "30px",

            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form
            onSubmit={handleSubmit(hello)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flex: 1,
            }}
          >
            <CustomInput
              label="Name"
              control={control}
              name="Name"
              errors={errors}
            />
            <CustomInput
              label="Email"
              control={control}
              name="email"
              errors={errors}
            />
          </form>
        </div>
      </Grid>
  
      <Grid item xs={12} sm={12} md={6}>
        <div
          style={{
            padding: "30px",

            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form
            onSubmit={handleSubmit(hello)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flex: 1,
              paddingTop: "4rem",
            }}
          >
            <CustomInput
              label="Contact"
              control={control}
              name="Contact"
              errors={errors}
            />
            <ImageUpload
              name="file"
              register={register}
              selectedImages={selectedImage}
              handleFileChange={handleFileChange}
            />
     
          </form>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginRight:"2rem" }}>
          <CustomButton
            variant="contained"
            text="Add new Client + "
            color="success"
          />
        </div>
      </Grid>
    </Grid>
  );
}
