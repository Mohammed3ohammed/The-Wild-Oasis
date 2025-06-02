import Modal from '../../ui/Modal';
import Button from '../../ui/Button';


function AddCabin() {
    return (
        <Modal>
            <Modal.Toggle opens='new-cabin'>
                <Button>Add new cabin</Button>
            </Modal.Toggle>
            <Modal.Window name="new-cabin">
            <CreateCabinForm />
            </Modal.Window>
        </Modal>
    )
}

export default AddCabin;