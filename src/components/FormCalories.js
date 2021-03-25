import React, {useState, useCallback} from 'react';
import './styles/FormCalories.css'

const FormCalories = ({foods = []}) => {
    const [editable, setEditable] = useState(null);
    const [title, setTitle] = useState("");
    const [num, setNum] = useState(1);
    const handleChange = useCallback((event) => {
        event.preventDefault();
        const meal = event.target.value;
        setTitle(meal);
    }, [title]);
    const handleChangeNum = useCallback((event) => {
        setNum(event.target.value)
    }, [num])
    const handleSubmit = useCallback((event) => {
        event.preventDefault();

    }, [title]);

    let obj = foods.filter(o => o.Display_Name === title);

    const handleClickEdit = useCallback((event) => {
        const idEditableBtn = event.target.id

        if ( idEditableBtn ) {
            setEditable(idEditableBtn)

        }

        if ( idEditableBtn === editable ) setEditable(!editable)
    }, [editable])
    const setNumCalories = (calories, id) => {
        if(id === editable){
          return num ? calories * num : calories
        }else {
           return calories
        }
    }
    // Display_Name
    // Sherbet
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" onChange={handleChange} value={title} className="form-control mt-10"
                           placeholder="Search for books" autoComplete="off"/>
                </div>
                <button className="btn btn-danger" type="submit">Search</button>
            </form>
            {obj.map(o => {
                let calories = Math.floor(o.Calories);

                return (
                    <table className="table" key={o.id}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Portion Amount</th>
                            <th>Portion Name</th>
                            <th>Calories</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td> {o.Display_Name}</td>
                            <td>
                                <button id={o.id} onClick={handleClickEdit}>{o.id === editable ? "UPDATE" : "EDIT"}</button>
                                {editable && o.id === editable ? <input value={num}
                                                   onChange={handleChangeNum}/> : num || Math.floor(o.Portion_Amount)}
                            </td>
                            <td> {o.Portion_Display_Name}</td>
                            <td>{ setNumCalories(calories, o.id)}</td>
                        </tr>
                        </tbody>

                    </table>
                )
            })}
        </div>
    )
}

export default FormCalories;
