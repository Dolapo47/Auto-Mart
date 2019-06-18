import vehicles from '../db/carDb';

export const carQueries = {

  findOneCar(id) {
    const foundCar = vehicles.find(vehicle => vehicle.id === id);
    return foundCar;
  },
};

export default carQueries;
