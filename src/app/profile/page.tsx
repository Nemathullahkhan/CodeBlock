import StarterLinks from "../(root)/(modules-topics)/module/_components/StarterLinks";
import FolderAndProgram from "./_components/FolderAndProgram";
import ProfileCard from "./_components/ProfileCard";

export default function Page() {
  return (
    <div className="max-w-7xl px-10 py-10 items-center ">
      <div className=" -z-10 w-[200px] h-[200px] bg-zinc-600/20 absolute bottom-0 blur-3xl"></div>
      <div className="space-y-8">
        <StarterLinks name={"Profile"} />
        <ProfileCard />
        <FolderAndProgram />
      </div>
    </div>
  );
}
