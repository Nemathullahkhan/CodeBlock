// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// interface props {
//   videos?: string[];
// }

// export default function Video({ videos }: props) {
//   return (
//     <Card className="bg-zinc-900 border-zinc-800">
//       <CardHeader>
//         <CardTitle className="text-gray-50">Related Videos</CardTitle>
//       </CardHeader>
//       <CardContent className="grid grid-cols-4 gap-6">
//         {videos.map((vid, idx) => (
//           <div key={idx} className="aspect-video ">
//             <iframe src={vid} className="w-[500px] h-[250px] rounded-lg" allowFullScreen />
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  videos?: string[];
}

// Function to convert YouTube URLs to embed format
const embedUrl = (url: string) => {
  const videoId = url.split("v=")[1]?.split("&")[0]; // Extract video ID
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export default function Video({ videos = [] }: Props) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-gray-50">Related Videos</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {videos.map((vid, idx) => (
          <div key={idx} className="w-full aspect-video">
            <iframe
              src={embedUrl(vid)}
              className="w-full h-full rounded-lg hover:scale-105 transition-all "
              allowFullScreen
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
