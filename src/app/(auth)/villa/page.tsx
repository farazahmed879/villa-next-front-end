// src/components/LoginPage.tsx
"use client";
import CustomButton from "@/Components/CustomButton";
import CustomGrid from "@/Components/CustomGrid";
import { FORMMODES } from "@/helper/constant";
import { Column } from "@/helper/interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DashboardLayoutBasic from "../layout";
import { useSession } from "next-auth/react";

const Clients: React.FC = () => {
  const [mode, setMode] = useState<number>(1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const handleEdit = () => { };

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  // console.log('Checking at Villaaaaaaa', sessionStatus)



  const handlePath = () => {
    router.replace("/villa/create");
  };

  const columns: readonly Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "contact", label: "Contact", minWidth: 170 },
    { id: "image", label: "Image", minWidth: 170 },
    {
      id: "action",
      label: "Action",
      minWidth: 150,
      renderCell: (params: any) => {
        return (
          <CustomButton
            variant="contained"
            color="primary"
            size="small"
            handleClick={handleEdit}
            text="Click here"
          />
        );
      },
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = () => {
    setMode(FORMMODES.ADD);
  };

  const getUsers = async (a: any) => {
    let url = "http://localhost:5165/api/v2/VillaAPI";
    if (a) url += `?key=${a}`;
  
    const data = await axios.get(url);
    console.log(data)
    if (data) setData(data?.data.data);
  };

  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  const handleFilter = () => {
    getUsers(filter);
  };

  useEffect(() => {
    getUsers("");
  }, [mode]);


  console.log(sessionStatus)
  return (
    <div style={{ width: "100%", padding:"1rem" }}>
      <h1>Villas</h1>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          variant="contained"
          text="Add new Villa "
          color="success"
          handleClick={handlePath}
        ></CustomButton>
      </div>

      {mode == FORMMODES.GRID ? (
        <>
          <CustomGrid
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            columns={columns}
            data={data}
          />
        </>
      ) : mode == FORMMODES.ADD ? (
        <></>
      ) : // <CreateOrEditStudents handleMode={(e) => setMode(e)} />
        null}
    </div>
    // </DashboardLayoutBasic>
  );
};

export default Clients;
