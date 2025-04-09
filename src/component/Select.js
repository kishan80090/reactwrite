import { useState } from "react";
 
function Select() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    if (option == true) {
      setResult(x * 1 + y * 1);
      return;
    }
    else {
      setResult(x * 1 - y * 1);
      return;
    }
  }
  const [
    x, setX] = useState(0);

  const [
    y, setY] = useState(0);
  const [
    sum, setResult] = useState(0);

  const [
    option, setOption] = useState('');

  const OneChange = (event) => {
    console.log("One");
    let t = event.target.value;
    setX(t);
  }
  const TwoChange = (event) => {
    console.log("Two");
    let t = event.target.value;
    setY(t);
  }
  const optionoChange = (event) => {
        console.log("Option");
    let t = event.target.checked;
    console.log(t);
    setOption(t);
  }
  return (
    <form onSubmit={handleSubmit}>

      <h2>Result {sum}</h2>

      <label>N1 <input type="number" value={x} onChange={OneChange} ></input></label><br></br>

      <label>N2 <input type="number" value={y} onChange={TwoChange} ></input></label><br></br>

      <label>Add/Sub <input name="calculate" onChange={optionoChange} type="checkbox" value="add"  ></input></label>

      <button type="submit">Calculate</button>

    </form>
  );
}
export default Select;
