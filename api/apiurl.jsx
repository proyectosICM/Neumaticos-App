export const base = "http://192.168.1.232:8082";

export const baseURL = `${base}/api`;

export const infoURL = `${baseURL}/users/info`;

/**
 * Vehicle endpoints
 */
export const vehicleURL = `${baseURL}/vehicle`;

export const vehicleFindPlateURL = `${vehicleURL}/findByPlaca`;

/**
 * Tire
 */
export const tireURL = `${baseURL}/tire`;
export const tireInfoTireURL = `${tireURL}/findByVehicleModelIdAndPositioningLocationCode`;
export const tireSearchURL = `${tireURL}/search`;

/**
 * TireSensor endpoints
 */
export const tireSensorURL = `${baseURL}/tireSensor`;
export const tireSensorxVehcileURL = `${tireSensorURL}/vehicle`;

/**
 * Irregularities
 */
export const IrregularitiesTiredBaseURL = `${baseURL}/irregularities`;
export const IrregularitiesTiredCompanyAndVehicleURL = `${IrregularitiesTiredBaseURL}/companyAndVehicleList`;