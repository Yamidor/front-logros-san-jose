import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider} from "react-router-dom";
import App from "./routes/App";

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={App}/>
  </React.StrictMode>,
  document.getElementById('app')
);
