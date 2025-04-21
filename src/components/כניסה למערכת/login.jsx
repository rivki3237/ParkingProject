import { Link, useNavigate } from "react-router-dom"
import { loginThunk } from "../../redux/Thunks/loginThunk"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './login.css';
import { Box, Button, FormControl, FormControlLabel, FormGroup, Input } from "@mui/material";
import { BorderColor, BorderColorOutlined } from "@mui/icons-material";
import { insertLicensePlate, insertPassword, insertUserName } from "../../redux/slices/driverSlice";
import TextField from '@mui/material/TextField';

export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [lisencePlate, setLisencePlate] = useState()
    const [newCar, setNewCar] = useState(false)
    const exists = useSelector(state => state.driver.code)
    const isNew = useSelector(state => state.driver.isNew)
    useEffect(() => {
        if(isNew){ 
            navigate(`/logon`);
            dispatch(insertUserName(name));
            dispatch(insertPassword(password));
            dispatch(insertLicensePlate(lisencePlate))
       }
    },[isNew])

    return <div className='loginInputs'>
    <h1>hello</h1>
   <Box
    sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' } }}>

        <TextField id="filled-basic" color="inherit" label="שם משתמש" required variant="outlined" type="text" className="inputs" onChange={(e) => setName(e.target.value)}/>
         <TextField id="filled-basic" color="inherit" label="סיסמה" required variant="outlined" type="text" className="inputs" onChange={(e) => setPassword(e.target.value)}/> 
         <TextField id="filled-basic" color="inherit" label="לוחית רישוי" required variant="outlined" type="text" className="inputs" onChange={(e) => setLisencePlate(e.target.value)}/>
        <Button color="inherit" variant="outlined" size="large" sx={{width:"250px", fontFamily:"fantasy", margin:' 2vw 0px 10px 1.5vw'}} onClick={() => { dispatch(loginThunk({ name, password,lisencePlate }))}}>כניסה למערכת</Button><br />
        <Button color="inherit" variant="outlined" size="large" sx={{width:"250px", fontFamily:"fantasy", margin:' 0vw 0px 0px 1.5vw'}}  onClick={()=> navigate(`/logon`)}>משתמש חדש</Button><br />
        {exists && navigate(`/login/confirm`)}
    </Box>
   </div>
}
// export const Login = () => {

//     const dispatch = useDispatch()
//     const [name, setName] = useState()
//     const [password, setPassword] = useState()
//     const exists = useSelector(state => state.driver.code)
//     // const error=[name,password].length==0;
//     const navigate = useNavigate()

//     return <FormControl className='loginInputs'>
//             <FormGroup>
//                 <FormControlLabel control={<Input required type="text" placeholder="שם משתמש" className='inputs' onChange={(e) => setName(e.target.value)} />} />
//                 <FormControlLabel control={<Input required type="text" placeholder="סיסמה" className='inputs' onChange={(e) => setPassword(e.target.value)} />} />
//                 <button  onClick={() => { dispatch(loginThunk({ name, password }))}}>login</button>
//          <button ><Link to={'/logon'} style={{ color: "white" }}>?משתמש חדש</Link></button>
//          {exists && navigate(`/login/confirm`)}
//             </FormGroup>
//         </FormControl>
// }
// export const Login = () => {

//     const dispatch = useDispatch()
//     const [name, setName] = useState()
//     const [password, setPassword] = useState()
//     const exists = useSelector(state => state.driver.code)

//     const navigate = useNavigate()

//     return <form ><div className='loginInputs'>
       
//         <div> 

//             <div>
//             </div>
//             <input type="text" placeholder="שם משתמש" required maxLength={50} FormControl className='inputs' onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//             <div>
//             </div>
//             <input type="text" placeholder="סיסמה" className='inputs' maxLength={3} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button  onClick={() => { dispatch(loginThunk({ name, password }))}}>login</button>
//         <button ><Link to={'/logon'} style={{ color: "white" }}>?משתמש חדש</Link></button>
//         {exists && navigate(`/login/confirm`)}
//    </div>
//    </form>
// }