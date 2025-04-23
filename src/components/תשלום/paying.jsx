import { useEffect, useState } from 'react'
import './paying.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCreditCardThunk } from '../../redux/Thunks/addCreditCardThunk'
import { getDriversCardsThunk } from '../../redux/Thunks/getDriversCardsThunk'
import { paymentThunk } from '../../redux/Thunks/paymentThunk'

export const Paying = () => {
  const dispatch = useDispatch()
  const sum = useSelector(state => state.routine.price)
  const [numOfPayments, setNumOfPayments] = useState(1)
  const cards = useSelector(state => state.cards.creditCards)
  const licensePlate = useSelector(state => state.driver.licensePlate)
  const driverCode = useSelector(state => state.driver.code)

  const [blPayment, setBlPeyment] = useState({
    creditCardCode: 0,
    sum: 0,
    date: Date.now()
  })

  // const [blCreditCards, setblCreditCards] = useState(cards.length !== 0 ? {
  //   creditCardNum: cards[cards.length - 1].creditCardNum,
  //   validityCard: cards[cards.length - 1].validityCard,
  //   id: cards[cards.length - 1].id,
  //   cvv: cards[cards.length - 1].cvv,
  //   driverCode: ""
  // } :
  //   {
  //     creditCardNum: "",
  //     validityCard: "",
  //     id: "",
  //     cvv: "",
  //     driverCode: ""
  //   }
  // )
  const [blCreditCards, setblCreditCards] = useState(cards.length !== 0 ? {
    creditCardNum: cards[cards.length - 1].creditCardNum,
    validityCard: cards[cards.length - 1].validityCard,
    id: cards[cards.length - 1].id,
    cvv: cards[cards.length - 1].cvv,
    driverCode: ""
  } :
    {
      creditCardNum: "",
      validityCard: "",
      id: "",
      cvv: "",
      driverCode: ""
    }
  )

  useEffect(() => {
    dispatch(getDriversCardsThunk(driverCode))
    setBlPeyment({ ...blPayment, sum: sum })
    setblCreditCards({ ...blCreditCards, driverCode: driverCode })
  }, [])

  const pay = () => {
    debugger
    setNumOfPayments(document.getElementById("numOf").value)
    dispatch(paymentThunk(blPayment, blCreditCards, licensePlate, numOfPayments))
  }

  return <div className='inputsPaying'>
    <p>הסכום לתשלום הוא:{sum}</p>
    <input className='inputs' type="text" defaultValue={cards.length != 0 ? cards[cards.length - 1].creditCardNum : ""} placeholder='creditCardNum' required onChange={(e) => setblCreditCards({ ...blCreditCards, creditCardNum: e.target.value })} />
    <input className='inputs' defaultValue={cards.length !== 0 ? cards[cards.length - 1].validityCard.substring(0, 10) : ""} type="text" placeholder="validityCard" required onChange={(e) => setblCreditCards({ ...blCreditCards, validityCard: e.target.value })} />
    <input className='inputs' defaultValue={cards.length !== 0 ? cards[cards.length - 1].cvv : ""} type="text" placeholder="cvv" required onChange={(e) => setblCreditCards({ ...setblCreditCards, cvv: e.target.value })} />
    <input className='inputs' defaultValue={cards.length !== 0 ? cards[cards.length - 1].id : ""} type="text" placeholder="id" required onChange={(e) => setblCreditCards({ ...setblCreditCards, id: e.target.value })} />
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
  </div>
}