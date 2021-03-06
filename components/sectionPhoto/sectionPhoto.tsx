import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import PhotoBoxView from '../photoBoxView/photoBoxView';
import Popup from 'reactjs-popup';
import OutsideClickHandler from 'react-outside-click-handler';
import { Grid } from 'semantic-ui-react';
import './sectionPhoto.scss';
// get our fontawesome imports

const SectionPhoto = (props: any) => {
  const [gallery, setGallery] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const closeModal = () => setOpen(false);

  const ListPhotos = (props: any) => (
    <React.Fragment>
      {props.pics && (
        <div className="row">
          {props.pics.map((picture: any, index: number) => (
            <React.Fragment key={index}>
              <div
                className={'grid-image-view-wrapper col-4'}
                onClick={() => GalleryViewToggle(index)}
              >
                <div
                  className={'grid-image-item'}
                  style={{ backgroundImage: `url(${picture.path})` }}
                ></div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </React.Fragment>
  );

  const GalleryViewToggle = (index: any) => {
    setSelectedItem(index);
    setOpen(true);
  };

  let pics: any = [];
  let pictures = [];

  if (props.local) {
    pictures = JSON.parse(props.local.pictures);

    pictures.map((p: any, index: number) => {
      pics.push({ path: p, 'id:': index, break: index % 3 });
    });
  }

  return (
    <div className="local-section1-portfolio-wrapper">
      <div className={'wrapper'}>
        {!gallery && (
          <div>
            <ListPhotos pics={pics} setOpen={setOpen} />
          </div>
        )}

        {open && (
          <div>
            <Popup open={open} closeOnDocumentClick={false} onClose={closeModal} lockScroll={false}>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setOpen(false);
                }}
              >
                <PhotoBoxView images={pics} selectedItem={selectedItem} />
              </OutsideClickHandler>
            </Popup>
          </div>
        )}
      </div>
    </div>
  );
};
export default SectionPhoto;
