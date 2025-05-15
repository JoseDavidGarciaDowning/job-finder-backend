import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Client } from '@googlemaps/google-maps-services-js';
import 'dotenv/config';
@Injectable()
export class LocationService {
  private client: any;

  constructor() {
    this.client = new Client();
  }

  async autocomplete(input: string) {
    if (!input) return [];

    try {
      const response = await this.client.placeAutocomplete({
        params: {
          input,
          key: process.env.GOOGLE_API_KEY!,
          components: 'country:CR',
          types: '(regions)', // esto evita direcciones exactas y muestra lugares generales
        },
      });

      const predictions = response.data.predictions.filter(
        (pred) =>
          pred.types.includes('locality') ||
          pred.types.includes('administrative_area_level_1') ||
          pred.types.includes('country'),
      );
      return predictions;
    } catch (error) {
      console.error(error);
    }
  }

  async autocompleteFromCountry(countryCode: string, input: string) {
    if (!input) return [];

    try {
      const response = await this.client.placeAutocomplete({
        params: {
          input,
          key: process.env.GOOGLE_API_KEY!,
          components: `country:${countryCode}`, // Cambia 'CR' por el código del país que necesites
          types: '(regions)', // esto evita direcciones exactas y muestra lugares generales
        },
      });

      const predictions = response.data.predictions.filter(
        (pred) =>
          pred.types.includes('locality') ||
          pred.types.includes('administrative_area_level_1') ||
          pred.types.includes('country'),
      );
      return predictions;
    } catch (error) {
      console.error(error);
    }
  }

  async autoCompleteCountry(input: string) {
    if (!input) return [];

    try {
      const response = await this.client.placeAutocomplete({
        params: {
          input,
          key: process.env.GOOGLE_API_KEY!,
          types: '(regions)', // aún necesario para limitar resultados generales
          // Nota: No agregamos 'components' aquí para no restringir a un país específico
        },
      });

      const predictions = response.data.predictions.filter((pred) =>
        pred.types.includes('country'),
      );

      return predictions;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getCountryCode(placeId: string) {
    try {
      const response = await this.client.placeDetails({
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_API_KEY!,
        },
      });

      const addressComponents = response.data.result.address_components;

      const countryComponent = addressComponents.find((comp) =>
        comp.types.includes('country'),
      );

      return countryComponent?.short_name || null; // e.g., 'CR'
    } catch (error) {
      console.error('Error al obtener código de país:', error);
      return null;
    }
  }

  async getPlaceDetails(placeId: string) {
    try {
      const response = await this.client.placeDetails({
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_API_KEY!,
          language: 'es', // opcional: para que los nombres vengan en español
        },
      });

      const result = response.data.result;

      // Extraer componentes útiles
      const components = result.address_components;

      const country = components.find((c) =>
        c.types.includes('country'),
      )?.long_name;
      const province = components.find((c) =>
        c.types.includes('administrative_area_level_1'),
      )?.long_name;
      const city = components.find((c) =>
        c.types.includes('locality'),
      )?.long_name;

      return {
        country,
        province,
        city,
        description: result.formatted_address,
        location: result.geometry.location, // { lat, lng }
      };
    } catch (err) {
      console.error('Error al obtener detalles del lugar:', err);
      return null;
    }
  }

  create(createLocationDto: CreateLocationDto) {
    return 'This action adds a new location';
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
