"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function ReviewsSection() {
  const [reviewData, setReviewData] = useState({
    reviews: [],
    rating: 0,
    total_ratings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/get-reviews");
        console.log('Frontend API Response:', response.status, response.statusText);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        console.log('Frontend Received Data:', data);
        setReviewData(data.result || { reviews: [], rating: 0, total_ratings: 0 });
        console.log('Review Data Set To:', data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading)
    return (
      <Card className="p-6 shadow-lg">
        <CardContent>Loading reviews...</CardContent>
      </Card>
    );
  if (error) return null;

  return (
    <>
      {/* Overall Rating Display */}
      <div className="w-full mb-16 text-center bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 break-inside-avoid">
        <div className="text-5xl font-bold text-[#0a2351] mb-3 font-heading">
          {reviewData.rating?.toFixed(1) || "0.0"}
        </div>
        <div className="text-yellow-400 text-2xl mb-2 font-body">
          {"★".repeat(Math.round(reviewData.rating || 0)) + "☆".repeat(5 - Math.round(reviewData.rating || 0))}
        </div>
        <div className="text-gray-600 text-lg font-body">
          Based on {reviewData.total_ratings || 0} reviews
        </div>
      </div>

      {/* Individual Reviews */}
      {reviewData.reviews
        .filter(review => review.rating >= 4)
        .slice(0, 6)
        .map((review, index) => (
          <div key={index} className="break-inside-avoid mb-10 last:mb-0">
            <Card className="p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white h-full">
              <CardContent>
                <div className="flex items-center mb-4">
                  {review.profile_photo_url && (
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-[#0a2351] text-lg font-heading">
                      {review.author_name}
                    </div>
                    <div className="text-yellow-400 text-base mt-1 font-body">
                      {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mt-4 italic font-body">"{review.text}"</p>
              </CardContent>
            </Card>
          </div>
        ))}
    </>
  );
}
