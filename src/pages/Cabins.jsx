import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";


function Cabins() {
  return (
<>
    <Row type="horizontal">
        <Heading as="h1">Al cabins</Heading>
        <CabinTableOperations />
    </Row>

          <Row>
        <CabinTable />
        <AddCabin />
      </Row>
</>

  )
}

export default Cabins;
