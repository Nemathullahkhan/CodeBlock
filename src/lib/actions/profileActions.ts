"use server";

import prisma from "../prisma";

export async function getSavedPrograms({ id }: { id: string | null }) {
  if (!id) {
    return 0; // Return 0 if no user ID is provided
  }

  try {
    const count = await prisma.programs.count({
      where: { userId: id },
    });
    return count; // Return the count of programs
  } catch (err) {
    console.log("Error in the getSavedPrograms Controller ", err);
    return 0; // Return 0 in case of an error
  }
}

export async function getCreatedFolder({ id }: { id: string | null }) {
  if (!id) {
    return 0;
  }
  try {
    const count = await prisma.folders.count({
      where: { userId: id },
    });
    return count;
  } catch (err) {
    console.log("Error in the getSavedPrograms Controller ", err);
    return 0; // Return 0 in case of an error
  }
}

export async function getModuleCompleted({ id }: { id: string | null }) {
  if (!id) {
    return 0;
  }
  try {
    const count = await prisma.module.count({
      where: { userId: id },
    });
    return count;
  } catch (err) {
    console.log("Error in the getModuleCompleted Controller", err);
    return 0;
  }
}

export async function getAllModules() {
  try {
    const count = await prisma.module.count();
    return count;
  } catch (err) {
    console.log("Error occured at getAllmodules controller:", err);
    return 0;
  }
}

// export async function createFolder({
//   id,
//   name,
//   description,
// }: {
//   id: string | null;
//   name:string;
//   description?:string;
// }) {
//   if (!id) {
//     throw new Error("userId is required to create a folder");
//   }
//   try {
//     const result = await prisma.folders.create({
//       data: {
//         userId: id,
//         name,
//         description
//       },
//     });
//     return result;
//   } catch (err) {
//     console.log("Error occurred at createFolder controller:", err);
//     throw new Error("Server error");
//   }
// }

export async function createFolder({
  id,
  name,
  description,
}: {
  id: string | null;
  name: string;
  description?: string;
}) {
  if (!id) {
    throw new Error("userId is required to create a folder");
  }
  try {
    const result = await prisma.folders.create({
      data: {
        userId: id,
        name,
        description,
      },
    });
    return result;
  } catch (err) {
    console.log("Error occurred at createFolder controller:", err);
    throw new Error("Server error");
  }
}

export async function getFolders({ id }: { id: string | null }) {
  if (!id) {
    throw new Error("userId is required to create a folder");
  }
  try {
    const result = await prisma.folders.findMany({
      where: { userId: id },
    });
    return result;
  } catch (err) {
    console.log("Error occurred at getFolders controller:", err);
    throw new Error("Server error");
  }
}

export async function createAndAssignProgram({
  id,
  folderId,
  name,
  description,
  code,
  approach,
  tc,
  sc,
}: {
  id: string | null;
  folderId: string | null;
  name: string;
  description?: string;
  code?: string;
  approach?: string;
  tc?: string;
  sc?: string;
}) {
  if (!id) {
    throw new Error("userId is required to create a folder");
  }
  if (!folderId) {
    throw new Error(
      "folderId is required to associate the program with a folder"
    );
  }
  try {
    const result = await prisma.programs.create({
      data: {
        name,
        foldersId: folderId,
        userId: id,
        description,
        code,
        approach,
        tc,
        sc,
      },
    });
    return result;
  } catch (err) {
    console.log("Error occurred at assignProgram controller:", err);
    throw new Error("Server error");
  }
}

export async function userPrograms({
  id,
  folderId,
}: {
  id: string | null;
  folderId: string | null;
}) {
  if (!id) {
    throw new Error("userId is required to create a folder");
  }
  if (!folderId) {
    throw new Error(
      "folderId is required to associate the program with a folder"
    );
  }
  try {
    const result = await prisma.programs.findMany({
      where: { userId: id, foldersId: folderId },
    });
    return result;
  } catch (err) {
    console.log("Error occurred at getFolders controller:", err);
    throw new Error("Server error");
  }
}

export async function renameProgram({
  programId,
  newName,
}: {
  programId: string;
  newName: string;
}) {
  try {
    const updatedProgram = await prisma.programs.update({
      where: { id: programId },
      data: { name: newName },
    });
    return updatedProgram;
  } catch (err) {
    console.log("Error renaming program:", err);
    throw new Error("Failed to rename program");
  }
}

export async function deleteProgram({ programId }: { programId: string }) {
  try {
    await prisma.programs.delete({
      where: { id: programId },
    });
    return { success: true };
  } catch (err) {
    console.log("Error deleting program:", err);
    throw new Error("Failed to delete program");
  }
}

export async function listProgramsByLatest({
  userId,
  folderId,
}: {
  userId: string;
  folderId: string;
}) {
  try {
    const programs = await prisma.programs.findMany({
      where: { userId, foldersId: folderId },
      orderBy: { createdAt: "desc" },
    });
    return programs;
  } catch (err) {
    console.log("Error listing programs:", err);
    throw new Error("Failed to fetch programs");
  }
}
