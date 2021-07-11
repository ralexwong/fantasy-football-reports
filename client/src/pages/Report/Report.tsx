
import Caption from '../../components/Caption';
import Title from "../../components/Title";
import DateRow from "../../components/DateRow";
import MiddleRow from './Middle';
import GraphPPG from "./GraphPPG";

const Report = () => {
  return (
    <>
      <Title />
      <Caption />
      <DateRow />
      <MiddleRow />
      <GraphPPG />
    </>
  );
}

export default Report