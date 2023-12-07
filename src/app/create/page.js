"use client"

import { useRouter } from "next/navigation";

export default function Create(){

    const router = useRouter();

    return(
        <form onSubmit={(event)=>{
            event.preventDefault();

            const title = event.target.title.value; // name title 인것
            const body = event.target.body.value;

            const options = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({title,body})
            }

            fetch(process.env.NEXT_PUBLIC_API_URL+"topics",options)
            .then(res=>res.json())
            .then(result=>{
                const lastid = result.id;
                router.push(`/read/${lastid}`);
                router.refresh();
            })

        }}>
            <p>
                <input type="text" name="title" placeholder="title"/>
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    )
}