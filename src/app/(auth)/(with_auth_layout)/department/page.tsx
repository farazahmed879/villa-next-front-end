import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Department() {
  type Inputs = {
    name: string;
    description: string;
    file: string;
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>();


  const createDepartment = async (data:Inputs) => {
    
    try{
        const response = await fetch("http://localhost:8080/department",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)


        })

        if(response.ok){
            alert("New department added!")
        } else{

            const errorData = response.json()
            console.error("Network Error", errorData)
        }
         
    }catch(error){
        console.error(error)
        alert("Failed to add department")
    }
  }

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
        <h2>New Department Form</h2>
      </div>

      <Grid2
        container
        spacing={3}
        style={{ width: "80vw", paddingLeft: "3rem" }}
      >
        <form
          onSubmit={handleSubmit(createDepartment)}
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
              text="Add new department "
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </Grid2>
    </>
  )
}
