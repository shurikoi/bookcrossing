import { useBook } from "@/components/contexts/BookProvider";
import { useScreen } from "@/components/contexts/ScreenProvider";
import ShareIcon from "@/components/ui/icons/ShareIcon";
import toast from "react-hot-toast";

export default function ShareButton() {
  const { book } = useBook();
  const { isSmallScreen } = useScreen();

  const url = window.location.href;

  async function share() {
    try {
      await navigator.share({
        title: `${book?.title}\n${book?.description}`,
        url,
      });
    } catch (err) {
      try {
        navigator.clipboard.writeText(`${book?.title}\n${book?.description}\n${url}`);
        toast.success("Skopiowane!");
      } catch (err) {
        toast.error("Nie powiodło się;(");
      }
    }
  }

  return (
    <div
      className="cursor-pointer flex px-3 rounded-lg items-center border-[2px] active:scale-[0.99] will-change-transform border-[#4F98CD]"
      onClick={share}
    >
      <ShareIcon />
    </div>
  );
}
