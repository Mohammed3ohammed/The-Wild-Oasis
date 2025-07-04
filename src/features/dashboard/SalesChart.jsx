import { useDarkMode } from '../../context/DarkModeContext';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from 'recharts';
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


function SalesChart({ bookings, numDays }) {
    const { isDarkMode } = useDarkMode();

    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });

    const data = allDates.map((date) => {
      return {
        totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
      };
    });

    const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };


      return (
        <StyledSalesChart>
          <Heading type='h2'>
            Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
            {format(allDates.at(-1), 'MMM ddd yyyy')}
          </Heading>
          
          <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={data}>
          <YAxis 
          unit='$'
          tick={{fill: colors.text}}
          tickLine={{stoke: colors.text}}
          />
          <CartesianGrid strokeDasharray='4' />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area 
          type='monotone'
          dataKey='totalSales'
          stroke={colors.totalSales.stroke}
          fill={colors.totalSales.fill}
          strokeWidth={2}
          unit='$'
          name='Total sales'
          />

          <Area 
          type='monotone'
          dataKey='extrasSales'
          stroke={colors.extrasSales.stroke}
          fill={colors.extrasSales.fill}
          strokeWidth={2}
          name='Extras sales'
             unit="$"
          />
          </AreaChart>
          </ResponsiveContainer>
        </StyledSalesChart>

      )
}

export default SalesChart;