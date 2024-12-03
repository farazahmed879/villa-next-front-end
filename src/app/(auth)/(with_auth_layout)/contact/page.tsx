import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Contacts() {
  type Inputs = {
    name: string;
    email: string;
    contact: string;
    message: string;
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>();

  const contactForm = async (data: Inputs) => {
    try {
      const response = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully");
      } else {
        const errorData = response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network failed", error);
      alert("Failed to send message");
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
        <h2>Contact</h2>
      </div>

      <Grid2
        container
        spacing={23}
        style={{ width: "80vw", paddingLeft: "3rem" }}
      >
        <form
          onSubmit={handleSubmit(contactForm)}
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
                label="Email"
                control={control}
                name="email"
                errors={errors}
                type="email"
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
                label="Contact"
                control={control}
                name="contact"
                errors={errors}
              />
              <CustomInput
                label="Enter your message here..."
                control={control}
                name="message"
                errors={errors}
                multiline={true}
             
              />
            </Grid2>
          </Grid2>
          <div style={{ display:"flex",marginTop: "2rem", justifyContent:"flex-end", paddingRight:"5.5rem"  }}>
            <CustomButton
              variant="contained"
              text="Send Message"
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </Grid2>
    </>
  );
}
