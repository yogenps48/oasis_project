//getting all numerical button references
let num=[];
num[0]=document.getElementById("0");
num[1]=document.getElementById("1");
num[2]=document.getElementById("2");
num[3]=document.getElementById("3");
num[4]=document.getElementById("4");
num[5]=document.getElementById("5");
num[6]=document.getElementById("6");
num[7]=document.getElementById("7");
num[8]=document.getElementById("8");
num[9]=document.getElementById("9");
//getting other buttons references
let obracket=document.getElementById("obracket");
let cbracket=document.getElementById("cbracket");
let ans=document.getElementById("ans");
let del=document.getElementById("del");
let clear=document.getElementById("clear");
let percentage=document.getElementById("percentage");
let root=document.getElementById("root");
let x=document.getElementById("x");
let divide=document.getElementById("divide");
let plus=document.getElementById("plus");
let minus=document.getElementById("minus");
let decimal=document.getElementById("decimal");
let enter=document.getElementById("enter");
//getting both input field references
let expression=document.getElementById("expression");
let answer=document.getElementById("answer");
expression.focus();
//adding event listener to all numerical buttons
for(let i=0;i<=9;i++){
    num[i].onclick=()=>{
        expression.value=expression.value+i;
        answer.value='';
    }
    num[i].onmousedown=(e)=>{
        e.preventDefault();
    }
}
let prevans='';
//adding event listener for all function buttons
obracket.onclick=()=>{expression.value+='(';answer.value=''}
cbracket.onclick=()=>{expression.value+=')';answer.value=''}
percentage.onclick=()=>{expression.value+='%';answer.value=''}
root.onclick=()=>{expression.value+='√';answer.value=''}
x.onclick=()=>{expression.value+='x';answer.value=''}
divide.onclick=()=>{expression.value+='÷';answer.value=''}
plus.onclick=()=>{expression.value+='+';answer.value=''}
minus.onclick=()=>{expression.value+='-';answer.value=''}
decimal.onclick=()=>{expression.value+='.';answer.value=''}
//adding event listeners for special btns
ans.onclick=()=>{expression.value=prevans;answer.value=''}
del.onclick=()=>{expression.value=expression.value.slice(0,-1);answer.value=''}
clear.onclick=()=>{expression.value='';answer.value=''}

obracket.onmousedown=(e)=>{e.preventDefault();}
cbracket.onmousedown=(e)=>{e.preventDefault();}
percentage.onmousedown=(e)=>{e.preventDefault();}
root.onmousedown=(e)=>{e.preventDefault();}
x.onmousedown=(e)=>{e.preventDefault();}
divide.onmousedown=(e)=>{e.preventDefault();}
plus.onmousedown=(e)=>{e.preventDefault();}
minus.onmousedown=(e)=>{e.preventDefault();}
decimal.onmousedown=(e)=>{e.preventDefault();}
ans.onmousedown=(e)=>{e.preventDefault();}
del.onmousedown=(e)=>{e.preventDefault();}
clear.onmousedown=(e)=>{e.preventDefault();}
enter.onmousedown=(e)=>{e.preventDefault();}
//adding event listener for enter button
enter.onclick=submit;
function submit(){
    let ans={val:0};
    if(evaluate(expression.value,ans)==-1)
    answer.value="Invalid Exp";
    else
    answer.value=ans.val;
}
function isdigit(ch){
    if(ch=='.')return true;
    if(ch>='0'&&ch<='9')return true;
    return false;
}
function calculate(a,b,op,obj){
    switch(op){
        case '+':
            return a+b;
            break;
        case '-':
            return a-b;
            break;
        case 'x':
            return a*b;
            break;
        case '÷':
            return a/b;
            break;
        case '%':
            return a%b;
            break;
        default:
            obj.status=0;
            console.log("invalid operator!!");
    }
}
function evaluate(exp,ans){
    let n=exp.length;
    let npstack=[];
    let opstack=[];
    let np=-1;
    let op=-1;
    let num=0;
    let flag=0;
    for(let i=0;i<n;i++){
        if(isdigit(exp[i])){
            if(exp[i]=='.'&&flag!=0)return -1;
            if(exp[i]=='.'){flag++;continue;}
            if(!flag)
            num=num*10+Number(exp[i]);
            else{
                num=num+exp[i]/(Math.pow(10,flag++))
            }
            if(i+1==n||!isdigit(exp[i+1])){
                npstack[++np]=num;
                flag=0;
                num=0;
                while(op!=-1&&opstack[op]=='√'){
                    if(np==-1)return -1;
                    npstack[np]=Math.sqrt(npstack[np]);
                    op--;
                }
                if(op!=-1&&(opstack[op]=='x'||opstack[op]=='÷')){
                    if(np<1)return -1;
                    let b=npstack[np--];
                    let a=npstack[np];
                    let obj={status:1};
                    npstack[np]=calculate(a,b,opstack[op],obj);
                    if(!obj.status)return -1;
                    op--;
                }
            }
        }else{
            if(exp[i]==')'){
                while(opstack[op]!='('){
                    if(np<1)return -1;
                    let b=npstack[np--];
                    let a=npstack[np];
                    let obj={status:1};
                    npstack[np]=calculate(a,b,opstack[op],obj)
                    if(!obj.status)return -1;
                    op--;
                }
                op--;
                while(op!=-1&&opstack[op]=='√'){
                    if(np==-1)return -1;
                    npstack[np]=Math.sqrt(npstack[np]);
                    op--;
                }
            }else
            opstack[++op]=exp[i];
        }
    }
    while(op!=-1){
        if(np<1)return -1;
        let b=npstack[np--];
        let a=npstack[np];
        let obj={status:1};
        npstack[np]=calculate(a,b,opstack[op],obj);
        if(!obj.status)return -1;
        op--;
    }
    if(np!=0)return -1;
    prevans=npstack[0];
    ans.val=npstack[0];
    return 1
}