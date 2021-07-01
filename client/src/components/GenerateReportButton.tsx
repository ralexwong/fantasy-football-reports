
import { Link } from 'react-router-dom';

type Props = {
    reportPage: string
}

const GenerateReportButton = (props: Props) => {
    return (
        <Link to={props.reportPage}>
            <button style={{ width: '80%', margin: '5rem 0', fontSize: '3rem' }} className="btn btn--white">
                Report Page &rarr;
            </button>
        </Link>
    )
}

export default GenerateReportButton;