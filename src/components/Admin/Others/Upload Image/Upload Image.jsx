import React, { useState } from "react";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
import axios from "axios";

const Upload_Image = () => {
  const [image, setImage] = useState({ array: [] });
  const [loading, setLoading] = useState("");

  const handleDrop = (files) => {
    const upLoaders = files.map(file => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("upload_preset", "shopconnect");
        formData.append("api_key", "456247579472338");
        formData.append("timestamp", (Date.now() / 1000) | 0);
        setLoading("true");
        return axios
            .post("https://api.cloudinary.com/v1_1/dctl1zamk/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            })
            .then(response => {
                const data = response.data;
                const fileURL = data.secure_url;
                let specificArrayInObject = image.array;
                specificArrayInObject.push(fileURL);
                const newObj = {...image, specificArrayInObject};
                setImage(newObj);
                console.log(image);
            })
    })
    axios.all(upLoaders).then(() => {
        setLoading("false");
    })
  };

  const imagePreview = () => {
    if(loading === "true") {
        return <h3>Cargando Imagenes...</h3>
    };
    if(loading === "false") {
        return (
            <h3>
                {image.array.length <= 0 
                    ? "No hay imagenes"
                    : image.array.map((item, index) => (
                        <img 
                            key={index}
                            alt="Imagen"
                            style={{width: "125px"}}
                            src={item}
                        />
                    ))
                }
            </h3>
        )
    };
  };

  return (
    <div>
        <h1>Sube tu imagen aquí</h1>
        <Container>
            <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <section>
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <span>Logo</span>
                    <p>Imagen aquí</p>
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
