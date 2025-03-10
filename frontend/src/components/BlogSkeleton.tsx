import { Circle } from "./BlogCard";

export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="w-screen max-w-screen-md cursor-pointer border-b border-slate-200 p-4 pb-4">
        <div className="flex">
          <div className="mb-4 h-4 w-4 w-48 rounded-full bg-gray-200"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
          <div className="flex flex-col justify-center pl-2">
            <Circle />
          </div>
          <div className="flex flex-col justify-center pl-2 text-sm font-thin text-slate-500">
            <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
          </div>
        </div>
        <div className="pt-2 text-xl font-semibold">
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
        </div>
        <div className="text-md font-thin">
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
        </div>
        <div className="pt-4 text-sm font-thin text-slate-500">
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
