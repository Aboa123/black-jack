import './App.css';
import {useState} from 'react';
import {Card} from './Card';

const App = () => {
    const [Ddeck,setDdeck] = useState([]);
    const [Mdeck,setMdeck] = useState([]);
    const [Dscore,setDscore] = useState(0);
    const [Mscore,setMscore] = useState(0);
    
    const Dealerdeck = () => {
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
        if(Mscore > 10 && Card[random].num === "A")
        {
            setMscore(Mscore+Card[random].score-10)
        }
        else
        {
            setMscore(Mscore+Card[random].score)
        }
    }

    return (
        <div className="App">
            <div className="d-card-form">
                <div>딜러</div>
                <p>- 카드 -</p>
                <div className="d-card-list">
                    {Dealerdeck()}
                </div>
            </div>
            <div className="tools">
                <input type="button" onClick={()=>Draw()} value={"드로우"} disabled={Mscore >= 21 ? true : false}/>
                <input type="button"
                onClick={()=>( setMscore(0), setMdeck([]) )}
                value={"재시작"}
                disabled={Mscore < 21 ? true : false}/>
                <input type="button" onClick={()=>Draw()} value={"스탠드"} disabled={Mscore >= 21 ? true : false}/>
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
