import { useEffect, useState } from 'react'
import './paying.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCreditCardThunk } from '../../redux/Thunks/addCreditCardThunk'
import { getDriversCardsThunk } from '../../redux/Thunks/getDriversCardsThunk'
import { paymentThunk } from '../../redux/Thunks/paymentThunk'

export const Paying = () => {
  const dispatch = useDispatch()
  const sum = useSelector(state => state.routine.price)
  const [numOfPayments , setNumOfPayments] = useSelector(1)
  const cards = useSelector(state => state.cards.creditCards)
  const licensePlate = useSelector(state => state.driver.licensePlate)
  const driverCode = useSelector(state => state.driver.code)

  const [blPayment, setBlPeyment] = useState({
    creditCardCode: 0,
    sum: 0,
    date: Date.now()
  })


  const [blCreditCards, setblCreditCards] = useState({
    creditCardNum: "",
    validityCard: "",
    id: "",
    cvv: "",
    driverCode: ""
  })







  //const [newCard,setNewCard] = useState({creditCardNum:"",validityCard:null,cvv:"",id:"",})
  const [paying, setPaying] = useState({ creditCardNum: "", validityCard: new Date(), cvv: "", sum: sum, id: "" })

  useEffect(() => {
    dispatch(getDriversCardsThunk(driverCode))
    setBlPeyment({ ...blPayment, sum: sum })
    setblCreditCards({ ...blCreditCards, driverCode: driverCode })
  }, [])

  const checkIfExists = () => {
    if (!(cards.find(c => c.creditCardNum === paying.creditCardNum && c.validityCard === paying.validityCard && c.cvv === paying.cvv))) {
      //setNewCard({...newCard,creditCardNum:paying.creditCardNum,validityCard:paying.validityCard,cvv:paying.cvv,id:paying.id})
     // dispatch(addCreditCardThunk(paying))
     return true;
    }

    else
      //dispatch({ creditCardCode: cards.find(c => c.creditCardNum === paying.creditCardNum && c.validityCard === paying.validityCard && c.cvv === paying.cvv).code, sum: paying.sum, date: new Date.now() })
    return false
  }

  const pay = () =>{
  if(checkIfExists())
  {
    setBlPeyment({...blPayment,creditCardCode:26})
  }
  dispatch(paymentThunk(blPayment , blCreditCards , licensePlate , numOfPayments))
  }


  return <div className='inputsPaying'>

    <p>הסכום לתשלום הוא:{sum}</p>

    <input className='inputs' type="text" value={cards[cards.length - 1].creditCardNum} placeholder='creditCardNum' required onChange={(e) => setblCreditCards({ ...blCreditCards, creditCardNum: e.target.value })} />
    <input className='inputs' defaultValue={cards[cards.length - 1].validityCard.substring(0, 10)} type="text" placeholder="validityCard" required onChange={(e) => setblCreditCards({ ...blCreditCards, validityCard: e.target.value })} />
    <input className='inputs' defaultValue={cards[cards.length - 1].cvv} type="text" placeholder="cvv" required onChange={(e) => setblCreditCards({ ...setblCreditCards, cvv: e.target.value })} />
    <input className='inputs' defaultValue={cards[cards.length - 1].id} type="text" placeholder="id" required onChange={(e) => setblCreditCards({ ...setblCreditCards, id: e.target.value })} />
    <input className='inputs' type="text" placeholder="numOfPayments" required onChange={(e) => setNumOfPayments( e.target.value )} />
    <button onClick={() => pay()}>לתשלום</button>
  </div>
}