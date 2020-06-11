const getCoordinates = ({ location, locations }) =>
  location.coordinates || locations[location].coordinates

export default getCoordinates
