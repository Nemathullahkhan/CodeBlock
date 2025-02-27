"use client"
import { getModules } from "@/lib/actions/moduleActions";
import { useEffect, useState } from "react";
import ModuleCard from "../components/ModuleCard";
import Link from "next/link";
import CreationMod from "../components/CreationMod";

interface ModuleType {
    id: string;
    name?: string;
    description?: string;
  }

  
export default function Page() {
    const [modules,setModules] = useState<ModuleType[]>([]);
    
    useEffect(()=>{
        const getAllModules = async ()=>{
            const getSubject = await getModules();
            setModules(getSubject);
        }
        getAllModules();
    },[]);

    return (
        <>
        {/* Todo - design the home page */}
        <div className="">
            {/* <CreationMod/> */}
        </div>
        {modules.map((mod)=> (
            <div className="max-w-md text-center" key = {mod.id}>
                <Link href ={`/module/${mod.id}`} >
                <ModuleCard {...mod}/>
                </Link>
            </div>
        ))}
        
        </>
    )
}