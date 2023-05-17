import socket from "@/util/socket";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

const isAuthenticated = (Component) => {
  return (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (Component.requireAuth) {
        console.log("Auth read");

        if (!localStorage.getItem("logged_in")) {
          router.push("/en/signup");
          return;
        }
      } else {
        if (localStorage.getItem("logged_in")) {
          router.push("/en/home");
          return;
        }
      }

      setIsLoading(false);
    }, [router]);

    return isLoading ? <div>Loading...</div> : <Component {...props} />;
  };
};

export default isAuthenticated;

// const isAuthenticated = (Component) => {
//     return (props) => {
//       const router = useRouter();
//       const [isLoading, setIsLoading] = useState(true);
//       console.log(Component.requireAuth);
//       useEffect(() => {
//         if (localStorage.getItem("logged_in")) {
//           router.push("/en/home");
//           return;
//         }

//         setIsLoading(false);
//       }, [router]);

//       return isLoading ? <div>Loading...</div> : <Component {...props} />;
//     };
//   };

//   export default isAuthenticated;
