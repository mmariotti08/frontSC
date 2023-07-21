import styles from "./Upload Image.module.css"
import React, { useState } from "react";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
import { BsCardImage } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';

const Upload_Image = ({ image, setImage }) => {
    const [loading, setLoading] = useState(null);

    const handleDrop = (files) => {
        const upLoaders = files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "shopconnect");
            formData.append("api_key", "456247579472338");
            formData.append("timestamp", (Date.now() / 1000) | 0);
            setLoading(true);
            return axios
                .post("https://api.cloudinary.com/v1_1/dctl1zamk/image/upload", formData, {
                    headers: {"X-Requested-With": "XMLHttpRequest"},
                })
                .then(response => {
                    const data = response.data;
                    const fileURL = data.secure_url;
                    let newArray = image;
                    newArray.push(fileURL);
                    setImage([...newArray]);
                })
        })
        axios.all(upLoaders).then(() => {
            setLoading(false);
        });
    };

    const handleClick = (item) => {
        const newArray = image.filter(img => img !== item);
        setImage(newArray);
    };

    const imagePreview = () => {
        if(loading) {
            return <h3>Loading images...</h3>
        };
        if(!loading) {
            return (
                <h3 className={styles.container_img}>
                    {image?.map((item, index) => (
                        <div key={index} className={styles.container_img_button}>
                            <img
                                alt="Imagen"
                                style={{width: "125px"}}
                                src={item}
                            />
                            <button type="button" onClick={() => handleClick(item)}><MdDeleteForever /></button>
                        </div>
                    ))}
                </h3>
            )
        };
    };

    return (
        <div>
            {/* <h3>Upload your image here</h3> */}
            <Container>
                <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps({ className: styles.dropzone })}>
                            <input {...getInputProps()} />
                            <span><BsCardImage /></span>
                            <p>Drag or upload an image here</p>
                        </div>
                    </section>
                )}
                </Dropzone>
                {imagePreview()}
            </Container>
        </div>
    );
};

export { Upload_Image };