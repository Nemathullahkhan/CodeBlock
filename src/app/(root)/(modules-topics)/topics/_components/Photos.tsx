export default function Photos ({photos}:{photos:string[]}){
    return (
        <div className="">
            {photos.map((photo,index)=>(
                 <img 
                 key={index}
                 src={photo}
                //  alt="photo"
                 className="rounded-lg  object-contain w-[500px] h-[250px]"
             />
            ))}
        </div>
    )
}