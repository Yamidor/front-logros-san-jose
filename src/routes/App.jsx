import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Routes, Route} from "react-router-dom";
import LogrosView from '../containers/LogrosView';
import Layout from '../components/Layout';
import ListActivities from '../containers/ListActivities';
import ViewPdf from '../components/ViewPdf';
import Home from '../containers/Home';
const App = createBrowserRouter(
    createRoutesFromElements(
        
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='logros' element={<LogrosView/>}/>
            <Route path='activities' element={<ListActivities/>}/>
            <Route path='viewPdf' element={<ViewPdf/>}/>
        </Route>
    )

)
 

export default App
