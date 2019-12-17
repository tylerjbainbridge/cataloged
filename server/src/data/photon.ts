import { Photon } from '@prisma/photon';

export const photon = new Photon();

photon
  .connect()
  .then(() => {
    console.log(`connected to photon (${process.env.POSTGRESQL_URL})`);
  })
  .catch(e => {
    console.log(`error connecting to photon (${process.env.POSTGRESQL_URL})`);
  });

// export const photonSet = Array.from(new Array(5), _ => new Photon());

// export const getPhoton = () => {
//   const randomIdx = Math.floor(Math.random() * photonSet.length);
//   return photonSet[randomIdx];
// };
