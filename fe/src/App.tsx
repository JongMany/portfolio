import { useEffect } from "react";
import "./App.css";

function App() {
  function getHello() {
    const $greet = document.querySelector("#greet")!;
    fetch(`${import.meta.env.VITE_API_SERVER}/api/hello`)
      .then((response) => response.json())
      .then((data) => ($greet.innerHTML = JSON.stringify(data)));
  }

  useEffect(() => {
    getHello();
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          API 호출 결과: <code id="greet"></code>
        </p>
      </div>
    </>
  );
}

export default App;
