import { useCreateCabin } from 'features/cabins/useCreateCabin';

function CreateCabinForm() {
        const { mutate: createCabin, isLoading: isCreating } = useCreateCabin();
  const { mutate: editCabin, isLoading: isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;


  const { id: editId, ...editValues } = cabinToEdit || {};
  delete editValues.created_at;
  const isEditSession = Boolean(editId);


  const { register, handleSubmit, formState, reset, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;


  const onSubmit = function (data) {


    const options = {
      onSuccess: (data) => {

        closeModal?.();
        reset();
      },
    };

    const image = typeof data.image === 'object' ? data.image[0] : data.image;

    if (isEditSession)
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        options
      );
    else createCabin({ ...data, image }, options);
  };


  const onError = function (errors) {
    console.log('Failed validation!', errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type='modal'>
        <FromRow lable='Cabin name' error={errors?.name?.message}>
            <Input 
            type="text"
            id='name'
            disbled={isWorking}
            {...register('name', {required: 'This field is requ'})}
        />
        </FromRow>
        <FromRow lable='Maximum capacity' error={errors?.maxCapacity?.message}>
                <Input 
                type='number'
                id='maxCapactiy'
                disbled={isWorking}
                {...register('maxCapacity', {
                    required: 'This field is required',
                    min: {
                        value: 1,
                        message: 'Capacity should be at least 1',
                    }
                })}
                />
        </FromRow>
        <FromRow>
            <Input 
            type='number'
            id='reqularPrice'
            disabled={isWorking}
            {...register('reqularPrice', {
                min: {
                    value: 1,
                    message: 'Price should be at least 1'
                },
            })}
            />
        </FromRow>

        <FromRow lable='Discount' error={errors?.discount?.message}>
            <Input 
            type='number'
            id='discount'
            defaultValues={0}
            disbled={isWorking}
            {...register('discount', {
                required: "Can't be make it at least 0",
                validate: (value) => 
                 getValues().regularPrice >= value || 
                'Discount should be less than reqular price'   
            })}
            />
        </FromRow>
        <FromRow
        lable='Descriotion for website'
        error={errors?.discription?.message}
        >
            <Textarea
            type='name'
            id='description'
            defaultValues=''
            disabled={isWorking}
            {...register('description', { required: 'This field is required' })}
            />
        </FromRow>
        <FromRow lable='Cabin photo' error={errors?.image?.message}>
            <FileInput
            id='image'
            accept='image/*'
            disabled={isWorking}
            {...register('image',  {
                required: isEditSession ? false : 'This field is required',
            })}
            /> 
        </FromRow>
        <FromRow>
            <Button
            variation='secondary'
            type='reset'
            disabled={isWorking}
            onClick={() => closeModal?.()}
            >
                Cancle
            </Button>
            <Button disabled={isWorking}>
                {isEditSession ? 'Edit cabin' : 'Create new cabin'}
            </Button>
        </FromRow>
    </Form>
  )
}

export default CreateCabinForm;