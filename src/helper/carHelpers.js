import vehicles from '../db/carDb';

export const carQueries = {

  findCar(id, userId) {
    const foundCar = vehicles.find(vehicle => vehicle.id === id && vehicle.userId === userId);
    return foundCar;
  },

  findOneCar(id) {
    const foundCar = vehicles.find(vehicle => vehicle.id === id);
    return foundCar;
  },
};

export default carQueries;
