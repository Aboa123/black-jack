import './App.css';
import {useEffect, useState} from 'react';
import {Card} from './Card';

const App = () => {
    const [Ddeck,setDdeck] = useState([])
    const [Mdeck,setMdeck] = useState([])
    const [Dscore,setDscore] = useState(0)
    const [Mscore,setMscore] = useState(0)
    
    const [EndCheck,setEndCheck] = useState(true)
    const [Stand,setStand] = useState(false)
    const [AutoCheck,setAutoCheck] = useState(false)

    let AutoDraw = null;
    
    const DealerDeck = () => {
        if (Ddeck) return Ddeck.map(item=> <div className="d-card">{item.num}</div>)
        else return null
    }

    const Mydeck = () => {
        if (Mdeck) return Mdeck.map(item=> <div className="m-card">{item.num}</div>)
        else return null
    }

    const Draw = () => {
        const random = Math.floor((Math.random() * (13 - 0)) + 0);
        setMdeck([...Mdeck,{num:Card[random].num}])
        
        setMscore(Mscore=>{
            if(Mscore > 10 && Card[random].num === "A")
            {
                return Mscore+Card[random].score-10
            }
            else
            {
                return Mscore+Card[random].score
            }
        })
    }

    useEffect(()=>{
        if(Mscore >= 21)
        {
            setStand(true)
            setEndCheck(false)
        }
    },[Mscore])

    useEffect(()=>{
        if(AutoCheck)
        {
            DealerDraw()
        }
    },[AutoCheck])

    const DealerDraw = () => {
        let Deck = Ddeck;
        let DealerScore = Dscore;
        let MyScore = Mscore;
        
        AutoDraw = setInterval(() => {
            const random = Math.floor((Math.random() * (13 - 0)) + 0);
            Deck = [...Deck,{num:Card[random].num}];
            if(DealerScore > 10 && Card[random].num === "A")
            {
                DealerScore += Card[random].score-10;
            }
            else
            {
                DealerScore += Card[random].score;
            }
            setDdeck(Deck)
            setDscore(DealerScore)
            if(MyScore <= DealerScore || DealerScore >= 21)
            {
                setEndCheck(false)
                clearInterval(AutoDraw)
            }
        },500)

        return () => clearInterval(AutoDraw)
    }

    const Reset = () => {
        clearInterval(AutoDraw)
        setMdeck([])
        setDdeck([])
        setMscore(0)
        setDscore(0)
        setEndCheck(true)
        setAutoCheck(false)
        setStand(false)
    }

    const StandCard = () => {
        setAutoCheck(true)
        setStand(true)
    }

    return (
        <div className="App">
            <div className="d-card-form">
                <div>딜러</div>
                <p>- 카드 -</p>
                점수 : {Dscore}
                <div className="d-card-list">
                    {DealerDeck()}
                </div>
            </div>
            <div className="tools">
                <input type="button" onClick={() => Draw()} value={"드로우"} disabled={(AutoCheck || Mscore >= 21) ? true : false}/>
                <input type="button" onClick={() => StandCard()} value={"스탠드"} disabled={(Stand || Mscore === 0) ? true : false}/>
                <input type="button" onClick={() => Reset()} value={"재시작"} disabled={EndCheck ? true : false}/>
            </div>
            <div className="m-card-form">
                <p>- 카드 -</p>
                점수 : {Mscore}
                <div className="m-card-list">
                    {Mydeck()}
                </div>
                <div>자신</div>
            </div>
        </div>
    );
}

export default App;
