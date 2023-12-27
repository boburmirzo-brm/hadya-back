

// compress and not roteted but order is not sorted
exports.createProduct = async (req, res) => {
    try {
      // const uploader = async (path) => await cloudinary.uploads(path, "photos");
      let url = [];
      for (const file of req.files) {
        const { originalname } = file;
        const unique = uuidv4();
        const format = originalname?.split(".").pop();
        const name = `${unique}.${format}`;
  
        sharp(file.buffer)
          .metadata()
          .then(async (metadata) => {
            let booleanValue =
              metadata.orientation && [5, 6, 7, 8].includes(metadata.orientation);
              const processedImage = sharp(file.buffer)
                      .rotate(booleanValue ? 90 : 0)
                      .resize(600, 600)
                      .toBuffer();
                    await processedImage.then((data) => {
                      sharp(data)
                        .toFile(`./images/${name}`)
                        .then(async () => {
                          let pathName = `${req.protocol}://${req.get(
                            "host"
                          )}/image/${name}`;
                          // let path = `images\\${name}`;
                          // const newPath = await uploader(path);
                          // fs.unlinkSync(path);
                          nextFunc(pathName, req.files.length);
                        });
                    });
          });
      }
      async function nextFunc(path, length) {
        url.push(path);
        if (url.length === length) {
          let { name, category, desc, price, items } = req.body;
          let newFile = await Products.create({ name, category, desc, price, url, items});
          res.status(201).json({
            variant: "success",
            msg: "file was saved",
            innerData: newFile,
          });
        }
      }
    } catch {
      res
        .status(500)
        .json({ variant: "error", msg: "server error", innerData: null });
    }
};

// only compress but roteted result
exports.createProduct = async (req, res) => {
    try {
      // const uploader = async (path) => await cloudinary.uploads(path, "photos");
      let url = [];
      for (const file of req.files) {
        const { originalname } = file;
        const unique = uuidv4();
        const format = originalname?.split(".").pop();
        const name = `${unique}.${format}`;
  
        // sharp(file.buffer)
        //   .metadata()
        //   .then(async (metadata) => {
        //     let booleanValue =
        //       metadata.orientation && [5, 6, 7, 8].includes(metadata.orientation);
            
        //   });
          const processedImage = sharp(file.buffer)
                  // .rotate(booleanValue ? 90 : 0)
                  .resize(600, 600)
                  .toBuffer();
                await processedImage.then((data) => {
                  sharp(data)
                    .toFile(`./images/${name}`)
                    .then(async () => {
                      let pathName = `${req.protocol}://${req.get(
                        "host"
                      )}/image/${name}`;
                      // let path = `images\\${name}`;
                      // const newPath = await uploader(path);
                      // fs.unlinkSync(path);
                      nextFunc(pathName, req.files.length);
                    });
                });
      }
      async function nextFunc(path, length) {
        url.push(path);
        if (url.length === length) {
          let { name, category, desc, price, items } = req.body;
          let newFile = await Products.create({ name, category, desc, price, url, items});
          res.status(201).json({
            variant: "success",
            msg: "file was saved",
            innerData: newFile,
          });
        }
      }
    } catch {
      res
        .status(500)
        .json({ variant: "error", msg: "server error", innerData: null });
    }
};