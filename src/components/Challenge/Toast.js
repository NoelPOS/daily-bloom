import { Toaster } from "sonner";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
