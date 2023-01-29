import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [response, setResponse] = useState();


  const onResponse = async (event) =>{
    console.log("Hello");
    event.preventDefault();
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log("Data Response", data)
      setResponse(data.response);
      setTextInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>JoyceAI Hands Dirty</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Joyce AI</h3>
        <div>
          <form onSubmit={onResponse}>
            <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
          <div>
            <p>You: {textInput}</p>
            <p>Joyce: {response}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
