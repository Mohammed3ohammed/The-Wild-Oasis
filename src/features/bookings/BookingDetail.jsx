import { useNavigate } from "react-router-dom";
import styled from 'styled-components';


import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ConfirmDelete from 'ui/ConfirmDelete';

import { useBooking } from 'features/bookings/useBooking';
import { useDeleteBooking } from './useDeleteBooking';
import { useMoveBack } from 'hooks/useMoveBack';
import { useCheckout } from 'features/check-in-out/useCheckout';
import ButtonText from '../../ui/ButtonText';


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

    const { booking } = useBooking();
    const { mutate: deleteBooking, isLoading: isDeleteing } = useDeleteBooking();
    const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();
    const moveBack = useMoveBack();
    const navigate = useNavigate();

      const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { id: bookingId, status } = booking;

    return (
        <>
                <Row type='horizontal'>
            <HeadingGroup>
                <Heading type='h1'>Booking #{bookingId}</Heading>
                <Tag type={statusToTagName[status]}>{status.replace('_', '')}</Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr;</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
            {
                status === 'unconfirmed' && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}

                {
                    status === 'check-in' && (
                        <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}> 
                                Check out
                        </Button>
                    )}
                    <Modal>
                        <Modal.Toggle opens='delete'>
                            <Button variation='danger'>Delete booking</Button>
                        </Modal.Toggle>
                        <Modal.Window name='delete'>
                            <ConfirmDelete 
                            resource='booking' onConfirm={(options) => deleteBooking(bookingId, options)} disabled={isDeleteing}
                            />
                        </Modal.Window>
                    </Modal>
                    <Button variation='secondry' onClick={moveBack}>
                        Back
                    </Button>
        </ButtonGroup>

        </>
    )
}

export default BookingDetail;