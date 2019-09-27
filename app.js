new Vue({
    el: "#app",
    data: {
        myChoice: null,
        comChoice: null,
        count: 3,
        winner: null,
        lifeOfMe: 3,
        lifeOfCom: 3,
        isSelectable: true, // 선택완료를 기다리는 중으로 변경하기 위한 데이터
        logs: [],
        selects: [
            { name: '가위', value: 'scissor'},
            { name: '바위', value: 'rock'},
            { name: '보', value: 'paper'},
        ]
    },
    watch:{
        count: function(newVal){
            // count를 watch를 통해 감시.
            if(newVal == 0){
                // 컴퓨터가 가위바위보를 선택
                this.selectCom();

                // 승패 결정 & 몫 차감
                this.whoIsWin();

                // count reset
                this.count = 3;
                this.isSelectable = true;
                
                // 로그 업데이트
                this.updateLogs();
            }
        },
        lifeOfMe: function(newVal){
            if(newVal === 0){
                // 게임을 종료
                this.endGame("안타깝네요. 당신이 패배하였습니다.");
            }
        },
        lifeOfCom: function(newVal){
            if(newVal === 0){
                // 게임을 종료
                this.endGame("축하합니다. 당신이 승리하였습니다.");
            }
        }
    },
    methods: {
        startGame: function(){
            if(!this.myChoice){
                // 선택을 하지 않았을경우
                alert("가위와 바위 보 중에 하나를 선택해주세요!.");
                return;
            } else {
                this.isSelectable = false;
                // 카운트를 1초에 1씩 감소
                let countDown = setInterval(()=>{
                    this.count--;
                    if(this.count === 0){
                        clearInterval(countDown);
                    }
                }, 1000)
            }
        },
        selectCom : function(){
            //TODO count가 0이 되었을 때 컴퓨터가 가위, 바위, 보 중에 골라야한다.
            let number = Math.random();
            Math.random(); // 0과 1사이의 소수중에 랜덤으로 하나를 선택하게 된다.
            // 0.33, 0.66, 그외 나머지 그 난수가 어느 구간에 속하는지에 따라서 선택사항을 고른다.
            if(number < 0.33){
                this.comChoice = 'scissor';
            } else if(number < 0.66){
                this.comChoice = 'rock';
            } else {
                this.comChoice = 'paper';
            }
        },
        whoIsWin: function(){
             // 가위바위보 승패 결정
             if(this.myChoice === this.comChoice) this.winner = 'no one'
             else if(this.myChoice === 'rock' && this.comChoice === 'scissor') this.winner = 'me'
             else if(this.myChoice === 'rock' && this.comChoice === 'paper') this.winner = 'com'
             else if(this.myChoice === 'paper' && this.comChoice === 'rock') this.winner = 'me'
             else if(this.myChoice === 'paper' && this.comChoice === 'scissor') this.winner = 'com'
             else if(this.myChoice === 'scissor' && this.comChoice === 'paper') this.winner = 'me'
             else if(this.myChoice === 'scissor' && this.comChoice === 'rock') this.winner = 'com'
             else this.winner = 'error'

             // 승자에 따라 몫 차감
             if(this.winner === 'me'){
                 this.lifeOfCom--
             }
             if(this.winner === 'com'){
                 this.lifeOfMe--
             }
        },
        updateLogs: function(){
            // 결과 저장
            let log = {
                message: `You: ${this.myChoice} Computer: ${this.comChoice}`,
                winner: this.winner
            }
            this.logs.unshift(log);
        },
        endGame(message){
            confirm(message);
                // value reset
                this.lifeOfMe = 3;
                this.lifeOfCom = 3;
                this.myChoice = null;
                this.comChoice = null;
                this.winner = null;
                this.logs = [];
        }
    },
    computed: {
        myChoiceImg: function(){
            return this.myChoice ?`images/${this.myChoice}.jpg` : 'images/question.jpg'; 
        },
        comChoiceImg: function(){
            return this.comChoice ?`images/${this.comChoice}.jpg` : 'images/question.jpg'; 
        },
        leftLifeOfMe: function(){
            return 3 - this.lifeOfMe;
        },
        leftLifeOfCom: function(){
            return 3 - this.lifeOfCom;
        }
        
    }
});