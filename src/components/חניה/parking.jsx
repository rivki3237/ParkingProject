
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllParkingThunk } from "../../redux/Thunks/getParkingsThunk";
import './parking.css'
import { addRoutineThunk } from "../../redux/Thunks/addRoutineThunk";
import { findDriverCarThunk } from "../../redux/Thunks/findDriverCarThunk";
import { Await, useNavigate } from "react-router-dom";
import { getPriceThunk } from "../../redux/Thunks/getPriceThunk";
import { getCarExists } from "../../redux/Thunks/getCarExists";
import { setEnter } from "../../redux/slices/parkingSlice";
import { Check } from "@mui/icons-material";
import { insertCode } from "../../redux/slices/driverSlice";


export const Parking = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const parkings = useSelector(state => state.parking.carParkings);
    const current = useSelector(state => state.routine.currentCode);
    const price = useSelector(state => state.routine.price);
    const available = useSelector(state => state.parking.avilable);
    const licensePlate = useSelector(state => state.driver.licensePlate)
    const enter = useSelector(state => state.parking.enter)
    const successCreate = useSelector(state => state.routine.successCreate);
    const [i, setI] = useState(0)
    const [secondss, setSeconds] = useState(new Date().getSeconds())
    const timerr = setInterval(() => {
        console.log(secondss, "secc");
        if (new Date().getSeconds() - 10 >= secondss) {
            clearInterval(timerr)
             //navigate(`/`)
        }
        clearInterval(timerr)
    }, 2000);
    //const [routine,setRoutine] = useState({licensePlate:licensePlate,parkingCode:available.code})
    let routine = { licensePlate: licensePlate, parkingCode: available.code }
    useEffect(() => {


        window.addEventListener('click', aaa)
        dispatch(getAllParkingThunk("P1"));

    }, [])
    const aaa =() => {
        console.log("setS");
        setSeconds(new Date().getSeconds())
        clearInterval(timerr)
    }
    useEffect(() => {
        let color = setInterval(() => {
            setI(i + 1);
            clearInterval(color)
        }, 500)
    }, [i])

    const createRoutine = () => {
        routine = { licensePlate: licensePlate, parkingCode: available.code }
        dispatch(addRoutineThunk(routine));

    }
    useEffect(() => {
        console.log("add routine");
        if (successCreate) {
            navigate(`/`)
            window.location.reload();
        }
    }, [successCreate])

    const clearStates = () => {
        //dispatch(setEnter(false))
        dispatch(addRoutineThunk(routine));
    }
    return <div className="main">

        <p>{secondss}</p>
        {/* <div className="carParkings">
            {parkings.map(p => {
                return <div className="cp" key={p.code} style={p.code === available.code ? i % 2 === 0 ? { backgroundColor: " rgb(158, 168, 166)" } : { backgroundColor: "yellow" } : p.used ? { backgroundColor: "red" } : { backgroundColor: "white" }}>
                    
                </div>
            })}
        </div> */}
        <div className="carParkings">
            {parkings.map(p => {
                return <div className="cp" key={p.code} style={(p.code === available.code || p.code == current) ? (i % 2 === 0 ? { backgroundColor: " rgb(158, 168, 166)" } : { backgroundColor: "yellow" }) : (p.used && p.code !== current ? { backgroundColor: "red" } : { backgroundColor: "white" })}>
                    {p.code}
                </div>
            })
            }
        </div>
        {/* <div className="carParkings">
            {parkings.map(p => {
                return <div className="cp" key={p.code} style={p.code === available.code ? i % 2 === 0 ? { backgroundImage:u'../../../public/waze.png', width:'100%'} : { backgroundColor: "yellow" } : p.used ? { backgroundColor: "red" } : { backgroundColor: "white" }}>
 </div>
            })
            }
        </div> */}

        {enter != "true" && <div>
            {enter !== "false" && <button onClick={() => dispatch(getCarExists(licensePlate))}>כניסה</button>}
            {(current != -1 && price != -1) && <><button onClick={() => { dispatch(findDriverCarThunk(licensePlate)); dispatch(setEnter(false)) }}>חיפוש רכב קיים</button>
                <button onClick={() => dispatch(getPriceThunk(licensePlate))}>יציאה ותשלום</button></>}
            {enter === "false" && <div>*הרכב שלך כבר נמצא בחניה, במקרה של תקלה אנא פנה למנהל המערכת במספר 1234</div>
            }
        </div>
        }

        {enter == "true" && <div>
            <button onClick={() => createRoutine()}>אישור בחירת החניה</button>
        </div>
        }
        {(current == -1 || price == -1) && <div>   ): הרכב שלך לא קיים בחניה  </div>}

        {price >0&& navigate(`/paying`)}
    </div>

}