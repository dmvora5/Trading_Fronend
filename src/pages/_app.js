import store from "@/redux/store";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";


import { Poppins } from 'next/font/google';
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { SocketProvider } from "@/context/SocketProvider";

const SuccessAnimation = dynamic(
  () => import("@/components/Toast/Success/successAnimation"),
  { ssr: false }
);
const ErrorAnimation = dynamic(
  () => import("@/components/Toast/ErrorAnimation/ErrorAnimation"),
  { ssr: false }
);

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // Choose the font weights you need
  subsets: ['latin'], // Subset can be adjusted based on your content language
  display: 'swap', // Ensure the font display is optimized
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        icon={({ type, icon }) => {
          switch (type) {
            case "success":
              return <SuccessAnimation />;
            case "error":
              return <ErrorAnimation />;
            default:
              return icon;
          }
        }}
      />
      <main className={poppins.className}>
        <Provider store={store}>
          <Layout>
            <SocketProvider>
              <Component {...pageProps} />
            </SocketProvider>
          </Layout>
        </Provider>
      </main>
    </>

  );
}
