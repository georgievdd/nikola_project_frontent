import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {axiosInstance} from "./api/instance";
import {setFeatures} from "./store/reducers/feature";
import {AppDispatch} from "./store/store";


function App() {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        axiosInstance.get('/houses/features')
            .then(res => dispatch(setFeatures(res.data)))
    }, []);

  return (
    <div>
        <RouterProvider router={Router} />
    </div>
  );
}

export default App;
