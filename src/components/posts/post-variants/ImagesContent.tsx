import { FunctionComponent } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Post } from "../../../hooks/usePosts";
import "./image-content.css";
import { Box } from "@chakra-ui/react";

interface ImagesContentProps {
  images: Post["image"];
}

const ImagesContent: FunctionComponent<ImagesContentProps> = ({ images }) => {
  return (
    <ImageGallery
      onErrorImageURL="https://files.djfan.app/images/no-image-found.png"
      autoPlay={false}
      showThumbnails={false}
      showFullscreenButton={true}
      showPlayButton={false}
      items={(images ?? [])?.map((i) => ({ original: i.location } as ReactImageGalleryItem))}
    />
  );
};

export default ImagesContent;
