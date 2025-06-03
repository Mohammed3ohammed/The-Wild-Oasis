import { useSearchParams } from 'react-router-dom';
import CabinRow from '../../features/cabins/CabinRow';
import { useCabins } from 'features/cabins/useCabins';

function CabinTable() {
    const {cabins} = useCabins();
    const {searchParams} = useSearchParams();
    const filterValue = searchParams.get('discount') || 'all';
    let filteredCabins;
    if(filterValue === 'all') filteredCabins = cabins;
    if(filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabins) => cabins.discount > 0);
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;


  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
            <Table columns='9.6rem 0.8fr 2fr 1fr 1fr 3.2rem'>
            <Table.Header>
                <div></div>
                <div>Cabin</div>
                <div>Capactiy</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>
            
            <Table.Body
            data={sortedCabins}
            render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
            >
            </Table.Body>
    </Table>
    </Menus>
  )
}

export default CabinTable;