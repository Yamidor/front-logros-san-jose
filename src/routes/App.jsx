import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Routes, Route} from "react-router-dom";
import Home from '../containers/home';
import LogrosView from '../containers/LogrosView';
import Layout from '../components/Layout';
import ListActivities from '../containers/ListActivities';
import ViewPdf from '../components/ViewPdf';

const App = createBrowserRouter(
    createRoutesFromElements(
        
        <Route path='/' element={<Layout/>}>
            <Route index element={<LogrosView/>}/>
            <Route path='logros' element={<LogrosView/>}/>
            <Route path='activities' element={<ListActivities/>}/>
            <Route path='viewPdf' element={<ViewPdf/>}/>
        </Route>
    )

)
 

export default App
