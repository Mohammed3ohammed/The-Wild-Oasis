import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';

import BookingDataBox from 'features/bookings/BookingDataBox';
import { useBooking } from 'features/bookings/useBooking';
import { useMoveBack } from 'hooks/useMoveBack';
import { useCheckin } from './useCheckin';
import { box } from 'styles/styles';
import { useSettings } from 'features/settings/useSettings'

const Box = styled.div`
    ${box}
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreackfast] = useState(false);

    const {booking, isLoading} = useBooking();
    const { mutate: checking, isLoading: isCheckingIn } = useCheckin();
    const moveBack = useMoveBack();
    const {isLoading: isLoadingSettings, settings} = useSettings();

    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
    
    if (isLoading || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights, 
    } = booking;

    const optionalBreakfastPrice = numGuests * settings.breakfastPrice * numGuests;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast)
            checking({bookingId, breakfast: {hasBreakfast: true, extrasPrice: optionalBreakfastPrice, 
            totalPrice: totalPrice + optionalBreakfastPrice,
            },
        });
        else checking({bookingId, breakfast: {} });
    }

    return (
        <>
        <Row type='horizontal'>
            <Heading type='h1'>Check in booking #{bookingId}</Heading>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        <BookingDataBox booking={booking} />

        {
            !hasBreakfast && (
                <Box>
                    <Checkbox checked={addBreackfast} onChange={() => {
                        setAddBreackfast((add) => !add);
                        setCountfirmPaid(false)
                    }}
                    id='breackfast'
                        >
                                    Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
                        </Checkbox>
                    
                </Box>
            )
        }

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={isCheckingIn || confirmPaid}
          id='confirm'
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )} for breakfast)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
            Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
            Back
        </Button>
      </ButtonGroup>
        </>
    )
}

export default CheckinBooking;