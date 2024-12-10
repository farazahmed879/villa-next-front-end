"use client";
import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { jwtDecode } from "jwt-decode";

import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Skeleton, Typography } from "@mui/material";

// import CustomButton from "@/Components/CustomButton";
// import AdminPanel from "./admin-panel/page";
// import { userInfo } from "os";
// import SidebarFooterAccount, {
//   ToolbarAccountOverride,
// } from "./SidebarFooterAccount";
import { PageContainer } from "@toolpad/core/PageContainer";
import Link from "next/link";
import Clients from "./villa/page";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <ShoppingCartIcon />,
  },

  {
    segment: "clients",
    title: "Villa",
    icon: <ShoppingCartIcon />,
  },

  {
    segment: "products",
    title: "Villa No.",
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  console.log(pathname);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

interface DecodedToken {
  _id: string;
  email: string;
  role: string;
}
export default function DashboardLayoutBasic(props: any) {
  const { window, children } = props;
  const router1 = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  // Decode the token safely
  let decodedToken;
  if (session) {
    decodedToken = jwtDecode<DecodedToken>(session?.user.token);
    // console.log(decodedToken);
  }

  const [user, setUser] = React.useState<any>({
    user: {
      name: decodedToken?.email,
      email: decodedToken?.role,
      image: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_8.png",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => { },
      signOut: () => {
        signOut();
      },
    };
  }, []);

  const router = useDemoRouter("");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  // React.useEffect(() => {
  //   if (sessionStatus === "unauthenticated") {
  //     router1.replace("/auth/login");
  //   }
  // }, [sessionStatus, router1]);

  if (sessionStatus === "loading") {
    return (
      <Skeleton>
        {" "}
        <AppProvider
          session={user}
          authentication={authentication}
          navigation={NAVIGATION}
          theme={demoTheme}
          window={demoWindow}
          branding={{
            logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
            title: "Jami Partners",
          }}
        >
          <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
      </Skeleton>
    );
  }

  console.log("router", router.pathname);

  // const element = useRoutes([
  //   {
  //     path: "/",
  //     element: <Dashboard />,
  //   },
  //   {
  //     path: "/about",
  //     element: <ProductForm />,
  //   },
  //   {
  //     path: "/clients",
  //     element: <Clients />,
  //   },
  //   // ... other routes
  // ]);

  return (
    <>
      {sessionStatus === "unauthenticated" ? (
        <><Link href={'/auth/login'}> Please Login</Link></>
      ) : (
        <AppProvider
          session={user}
          authentication={authentication}
          navigation={NAVIGATION}
          theme={demoTheme}
          window={demoWindow}
          branding={{
            logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
            title: "Jami Partners",
          }}
        >
          <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
      )}
    </>
  );
}
