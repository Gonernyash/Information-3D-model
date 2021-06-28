import {setRow, SetInput} from './DataBaseEditForm';
import {useState, useEffect} from 'react';

function MotorsForm(props) {
    const [data, setData] = useState([[]]);

    useEffect(()=>{
        fetch('http://server/columnData.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `table=dvigateli`
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            setData(res);
        });
    }, []);

    if (props.action === 'Insert') {
        return(
            <>
                {setRow('Модель')}
                {setRow('Мощность')}
                {setRow('Об/Мин')}
                {setRow('КПД')}
                {setRow('cos u')}
                {setRow('Год выпуска')}
                {setRow('Обозначение')}
                <SetInput caption='Щит' data={data[0]} />
            </>
        );
    } else if (props.action === 'Update') {
        return(
            <>
                {setRow('id')}
                {setRow('Модель')}
                {setRow('Мощность')}
                {setRow('Об/Мин')}
                {setRow('КПД')}
                {setRow('cos u')}
                {setRow('Год выпуска')}
                {setRow('Обозначение')}
                <SetInput caption='Щит' data={data[0]} />
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

export default MotorsForm;