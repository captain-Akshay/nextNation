import React from "react";
import Image from "next/image";

const ImageModal = ({ imageUrl, onClose }:{imageUrl:string,onClose:()=>void}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50 " onClick={onClose}></div>
          <div className="modal-container bg-white rounded-lg shadow-lg overflow-hidden z-10">
              <Image src={imageUrl} alt="Full Size Image" width={800} height={600} quality={50}/>
            </div>
        </div>
      );
    };

export default ImageModal;
