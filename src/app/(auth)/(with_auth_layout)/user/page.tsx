import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Users() {
  type Inputs = {
    name: string;
    email: string;
    password: string;
    role: string;
    file: string;
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>();

  const createNewUser = async (data: Inputs) => {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("New user created!");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to add user!");
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
        <h2>New User Details</h2>
      </div>

      <Grid2
        container
        spacing={3}
        style={{ width: "80vw", paddingLeft: "3rem" }}
      >
        <form onSubmit={handleSubmit(createNewUser)} style={{}}>
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
                marginLeft: "8rem",
              }}
            >
              <CustomInput
                label="password"
                control={control}
                name="password"
                errors={errors}
                type="password"
              />

              <CustomInput
                label="Role"
                control={control}
                name="role"
                errors={errors}
                options={[
                  { label: "Admin", value: "Admin" },
                  { label: "Normal", value: "Normal" },
                ]}
              />
            </Grid2>
          </Grid2>
          <div style={{ marginTop: "2rem" }}>
            <CustomButton
              variant="contained"
              text="Add new User"
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </Grid2>
    </>
  );
}
