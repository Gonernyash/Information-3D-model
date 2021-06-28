import {setRow} from './DataBaseEditForm';

function KluchiForm(props) {
    if (props.action === 'Insert') {
        return(
            <>
                {setRow('Обозначение')}
            </>
        );
    } else if (props.action === 'Update') {
        return(
            <>
                {setRow('id')}
                {setRow('Обозначение')}
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

export default KluchiForm;