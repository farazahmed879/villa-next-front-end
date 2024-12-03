"use client";
import Grid from "@mui/material/Grid2";
import UploadFile from "@/Components/upload-file/page";
import ClientForm from "../Panel/clientForm/page";
import Clients from "../clients/page";
import Create from "../clients/create/page";
import Product from "../products/page";
import Projects from "../projects/page";
import Users from "../user/page";
import Department from "../department/page";
import Contacts from "../contact/page";
import { useRouter } from "next/navigation";
export default function AdminPanel({
  pathname = "",
  title = "",
}: {
  pathname: any;
  title?: string;
}) {
  const router = useRouter();
  router.replace(pathname);

  return (
    <>
      {/* <Contacts/> */}
      {/* <Create />
      <Projects />
      <Users /> */}

      {/* <Product /> */}

      {/* <Department/> */}
      {/* <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid size={12}>
          <h4>{title || pathname}</h4>
        </Grid>
        <Grid size={12}>
          {pathname == "/clients" ? (
            <Clients />
          ) : pathname == "create/clients" ? (
            <ClientForm />
          ) : pathname == "/contacts" ? (
            <Clients />
          ) : pathname == "/departments" ? (
            <Clients />
          ) : pathname == "/products" ? (
            <Product />
          ) : pathname == "/projects" ? (
            <Clients />
          ) : pathname == "/upload" ? (
            <UploadFile />
          ) : (
            <div style={{ backgroundColor: "", height: "100vh" }}>
              <p>Welcome to Admin Panel!</p>
            </div>
          )}
        </Grid>
      </Grid> */}
    </>
  );
}
