import { NextResponse } from 'next/server';
import { Client } from '@googlemaps/google-maps-services-js';

export async function GET() {
  try {
    const client = new Client({});
    const placeId = 'ChIJBdfVk35EwokRTIQeaARomu8';

    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: ['reviews', 'rating', 'user_ratings_total'],
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    console.log("Google Places API Response:", response.data);

    if (response.data.status !== 'OK') {
      throw new Error(`Google Places API Error: ${response.data.status}`);
    }

    return NextResponse.json({
      result: {
        reviews: response.data.result.reviews || [],
        rating: response.data.result.rating,
        total_ratings: response.data.result.user_ratings_total
      }
    });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}