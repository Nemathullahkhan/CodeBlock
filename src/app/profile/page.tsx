import StarterLinks from "../(root)/(modules-topics)/module/_components/StarterLinks";
import FolderAndProgram from "./_components/FolderAndProgram";
import ProfileCard from "./_components/ProfileCard";

export default function Page() {
  return (
    <div className="max-w-7xl px-10 py-10 items-center ">
      <div className="space-y-8">
        <StarterLinks name={"Profile"} />
        <ProfileCard />
        {/* <UserModuleRender/> */}
        <FolderAndProgram />
      </div>
    </div>
  );
}
