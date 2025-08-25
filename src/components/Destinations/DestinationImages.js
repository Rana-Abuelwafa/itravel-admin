import React, { useEffect, useState } from "react";
import {
  GetDestination_Mains,
  GetImgsByDestination,
  UpdateDestinationImage,
  saveDestinationImage,
} from "../../slices/destinationSlice";
import { Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../Shared/popup/PopUp";
import ImageGallery from "../Shared/ImageGallery/ImageGallery";
function DestinationImages() {
  const [destination_id, setdestination_id] = useState(0);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [popupType, setPopupType] = useState("alert"); // State for popup type
  const [images, setImages] = useState([]);
  const { DestinationMain, loading } = useSelector(
    (state) => state.destinations
  );

  useEffect(() => {
    dispatch(GetDestination_Mains());
    return () => {};
  }, [dispatch]);

  const handleInputChange = (e) => {
    const id = e.target.value;
    setdestination_id(id);
    dispatch(GetImgsByDestination(id)).then((result) => {
      if (result.payload) {
        setImages(result.payload);
      }
    });
  };

  // Handle file input
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    //setImages((prev) => [...prev, ...newImages]);
    const formData = new FormData();
    formData.append("id", 0);
    formData.append("destination_id", destination_id);
    formData.append("is_default", false);
    files.forEach((img) => {
      formData.append("imgs", img); // "Files" matches API param name
    });
    dispatch(saveDestinationImage(formData)).then((result) => {
      if (result.payload && result.payload.success) {
        setShowPopup(false);
        dispatch(GetImgsByDestination(destination_id)).then((result) => {
          if (result.payload) {
            setImages(result.payload);
          }
        });
      } else {
        setPopupType("error");
        setShowPopup(true);
        setPopupMessage(result.payload.errors);
      }
    });
  };
  // Remove image
  const handleRemove = (img) => {
    let data = {
      id: img.id,
      destination_id: img.destination_id,
      img_path: img.img_path,
      img_name: img.img_name,
      is_default: img.is_default,
      delete: true,
    };
    dispatch(UpdateDestinationImage(data)).then((result) => {
      if (result.payload && result.payload.success) {
        setShowPopup(false);
        dispatch(GetImgsByDestination(destination_id)).then((result) => {
          if (result.payload) {
            setImages(result.payload);
          }
        });
      } else {
        setPopupType("error");
        setShowPopup(true);
        setPopupMessage(result.payload.errors);
      }
    });
  };

  // Mark image as default
  const handleSetDefault = (img) => {
    let data = {
      id: img.id,
      destination_id: img.destination_id,
      img_path: img.img_path,
      img_name: img.img_name,
      is_default: true,
      delete: false,
    };
    dispatch(UpdateDestinationImage(data)).then((result) => {
      if (result.payload && result.payload.success) {
        setShowPopup(false);
        dispatch(GetImgsByDestination(destination_id)).then((result) => {
          if (result.payload) {
            setImages(result.payload);
          }
        });
      } else {
        setPopupType("error");
        setShowPopup(true);
        setPopupMessage(result.payload.errors);
      }
    });
  };
  console.log("DestinationMain ", DestinationMain);
  return (
    <section className="layout_section">
      {" "}
      <div className="d-flex justify-content-between align-items-center header_title">
        <h2 className="mb-4 page-title">Destination Images</h2>
        <div className="position-relative">
          <Form.Group>
            {/* <Form.Label>Destination</Form.Label> */}
            <Form.Control
              as="select"
              name="destination_id"
              onChange={handleInputChange}
              value={destination_id}
              required
              className="formInput"
            >
              <option value="">select Destination</option>
              {DestinationMain &&
                DestinationMain?.map((dest, index) => (
                  <option key={index} value={dest.id}>
                    {dest.dest_code} - {dest.dest_default_name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </div>
      </div>
      <hr className="divider" />
      <div className="result_list">
        <div className="gallery-container">
          {/* Upload Button */}
          {destination_id && (
            <div className="upload-box">
              <input
                type="file"
                multiple
                accept="image/*"
                id="fileUpload"
                onChange={handleUpload}
                hidden
              />
              <label htmlFor="fileUpload" className="upload-btn">
                <FaPlus /> Upload Images
              </label>
            </div>
          )}
          {/* Gallery Grid */}
          <ImageGallery
            images={images}
            handleRemove={handleRemove}
            handleSetDefault={handleSetDefault}
          />
        </div>
      </div>
      {loading ? <LoadingPage /> : null}
      <PopUp
        show={showPopup}
        closeAlert={() => setShowPopup(false)}
        msg={popupMessage}
        type={popupType}
        autoClose={3000}
      />
    </section>
  );
}

export default DestinationImages;
