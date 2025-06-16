import Filter from '../../ui/Filter';

function DashboardFilter() {
    return (
        <Filter
        filterField='last'
        options={[
            {value: '7', lable: 'Last 7 day'},
            {value: '30', lable: 'Last 30 day'},
            {value: '90', lable: 'Last 90 day'},
        ]}
        />

    )
}

export default DashboardFilter;