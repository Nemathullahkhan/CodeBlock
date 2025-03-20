// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { getFolders } from "@/lib/actions/profileActions";
// import FolderSidebar from "./FolderSidebar";
// import ProgramContent from "./ProgramContent";

// interface Folder {
//   id: string;
//   userId: string;
//   name: string;
//   description: string | null;
//   createdAt: Date;
//   Programs: Program[]; // Assuming Program is another type you need to define
// }

// // Define the Program type based on your Prisma model
// interface Program {
//   id: string;
//   name: string;
//   description: string | null;
//   // Add other fields as needed
// }


// export default function FolderAndProgram() {
//   const { data: session } = useSession();
//   const userId = session?.user?.id || null;
//   const [folderList, setFolderList] = useState<any[]>([]);
//   const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchFolders = async () => {
//       try {
//         if (userId) {
//           setIsLoading(true);
//           const result = await getFolders({ id: userId });
//           setFolderList(result);

//           // Select the first folder by default if available
//           if (result.length > 0 && !selectedFolderId) {
//             setSelectedFolderId(result[0].id);
//           }
//           setIsLoading(false);
//         }
//       } catch (err) {
//         console.log("Error fetching folders", err);
//         setIsLoading(false);
//       }
//     };

//     fetchFolders();
//   }, [userId, selectedFolderId]);

//   const refreshFolders = async () => {
//     if (userId) {
//       const result = await getFolders({ id: userId });
//       setFolderList(result);
//     }
//   };

//   return (
//     <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background justify-center ml-32">
      
//       <FolderSidebar
//         userId={userId}
//         folders={folderList}
//         selectedFolderId={selectedFolderId}
//         setSelectedFolderId={setSelectedFolderId}
//         refreshFolders={refreshFolders}
//         isLoading={isLoading}
//       />

//       <ProgramContent userId={userId} folderId={selectedFolderId} folderList={folderList} />
//     </div>
//   );
// }

"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getFolders } from "@/lib/actions/profileActions";
import FolderSidebar from "./FolderSidebar";
import ProgramContent from "./ProgramContent";

// Define the Folder type based on your Prisma model
interface Folder {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  Programs: Program[]; // Programs array within the folder
}

// Define the Program type based on your Prisma model
interface Program {
  id: string;
  foldersId: string;
  userId: string;
  name: string;
  description: string | null;
  code: string | null;
  approach: string | null;
  createdAt: Date;
  updatedAt: Date;
  tc: string | null;
  sc: string | null;
}

export default function FolderAndProgram() {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  const [folderList, setFolderList] = useState<Folder[]>([]); // Use the Folder type
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        if (userId) {
          setIsLoading(true);
          const result = await getFolders({ id: userId });
          setFolderList(result);

          // Select the first folder by default if available
          if (result.length > 0 && !selectedFolderId) {
            setSelectedFolderId(result[0].id);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.log("Error fetching folders", err);
        setIsLoading(false);
      }
    };

    fetchFolders();
  }, [userId, selectedFolderId]);

  const refreshFolders = async () => {
    if (userId) {
      const result = await getFolders({ id: userId });
      setFolderList(result);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background justify-center ml-32">
      <FolderSidebar
        userId={userId}
        folders={folderList}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
        refreshFolders={refreshFolders}
        isLoading={isLoading}
      />

      <ProgramContent userId={userId} folderId={selectedFolderId} folderList={folderList} />
    </div>
  );
}