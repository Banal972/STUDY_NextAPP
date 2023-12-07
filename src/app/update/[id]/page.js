"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(){

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');

    const router = useRouter();
    const params = useParams();
    const id = params.id;
    
    useEffect(()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL+"topics/"+id)
        .then(resp=>resp.json())
        .then(result=>{
            console.log(result);
            setTitle(result.title);
            setBody(result.body);
        })
    },[]);

    return(
        <form onSubmit={(event)=>{
            event.preventDefault();

            const title = event.target.title.value; // name title 인것
            const body = event.target.body.value;

            const options = {
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({title,body})
            }

            fetch(process.env.NEXT_PUBLIC_API_URL+"topics/"+id,options)
            .then(res=>res.json())
            .then(result=>{
                const lastid = result.id;
                router.push(`/read/${lastid}`);
                router.refresh();
            })

        }}>
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)}/>
            </p>
            <p>
                <textarea name="body" placeholder="body" value={body} onChange={e=>setBody(e.target.value)}></textarea>
            </p>
            <p>
                <input type="submit" value="update" />
            </p>
        </form>
    )
}