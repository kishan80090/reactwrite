import React,{useState} from "react";

     function Form2 () {
    const [number,setNumber]=useState('');
    const [number1,setNumber1]=useState('');
    const [result,setResult]=useState('');
    const [add,setAdd]=useState('');

        const handleAdd =(e)=>{
        e.preventDefault();

        const num1=Number(number);
        const num2=Number(number1);

        let x=0;
        if(add)
        {
            x=num1+num2;
        }
        else
        {
            x=num1-num2;
        }
        setResult(x);
    };
    return(
        <div>
    <form onSubmit={handleAdd}>
<input type="number"value={number}onChange={(e)=>setNumber(e.target.value)}></input>
<br></br>

<input type="number"value={number1}onChange={(e)=>setNumber1(e.target.value)}></input>

<br></br>

<input value={result}></input>

<input type="checkbox"checked={add}onChange={(e)=>setAdd(e.target.checked)}>Add</input>

<br></br>
<button type="submit">Submit</button>

            </form>

        </div>
    )
};
export default Form2;