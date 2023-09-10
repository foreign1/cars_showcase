import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filter: FilterProps) {

  const { manufacturer, year, fuel, limit, model } = filter;

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}&manufacturer=${manufacturer}&fuel_type=${fuel}&year=${year}&limit=${limit}`;

    const headers = {
    'X-RapidAPI-Key': '7e1dda7e0cmshaabc32f7c4f9383p19c39ajsnec126114f568',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  }
  try {
    const response = (await fetch(url, { headers }));
    const result = response.json();
    return result;
  }
  catch (error) {
    console.log(`${error} has occured.`)
  }
}

export function calculateCarRent(city_mpg: number, year: number) {
    const basePricePerDay = 50;
    const milageFactor = 0.1;
    const ageFactor = 0.05;

    // Calculate additional rate based on milage and age
    const milageRate = city_mpg * milageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + milageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
}

export function generateCarImageUrl(car: CarProps, angle: string) {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const {make, year, model} = car;
  
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);
  
  return `${url}`;
}

export function updateSearchParams(type: string, value: string) {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
}