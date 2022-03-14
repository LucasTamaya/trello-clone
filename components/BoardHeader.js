import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useRouter } from "next/router";

const BoardHeader = () => {

    const router = useRouter();

  return (
    <header className="w-screen h-[10vh] bg-gray-600 px-2 py-7">
      <div className="max-w-6xl h-full mx-auto flex items-center lg:justify-between">
        <div className="flex items-center gap-x-5">
          <DashboardCustomizeIcon className="text-white cursor-pointer" />
          <img src="/logo-white.svg" className="cursor-pointer" width={100} height={100} onClick={() => router.push("/boards")} />
          <button className="bg-white text-gray-600 px-2 py-1 rounded">
            Create
          </button>
        </div>
        <div className="hidden items-center gap-x-5 lg:flex">
          <div className="flex items-center gap-x-2 bg-slate-100/30 p-1 rounded">
            <SearchIcon className="text-white cursor-pointer" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white placeholder:text-white outline-0"
            />
          </div>
          <div className="flex gap-x-5">
            <InfoOutlinedIcon className="hidden text-white cursor-pointer lg:block" />
            <NotificationsNoneOutlinedIcon className="hidden text-white cursor-pointer lg:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BoardHeader;
