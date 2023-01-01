import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import ClickCount from "../../components/ClickButton";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";

function throwError() {
  console.log(
    // The function body() is not defined
    // @ts-ignore
    document.body()
  );
}

export default function Home() {
  const [count, setCount] = useState(10);
  const router = useRouter();

  const increment = useCallback(() => {
    setCount((v) => v - 1);
  }, [setCount]);

  useEffect(() => {
    let r: any;
    if (count > 0) {
      r = setInterval(() => {
        increment();
      }, 1000);
    }
    return () => {
      clearInterval(r);
    };
  }, [count, increment]);

  useEffect(() => {
    if (count == 0) {
      console.log("ABC");
      setCount(0);
    }
  }, [count]);

  return (
    <Layout>
      <main className={styles.main}>
        <h1>Fast Refresh Demo</h1>
        <p>
          Fast Refresh is a Next.js feature that gives you instantaneous
          feedback on edits made to your React components, without ever losing
          component state.
        </p>
        <hr className={styles.hr} />

        <button
          type="button"
          onClick={() =>
            router.replace("/post", "/post", { scroll: false, shallow: true })
          }
        >
          Redirect
        </button>
        <div>
          <p>
            Auto incrementing value. The counter wont reset after edits or if
            there are errors.
          </p>
          <p>Current value: {count}</p>
        </div>
        <hr className={styles.hr} />
        <div>
          <p>Component with state.</p>
          <ClickCount />
        </div>
        <hr className={styles.hr} />
        <div>
          <p>
            The button below will throw 2 errors. Yoll see the error overlay to
            let you know about the errors but it wont break the page or reset
            your state.
          </p>
          <Button
            onClick={(e) => {
              setTimeout(() => document.parentNode, 0);
              throwError();
            }}
          >
            Throw an Error
          </Button>
        </div>
        <hr className={styles.hr} />
      </main>
    </Layout>
  );
}
