import { useForm } from "react-hook-form";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useCreateCabin } from "./useCreateCabin";


import FormRow from "../../ui/FormRow";
import { useEditCabin } from "./useEditcCabin";

function CreateCabinForm({ cabinToedit = {} }) {
    const { id: editId, ...editValues } = cabinToedit;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;
    const { isCreating, createCabin } = useCreateCabin();
    

    const { editCabin,isEditing } = useEditCabin();
    const isWorking = isCreating || isEditing;
    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId },
            {
                onSuccess: () => reset(),
            });
        else
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: () => reset(),
                }
            );
    }

    function onError(err) {
        console.log(err.message);
    }
    // if (isCreating) return <Spinner />;
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", { required: "This feild is required" })}
                />
            </FormRow>

            <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This feild is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This feild is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", { required: "This feild is required" })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession ? false : "This feild is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{!isEditSession ? "Add cabin" : "edit cabin"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
