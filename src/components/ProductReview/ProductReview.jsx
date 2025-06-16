"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Star, StarHalf, StarOff } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: ""
  });

  const { token, user } = useAuthStore();

  useEffect(() => {
    fetchReviews();
  }, [productId, page]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/reviews/product/${productId}?page=${page}&limit=5`
      );
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("خطا در دریافت نظرات");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          productId,
          ...reviewForm
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("نظر شما با موفقیت ثبت شد");
      setShowReviewForm(false);
      setReviewForm({ rating: 5, title: "", comment: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.response?.data?.message || "خطا در ثبت نظر");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
      } else {
        stars.push(<StarOff key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">نظرات کاربران</h2>
        <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                if (!token) {
                  toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
                  return;
                }
              }}
            >
              ثبت نظر
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ثبت نظر جدید</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  امتیاز شما
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="focus:outline-none"
                    >
                      {star <= reviewForm.rating ? (
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      ) : (
                        <StarOff className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  عنوان نظر
                </label>
                <Input
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  placeholder="عنوان نظر خود را وارد کنید"
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  متن نظر
                </label>
                <Textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="نظر خود را در مورد این محصول بنویسید"
                  required
                  maxLength={1000}
                  className="min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "در حال ثبت..." : "ثبت نظر"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          هنوز نظری برای این محصول ثبت نشده است
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {review.user.name}
                    </h3>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(review.createdAt).toLocaleDateString("fa-IR")}
                  </p>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mt-2">
                {review.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                {review.comment}
              </p>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                قبلی
              </Button>
              <span className="flex items-center px-4 text-gray-700 dark:text-gray-300">
                صفحه {page} از {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                بعدی
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReview; 