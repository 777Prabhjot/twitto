import Feeds from "@/components/Feeds";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <div className="bg-[#15202b] h-full">
      <SideBar />
      <div className="flex justify-center ">
        <div className="max-w-[600px]">
          <TopBar />
          <Feeds />
        </div>
      </div>
    </div>
  );
}
