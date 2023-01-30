
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE;


let storage = new GridFsStorage({ url, options: { useNewUrlParser: true },
                                  file: (request, file) =>{
                                                          const match = ["image/png", "image/jpg"];

                                                          if(match.indexOf(file.memeType) === -1)
                                                            return`${Date.now()}-blog-${file.originalname}`;

                                                            return {
                                                                        bucketName: "photos",
                                                                        filename: `${Date.now()}-blog-${file.originalname}`
                                                                    }
                                                      }
                               });


export default multer({ storage });




// export {upload};
