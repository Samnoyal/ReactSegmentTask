// src/components/ViewSegment.js

import React from 'react';
import { Drawer } from 'antd';
import { IoIosArrowBack } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useSegment } from './SegmentContext';
import 'react-toastify/dist/ReactToastify.css';
import './Style.css'; // Ensure your styles are in this file

const ViewSegment = () => {
  const { segmentName, setSegmentName, addedSchemas, setAddedSchemas, availableSchemas, setAvailableSchemas } = useSegment();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedSchema, setSelectedSchema] = React.useState('');

  const showModal = () => {
    setOpenModal(true);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const onCancel = () => {
    setSegmentName('');
    setAddedSchemas([]);
    setOpenModal(false);
  };

  const handleAddSchema = () => {
    const schemaItem = availableSchemas.find((item) => item.value === selectedSchema);
    if (schemaItem && !addedSchemas.includes(schemaItem.label)) {
      setAddedSchemas([...addedSchemas, schemaItem.label]);
      setAvailableSchemas(
        availableSchemas.filter((item) => item.value !== selectedSchema)
      );
      setSelectedSchema('');
    }
  };

  const handleRemoveSchema = (schema) => {
    setAddedSchemas(addedSchemas.filter((s) => s !== schema));
    setAvailableSchemas([
      ...availableSchemas,
      { label: schema, value: schema },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!segmentName || !addedSchemas.length) {
      return toast.error("Please enter the segment name and add at least one schema.");
    }
    // Post Method
    axios
      .post('webhook', {
        segmentName,
        addedSchemas,
      })
      .then((response) => {
        console.log("response :>> ", response);
        toast.success("Segment Name and Schema added successfully");
      })
      .catch((error) => {
        console.log("error :>> ", error);
        toast.error("An error occurred. Please try again.");
      });

    setSegmentName('');
    setAddedSchemas([]);
  };

  return (
    <div className="task">
      <nav style={{ backgroundColor: "#4FA095", color: "white" }} className="navbar text-start container d-flex align-items-center">
        <span>
          <IoIosArrowBack size={24} /> View Audience
        </span>
      </nav>
      <div className="container my-5">
        <button onClick={showModal} className="submit-button w-25">
          Save Segment
        </button>
      </div>

      <Drawer
        title={`Saving Segment`}
        placement="right"
        onClose={onClose}
        open={openModal}
        footer={
          <div className="d-flex align-items-center justify-content-between gap-3">
            <button className="submit-button" onClick={handleSubmit}>
              Save the Segment
            </button>
            <button onClick={onCancel} className="btn btn-danger">
              Cancel
            </button>
          </div>
        }
      >
        <form className="form">
          <b>Enter the Name of the Segment</b>
          <input
            type="text"
            value={segmentName}
            className="segmentInput my-3"
            placeholder="Name of the Segment"
            onChange={(e) => setSegmentName(e.target.value)}
            required
          />
          <p>
            To save your segment, you need to add the schemas to build the query.
          </p>
          <div className="col my-3 addedSchema">
            {addedSchemas.length > 0 ? (
              addedSchemas.map((schema) => (
                <div className="d-flex align-items-center" key={schema}>
                  <select name="updatedSchema" className="segmentInput my-1 w-75">
                    <option label="">
                      {schema}
                    </option>
                  </select>
                  <button
                    className="btn btn-danger mx-2 mb-1"
                    onClick={() => handleRemoveSchema(schema)}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p>No schema found</p>
            )}
          </div>
          <select
            name="selectedSchema"
            className="segmentInput my-3"
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Add Schema To Segment
            </option>
            {availableSchemas.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddSchema}
            type="button"
            className="btn btn-link mb-5"
          >
            + Add New Schema
          </button>
        </form>
        <ToastContainer />
      </Drawer>
    </div>
  );
};

export default ViewSegment;
