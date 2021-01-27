import './App.css';
import './antd.css';
import './modalStyle.css'
import {useEffect, useState} from 'react';
import {Card} from './Card';
import { Button, Input, Tooltip, Steps, notification } from 'antd';
import { 
    UserOutlined
} from '@ant-design/icons';
import { Modal } from 'react-responsive-modal';

const App = () => {
    const [modal,setModal] = useState(false)
    const [Ddeck,setDdeck] = useState([])
    const [Mdeck,setMdeck] = useState([])
    const [Dscore,setDscore] = useState(0)
    const [Mscore,setMscore] = useState(0)

    const [MyMoney,setMyMoney] = useState(2500000)
    const [DealerMoney,setDealerMoney] = useState(100000000)
    const [Betmoney,setBetmoney] = useState(100)
    
    // 계산용 배팅금액
    const Betting = Number(Betmoney);

    const [EndCheck,setEndCheck] = useState(true)
    const [Stand,setStand] = useState(false)
    const [AutoCheck,setAutoCheck] = useState(false)

    const [VictoryScore,setVictoryScore] = useState(0)
    const [DefeatScore,setDefeatScore] = useState(0)
    const [GameResult,setGameResult] = useState("")

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
        if(Betting > 99)
        {
            if(Betting <= MyMoney)
            {
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
            else
            {
                alert("배팅금액이 보유금액보다 많을 수 없습니다.")
            }
        }
        else
        {
            alert("배팅금액은 최소 100원입니다.")
            setBetmoney(100)
        }
    }

    useEffect(()=>{
        
        if(Mscore >= 21)
        {
            setStand(true)
            setEndCheck(false)
        }
        //블랙잭
        if(Mscore === 21)
        {
            setMyMoney(MyMoney+Betting)
            setDealerMoney(DealerMoney-Betting)
            setDefeatScore(0)
            setVictoryScore(VictoryScore+1)
            setGameResult("블랙잭! 승리")
        }
        //버스트
        if(Mscore > 21)
        {
            setMyMoney(MyMoney-Betting)
            setDealerMoney(DealerMoney+Betting)
            setDefeatScore(DefeatScore+1)
            setVictoryScore(0)
            setGameResult("버스트! 패배")
        }
        
    },[Mscore])

    useEffect(()=>{
        //딜러버스트
        if(Dscore > 21 && !EndCheck)
        {
            setMyMoney(MyMoney+Betting)
            setDealerMoney(DealerMoney-Betting)
            setDefeatScore(0)
            setVictoryScore(VictoryScore+1)
            setGameResult("딜러 버스트! 승리")
        }
        //무승부
        if(Dscore === Mscore && !EndCheck)
        {
            setGameResult("무승부")
        }
        //딜러승리
        if(Dscore > Mscore && Dscore < 22 && !EndCheck)
        {
            setMyMoney(MyMoney-Betting)
            setDealerMoney(DealerMoney+Betting)
            setDefeatScore(DefeatScore+1)
            setVictoryScore(0)
            setGameResult("딜러 승리! 패배")
        }
        //딜러패배
        if(Dscore !== Mscore && Dscore < Mscore && Dscore >= 17 && !EndCheck)
        {
            setMyMoney(MyMoney+Betting)
            setDealerMoney(DealerMoney-Betting)
            setDefeatScore(VictoryScore+1)
            setDefeatScore(0)
            setGameResult("딜러 패배! 승리")
        }
        //딜러블랙잭
        if(Dscore > Mscore && Dscore === 21 && !EndCheck)
        {
            setMyMoney(MyMoney-Betting)
            setDealerMoney(DealerMoney+Betting)
            setDefeatScore(DefeatScore+1)
            setVictoryScore(0)
            setGameResult("딜러 블랙잭! 패배")
        }
    },[Dscore,EndCheck])

    useEffect(()=>{
        if(DealerMoney <= 0)
        {
            notification.open({
                message: '딜러로부터 메세지입니다!',
                duration: 0,
                description: <div>
                    <img style={{width:"200px"}} src={"/img/lose.png"}/>
                    패배를 인정하지...
               </div>,
                style: {
                    width:400
                }
            });
            setGameResult("딜러를 파산시켰습니다! 그래도 게임은 계속 진행가능합니다!")
        }
    },[DealerMoney])

    useEffect(() => {
        if(VictoryScore === 3)
        {
            notification.open({
                message: '딜러로부터 메세지입니다!',
                duration: 5,
                description: <div>
                    <img style={{width:"130px"}} src={"/img/str.png"}/>
                    3연승? 축하하지 아직 할만해 드루와!
               </div>,
                style: {
                    width:600
                }
            });
        }
        if(VictoryScore === 5)
        {
            notification.open({
                message: '딜러로부터 메세지입니다!',
                duration: 5,
                description: <div>
                    <img style={{width:"130px"}} src={"/img/mu.png"}/>
                    제발...무승부로 해줘... 당신 5연승째라구
               </div>,
                style: {
                    width:600
                }
            });
        }
        if(DefeatScore === 3)
        {
            notification.open({
                message: '딜러로부터 메세지입니다!',
                duration: 5,
                description: <div>
                    <img style={{width:"100px"}} src={"/img/power.png"}/>
                    당신 벌써...3연패야...
               </div>,
                style: {
                    width:300
                }
            });
        }
        if(DefeatScore === 5)
        {
            notification.open({
                message: '치료가 필요할 정도로 심각한 블랙잭 중독입니다.',
                duration: 5,
                description: <div>
                    <img style={{width:"200px"}} src={"/img/zawa.png"}/>
                    자와...자와... 5연패 달성
                </div>,
                style: {
                    width:600
                }
            });
        }
        if(MyMoney <= 100)
        {
            notification.open({
                message: '딜러로부터 동정의 눈빛이 전해집니다!',
                duration: 5,
                description: <div>
                    <img style={{width:"200px"}} src={"/img/warning.png"}/><br/>
                    돈은 목숨보다 소중하다.<br/>
                    적당히 챙겨줄태니까 오늘은 여기까지만 하고 돌아가<br/>
                    도박은 이제 그만하도록해
                </div>,
                style: {
                    width:400
                }
            });
            setMyMoney(2000000)
            setVictoryScore(0)
        }
    },[DefeatScore,VictoryScore])

    // 딜러 자동 드로우
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
            if(DealerScore >= 17)
            {
                setEndCheck(false)
                clearInterval(AutoDraw)
            }
            if(MyScore < DealerScore || DealerScore >= 21)
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
        setGameResult("")
    }

    const StandCard = () => {
        setAutoCheck(true)
        setStand(true)
        DealerDraw()
    }

    const NumOnly = e => {
        const reg = /^-?\d*(\.\d*)?$/;
        if(reg.test(e.target.value))
        {
            setBetmoney(e.target.value)
        }
    }

    const { Step } = Steps;
    const [StepIndex,setStepIndex] = useState(0)

    const MoneyReplace = (money) => {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div className="App">
            <div className="how-play">
                <Button style={{width:160,textAlign:"center"}} type="primary" onClick={()=>setModal(true)}>어떻게 플레이하나요?</Button><br/>
                <a style={{color:"#222"}} href="https://github.com/Aboa123/black-jack" target="blank">GitHub</a><br/>
                <span style={{color:"#7b79f1"}}>Discord : Aboa#9076</span>
            </div>
            <div className="d-card-form">
                <UserOutlined style={{fontSize:50}} />
                <div className="score">점수 : {Dscore}</div>
                <div className="dealer-money">딜러 소지골드 : {MoneyReplace(DealerMoney)}골드</div>
                <div className="d-card-list">{DealerDeck()}</div>
            </div>
            <div className="tools">
                <p>
                    <span style={{marginRight:5}}>배팅금액 :</span>
                    <Tooltip title={"숫자만 입력해주세요"}>
                        <Input onChange={(e) => NumOnly(e)} style={{width:200}} value={Betmoney} disabled={Mscore !== 0} />
                    </Tooltip>
                    <Button style={{marginLeft:5}} type="primary" onClick={() => setBetmoney(MyMoney)} disabled={Mscore !== 0}>MAX</Button>
                </p>
                <Button type="primary" onClick={() => Draw()} disabled={AutoCheck || Mscore >= 21}>드로우</Button>
                <Button style={{margin:10}} type="default" onClick={() => StandCard()} disabled={Stand || Mscore === 0}>스탠드</Button>
                <Button type="primary" onClick={() => Reset()} disabled={EndCheck} danger>재시작</Button>
            </div>
            <div className="m-card-form">
                {GameResult}
                <div className="score">점수 : {Mscore}</div>
                <div className="my-money">내 소지골드 : {MoneyReplace(MyMoney)}골드</div>
                <div className="m-card-list">{Mydeck()}</div>
            </div>
            <Modal 
            classNames={{
                modal: 'how-play-modal',
            }}
            open={modal} 
            onClose={()=>setModal(false)}
            closeIcon={<div className="modal-colose">X</div>}>
                <div className="how-play-modal-title">플레이 방법</div>
                <Steps current={StepIndex} className="how-play-modal-step">
                    <Step onClick={()=>setStepIndex(0)} title="시작!" description="블랙잭은 아주간단해요!" />
                    <Step onClick={()=>setStepIndex(1)} title="기본룰" description="룰을 같이 알아볼까요?" />
                    <Step onClick={()=>setStepIndex(2)} title="완료!" description="블랙잭을 플레이할 준비가 되었습니다!" />
                </Steps>
                {
                    StepIndex === 0 ?
                    <div className="how-play-rule">
                        먼저 이 게임은 모두들 편하게 즐기도록 만들어졌기에 룰이 실제 게임과 다를 수 있습니다.<br/>
                        블랙잭은 숫자 21을 맞추거나 최대한 가깝게 맞추어 딜러를 이기면 배팅금액의 2배를 가져가는 게임입니다!<br/>
                        <b>카드의 종류는 1 ~ 9카드, A, K, Q, J가 있습니다.</b><br/>
                        1 ~ 9 카드는 각각 1 ~ 9점, K, Q, J 카드는 10점입니다.<br/>
                        A카드는 1점 혹은 11점입니다. 무슨말이냐구요?<br/>
                        자신의 현재 점수를 더해서 21점을 넘어갈경우 1점으로 계산되며 그 아래는 11점으로 계산됩니다!<br/>
                        예) 현재점수 0점에서 A카드 드로우 시 +11점, 현재점수 20점에서 A카드 드로우 시 +1점
                    </div>
                    :
                    StepIndex === 1 ?
                    <div className="how-play-rule">
                        <Button style={{margin:5}} type="primary" >드로우</Button>를 누를 경우 카드를 드로우합니다. 카드는 무제한으로 뽑을 수 있어요!<br/>
                        하지만! 카드의 점수가 21점을 넘어서면 <b>"버스트"</b>가 됩니다. 즉! 패배를 의미하죠! 21점을 넘기지않도록 주의합니다!<br/>
                        카드를 드로우 하는 도중 멈출 수 있습니다. 바로 <Button style={{margin:5}} type="default">스탠드</Button>버튼을 누르는 것이죠!<br/>
                        <Button style={{margin:5}} type="default">스탠드</Button>버튼을 누르게 되면 턴이 종료되며 딜러의 차례가 됩니다.<br/>
                        딜러는 자동적으로 카드를 드로우하며, 자신의 점수가 딜러보다 낮다면 <b>"패배"</b>, 자신의 점수가 딜러보다 높다면 <b>"승리"</b><br/>
                        딜러 또한 21점을 넘기면 <b>"버스트"</b>로 패배하게됩니다.<br/>
                        <b>하지만!</b> 앞서 21점을 맞추는게임이라고 했던 것처럼 카드의 점수를 21점을 맞추게 된다면 <b>"블랙잭"</b> 그 즉시 게임의 승리합니다.<br/>
                        반대로 딜러도 <b>"블랙잭"</b>을 맞추어 그 즉시 승리할 수 도있겠죠!
                    </div>
                    :
                    StepIndex === 2 &&
                    <div className="how-play-rule">
                        블랙잭을 플레이할 준비가 완료되었어요!<br/>
                        아직 룰을 잘 모르시겠다구요? 모르면 맞으면서 배워야죠! 일단 드로우부터 하러갑시다!
                    </div>
                }
            </Modal>
        </div>
    );
}

export default App;
