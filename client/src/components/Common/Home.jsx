import { useSelector } from "react-redux";
import { ImageEdit } from "../ui/cropper/ImageEdit";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <section className="w-full md:px-6 py-4">
      <div className="w-full md:p-6">
        <ImageEdit />
      </div>
    </section>
  );
}
