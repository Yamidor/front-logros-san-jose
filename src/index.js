import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider} from "react-router-dom";
import App from "./routes/App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={App}/>
  </React.StrictMode>,
  document.getElementById('app')
);
