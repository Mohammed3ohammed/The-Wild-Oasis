import Filter from '../../ui/Filter';

function DashboardFilter() {
    return (
        <Filter
        filterField='last'
        options={[
            {value: '7', label: 'Last 7 day'},
            {value: '30', label: 'Last 30 day'},
            {value: '90', label: 'Last 90 day'},
        ]}
        />

    )
}

export default DashboardFilter;