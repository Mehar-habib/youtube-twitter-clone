const SkeletonItem = () => (
  <div className="animate-pulse bg-[#222222] h-56 relative mb-2">
    <div className="absolute bottom-1 border-slate-500 h-12 w-full border-t p-2">
      <div className="absolute bottom-0 w-8 h-8 animate-pulse bg-gray-500 rounded-full space-y-2"></div>
      <div>
        <div className="w-3/4 h-2 ml-10 bg-gray-500 rounded-sm mt-1"></div>
        <div className="w-3/4 h-2 ml-10 bg-gray-500 rounded-sm mt-1"></div>
      </div>
    </div>
  </div>
);

function HomeSkeleton() {
  const skeletonItems = [];
  for (let i = 0; i < 9; i++) {
    skeletonItems.push(<SkeletonItem key={i} />);
  }
  return (
    <div className="w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
      {skeletonItems}
    </div>
  );
}

export default HomeSkeleton;
