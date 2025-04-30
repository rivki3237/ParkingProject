import { useEffect, useState } from 'react'
import './paying.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCreditCardThunk } from '../../redux/Thunks/addCreditCardThunk'
import { getDriversCardsThunk } from '../../redux/Thunks/getDriversCardsThunk'
import { paymentThunk } from '../../redux/Thunks/paymentThunk'
import { changeCcDetails } from '../../redux/slices/creditCardsSlice'
import masterCard from './Mastercard_2019_logo.svg.png'
import { PhotoSizeSelectLarge } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
export const Paying = () => {
  const dispatch = useDispatch()
  const sum = useSelector(state => state.routine.price)
  const nav=useNavigate()
  const [numOfPayments, setNumOfPayments] = useState(1)
  const [flag, setFlag] = useState(false)
  const cards = useSelector(state => state.cards.creditCards)
  const licensePlate = useSelector(state => state.driver.licensePlate)
  const driverCode = useSelector(state => state.driver.code)
  const lastCreditCards = useSelector(state => state.cards.lastCreditCards)
  const [blPayment, setBlPeyment] = useState({
    creditCardCode: 0,
    sum: 0,
    date: Date()
  })

  const [blCreditCards, setblCreditCards] = useState(
    {

      creditCardNum: "",
      validityCard: "",
      id: "",
      cvv: "",
      driverCode: ""
    }
  )

  useEffect(() => {
    setBlPeyment({ ...blPayment, sum: sum, creditCardCode: lastCreditCards.code })
    setblCreditCards({
      ...blCreditCards, creditCardNum: lastCreditCards.creditCardNum,
      validityCard: lastCreditCards.validityCard,
      id: lastCreditCards.id,
      cvv: lastCreditCards.cvv,
      driverCode: driverCode
    })
  }, [lastCreditCards])


  useEffect(() => {
    dispatch(getDriversCardsThunk(driverCode))
    setBlPeyment({ creditCardCode: lastCreditCards.code, sum: sum })
    setblCreditCards({ ...lastCreditCards, driverCode: driverCode })
  }, [])

  const pay = () => {

    setNumOfPayments(document.getElementById("numOf").value)
    dispatch(paymentThunk({ blPayment: blPayment, blCreditCards: blCreditCards, licensePlate: licensePlate, numOfPayments: document.getElementById("numOf").value }))
  }

  return <>

    <div className='inputsPaying'>
      <p>הסכום לתשלום הוא:{sum}</p>
      <input className='inputs' type="text" defaultValue={cards.length != 0 ? lastCreditCards.creditCardNum : ""} placeholder='creditCardNum' required onChange={(e) => setblCreditCards({ ...blCreditCards, creditCardNum: e.target.value })} />
      <input className='inputs' defaultValue={cards.length !== 0 ? lastCreditCards.validityCard.substring(0, 10) : ""} type="text" placeholder="validityCard" required onChange={(e) => setblCreditCards({ ...blCreditCards, validityCard: e.target.value })} />
      <input className='inputs' defaultValue={cards.length !== 0 ? lastCreditCards.cvv : ""} type="text" placeholder="cvv" required onChange={(e) => setblCreditCards({ ...blCreditCards, cvv: e.target.value })} />
      <input className='inputs' defaultValue={cards.length !== 0 ? lastCreditCards.id : ""} type="text" placeholder="id" required onChange={(e) => setblCreditCards({ ...blCreditCards, id: e.target.value })} />
      <label className='inputs' >numOfPayments</label>
      <select className='inputs' style={{ marginTop: 0 }} required id='numOf'>
        <option>1</option>
        <option>2</option>
        {sum > 100 &&
          <>
            <option>3</option>
            <option>4</option></>}
      </select>
      <button onClick={() => pay()}>לתשלום</button>
      <u onClick={() => setFlag(true)}>לבחירת אשראי אחר</u>




    </div>
    {flag && cards.map(c => <div className='chooseCC' key={c.code} onClick={() => { dispatch(changeCcDetails(c.code)); setFlag(false) }}>
      <img width={"50px"} height={"30px"} src={masterCard} />
      <div> <div className='ccDetails'>**** **** **** {c.creditCardNum.substring(12)}</div>
        <div  className='ccDetails'>{c.validityCard.substring(0, 10)}</div></div>
    </div>)}

  </>

}