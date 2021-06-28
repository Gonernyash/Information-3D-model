import {setRow, SetInput, SetTextarea} from './DataBaseEditForm';
import {useState, useEffect} from 'react';

function RoomsForm(props) {
    const [data, setData] = useState([[]]);

    useEffect(()=>{
        fetch('http://server/columnData.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `table=rooms`
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            setData(res);
        });
    }, []);

    if (props.action === 'Insert') {
        return(
            <>
                {setRow('Обозначение')}
                <SetInput caption="Здание" data={data[0]} />
                <SetTextarea caption="Описание"/>
            </>
        );
    } else if (props.action === 'Update') {
        return(
            <>
                {setRow('id')}
                {setRow('Обозначение')}
                <SetInput caption="Здание" data={data[0]} />
                <SetTextarea caption="Описание"/>
            </>
        );
    } else if (props.action === 'Delete') {
        return(
            <>
                {setRow('id')}
            </>
        );
    }
}

export default RoomsForm;