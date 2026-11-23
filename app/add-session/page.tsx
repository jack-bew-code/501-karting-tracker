import AddSessionForm from "@/components/AddSessionForm";
import { auth } from "@clerk/nextjs/server";


export default async function form(){
    await auth.protect();
    return(
        <AddSessionForm></AddSessionForm>
    )
}