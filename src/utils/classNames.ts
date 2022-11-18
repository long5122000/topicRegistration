export default function classNames(...args: any[]) {
  return args
    .reduce((acc, val) => {
      if (typeof val === "string") {
        return acc.concat(val.split(" "));
      }
      return acc.concat(Object.values(val));
    }, [])
    .join(" ");
}

{
  /* <form onSubmit={handleSubmit(onSubmit)}>
              <Input control={control} name="FirstName"></Input>{" "}
            </form> */
}
// const { handleSubmit, control } = useForm<NewFieldValues>({
//   defaultValues: {
//     FirstName: "",
//   },
//   mode: "onChange",
// });
// const onSubmit = (data: NewFieldValues) => console.log(data);
