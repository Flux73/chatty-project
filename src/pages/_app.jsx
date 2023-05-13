import { Provider } from "react-redux";
import store from "@/store/store";
import "@/styles/globals.css";
import { useEffect } from "react";
import { setTheme } from "@/store/theme-slice";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  console.log(router);

  useEffect(() => {
    console.log("READ");
    if (localStorage.getItem("theme")) {
      store.dispatch(setTheme({ theme: localStorage.getItem("theme") }));
      return;
    }

    store.dispatch(
      setTheme({
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dracula"
          : "light",
      })
    );
  }, []);

  // if (!localStorage.getItem("logged_in")) {
  //   console.log("sn");
  //   router.push("/en/signup");
  //   return null;
  // }

  // useEffect(() => {

  //   router.push("/en/home");
  // }, [router.pathname]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
