import { ContactSection } from "./component/ContactSection";
import { HeroSlider } from "./component/HeroSlider";
import { NewsSection } from "./component/NewSection";
import { PhotoGallery } from "./component/PhotoGallery";

export default function Home() {
    return (
        <div className="flex flex-col">
            <HeroSlider />
            <NewsSection />
            <PhotoGallery />
            <ContactSection />
        </div>
    );
}