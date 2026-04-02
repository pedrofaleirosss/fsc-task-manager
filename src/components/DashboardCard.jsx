const DashboardCard = ({ icon, mainText, secondaryText }) => {
  return (
    <div className="bg-brand-white flex h-37.5 flex-col items-center justify-center gap-1 rounded-[10px]">
      <div className="flex items-center gap-2">
        <span className="text-brand-primary">{icon}</span>
        <p className="text-brand-dark-blue text-2xl font-semibold">
          {mainText}
        </p>
      </div>
      {secondaryText}
    </div>
  );
};

export default DashboardCard;
