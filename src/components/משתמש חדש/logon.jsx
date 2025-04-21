import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addDriverThunk } from "../../redux/Thunks/addDriverThunk";
import * as React from 'react';
import './logon.css'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import ChildFriendlyTwoTone from "@mui/icons-material/ChildFriendlyTwoTone";
import { insertLicensePlate, insertPassword, insertUserName } from "../../redux/slices/driverSlice";
import { useNavigate } from "react-router-dom";

export const Logon = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [driver, setDriver] = useState({ name: "", phoneNumber: "", userName: "", password: "", code: "0" })
    const newCode = useSelector(state => state.driver.code)
    const stateUserName = useSelector(state => state.driver.userName)
    const statePassword = useSelector(state => state.driver.password)
    const stateLicensePlate = useSelector(state => state.driver.licensePlate)
    const [driver, setDriver] = useState({ name: "", phoneNumber: "", userName:stateUserName, password: statePassword, code: "0" })
    const [loading, setLoading] = React.useState(false);
    const [licenseP, setLicenseP] = useState(stateLicensePlate)

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        }
    }, [newCode]);
    
    const checkDetails = () => {
    
        setLoading(true);
        let flag = true;
        console.log(driver,licenseP);
        if (driver.name.length <= 1 || driver.name.length > 15)
            flag = false
        if (driver.phoneNumber.length < 9 || driver.phoneNumber.length > 10)
            flag = false
        if (driver.userName.length > 20 && driver.userName.length!==0)
            flag = false
        if (driver.password.length > 10 && driver.password.length!==0)
            flag = false
        if (licenseP.length < 7 || licenseP.length > 9)
            flag = false
        if (flag) {
            dispatch(addDriverThunk({driver, licensePlate:licenseP}))
            dispatch(insertUserName(driver.userName))
            dispatch(insertLicensePlate(licenseP))
            dispatch(insertPassword(driver.password))
        }
        // {
        //     "name": "a",
        //     "phoneNumber": "string",
        //     "userName": "string",
        //     "password": "string"
        //   }
    }
  


    return <div className='loginInputs'>
        <Box sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' } }}>
            <TextField id="filled-basic" defaultValue={stateLicensePlate} color="inherit" label="מספר רישוי" required variant="outlined" type="text" className="inputs" onChange={(e) => setLicenseP(e.target.value)} />
            <TextField id="filled-basic" color="inherit" label="שם נהג" required variant="outlined" type="text" className="inputs" onChange={(e) => setDriver({ ...driver, name: e.target.value })} />
            <TextField id="filled-basic" color="inherit" label="טלפון" required variant="outlined" type="tel" className="inputs" onChange={(e) => setDriver({ ...driver, phoneNumber: e.target.value })} />
            <TextField id="filled-basic" defaultValue={stateUserName} color="inherit" label="שם משתמש" required variant="outlined" type="text" className="inputs" onChange={(e) => setDriver({ ...driver, userName: e.target.value })} />
            <TextField id="filled-basic" defaultValue={statePassword} color="inherit" label="סיסמת משתמש" required variant="outlined" type="text" className="inputs" onChange={(e) => setDriver({ ...driver, password: e.target.value })} />

        </Box>



        {/* <input type="text"placeholder="מספר רישוי" className='inputs' onChange={(e) => setDriver({ ...driver, licensePlate: e.target.value })} />
        <input type="text" placeholder="שם נהג" className='inputs' onChange={(e) => setDriver({ ...driver, name: e.target.value })} />
        <input type="tel" placeholder="טלפון" className='inputs' onChange={(e) => setDriver({ ...driver, phoneNumber: e.target.value })} />
        <input type="text"  defaultValue={stateUserName}  placeholder="שם משתמש" className='inputs' onChange={(e) => setDriver({ ...driver, userName e.target.value })} />
        <input type="text" defaultValue={statePassword}  placeholder="סיסמת משתמש" className='inputs' onChange={(e) => setDriver({ ...driver, password: e.target.value })} /> */}

        <Tooltip title="Click to see loading">
            {/* <IconButton onClick={() => setLoading(true)} loading={loading}> */}
            {/* <Button
                size="100%"
                fullWidth
                
                color="success"
                
                onClick={handleClick}
                loading={loading}
                loadingPosition="start"
                //   title="login"
                variant="text"
             
            >
                login
            </Button> */}
            <IconButton
                onClick={() => checkDetails()}

                loading={loading}
                loadingPosition="start"

                // startIcon={< />}
                variant="outlined"
                // 'inherit'-שחור
                // | 'primary'-כחול
                // | 'secondary'-סגול
                // | 'success'-ירוק
                // | 'error'-אדום
                // | 'info'-תכלת
                // | 'warning'-כתום
                // | 'default'-אפור
                color="inherit"
                loadingIndicator={<CircularProgress size={30} sx={{ color: 'black' }} />}
            // className="looo"
            // sx={{    backgroundColor: 'rgba(255, 247, 0, 0.851)',
            //     width: '500px',
            //     height: '20px',
            //     fontSize: 'xx-large',
            //     color: "blue",
            //     borderRadius:'0'
            // }}
            >
                login
            </IconButton> 
            {/* </IconButton>*/}
        </Tooltip>
        {newCode && <div><h5>קוד האימות שלך הוא </h5>
            <p>{newCode}</p>
            <button onClick={()=> navigate(`/parking`)}>לאישור</button>
            </div>
            }
    </div>
} 