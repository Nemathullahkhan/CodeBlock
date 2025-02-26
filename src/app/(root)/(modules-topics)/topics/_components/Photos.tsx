

export default function Photos ({photos}:{photos:string[]}){
    return (
        <div className="">
            {photos.map((photo,index)=>(
                 <img 
                 key={index}
                 src={photo}
                 alt="photo"
                 className="rounded-lg w-[500px] h-[250px]"
             />
            ))}
        </div>
    )
}

// interface PhotosProps {
//     photos: string[]
//   }
  
//   export default function Photos({ photos }: PhotosProps) {
//     if (!photos?.length) return null
  
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {photos.map((photo, index) => (
//           <img
//             key={index}
//             src={photo || "/placeholder.svg"}
//             alt={`Photo ${index + 1}`}
//             className="rounded-lg border border-zinc-800 w-full aspect-[2/1] object-cover"
//           />
//         ))}
//       </div>
//     )
//   }
  
  