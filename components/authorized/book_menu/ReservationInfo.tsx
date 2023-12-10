interface ReservationInfoProps {
  name: string;
  surname: string;
}

export default function ReservationInfo({name, surname}: ReservationInfoProps) {
  return (
    <div className="flex flex-col gap-2 bg-[#EDFFE4] rounded-md p-3.5 text-[15px] font-inter">
      <div>
        <span className="border-b border-b-black/80 cursor-pointer font-normal">
          {name} {surname}&nbsp;
        </span>
        <span className="font-light">chce Twoją książkę. Kiedy potwierdzisz wymianę dostaniesz 1 punkt.</span>
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="p-1.5 px-4 rounded-full bg-[#61C558] text-white font-normal cursor-pointer">
          Potwierdź wymianę
        </div>
        <div className="p-1 px-4 rounded-full border-[#61C558] border-2 box-border text-[#61C558] font-normal cursor-pointer">
          Anuluj
        </div>
      </div>
    </div>
  );
}
