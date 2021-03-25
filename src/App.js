import React, {useCallback, useState} from 'react';
import './styles.css';
import Parser from "./utils/Parser";
import FormCalories from "./components/FormCalories";

const App = () => {

    const [foods, setFood] = useState([]);
    const handleChangeFile = useCallback((event) => {
        let file = event.target.files[0].type
        if (file !== "text/csv" ) {
            alert("File does not support. You must use .csv");
            return false;
        }
        const parser = new Parser(event);
        parser.initReader();
        parser.setOnLoad((p) => {
            console.log('parser: ', p);
            setFood(parser.result);
        });
        parser.readFile();

    }, []);

    console.log('food: ', foods);

    return (
        <>
            <input type="file" onChange={handleChangeFile} />
            <FormCalories foods={foods}/>
        </>
    )
}

export default App;
