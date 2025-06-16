"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { faUser, faShoppingBag, faStar, faHeart, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthStore from "@/store/authStore";

const UserProfile = () => {
  const router = useRouter();
  const { token, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [likes, setLikes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    password: "",
  });

  useEffect(() => {
    if (!token) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      router.push("/login");
      return;
    }
    fetchUserData();
  }, [token, router]);

  useEffect(() => {
    if (!token) return;
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "reviews") fetchReviews();
    if (activeTab === "likes") fetchLikes();
  }, [activeTab, token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone || "",
        address: response.data.address || "",
        birthDate: response.data.birthDate ? format(new Date(response.data.birthDate), "yyyy-MM-dd") : "",
        password: "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error.response || error);
      if (error.response?.status === 401) {
        toast.error("لطفاً مجدداً وارد حساب کاربری خود شوید");
        logout();
        router.push("/login");
      } else {
        toast.error(error.response?.data?.message || "خطا در دریافت اطلاعات کاربر");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.orders);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("لطفاً مجدداً وارد حساب کاربری خود شوید");
        logout();
        router.push("/login");
      } else {
        toast.error("خطا در دریافت سفارشات");
      }
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data.reviews);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("لطفاً مجدداً وارد حساب کاربری خود شوید");
        logout();
        router.push("/login");
      } else {
        toast.error("خطا در دریافت نظرات");
      }
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/likes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(response.data.likes);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("لطفاً مجدداً وارد حساب کاربری خود شوید");
        logout();
        router.push("/login");
      } else {
        toast.error("خطا در دریافت محصولات مورد علاقه");
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("اطلاعات پروفایل با موفقیت به‌روزرسانی شد");
      setEditMode(false);
      fetchUserData();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("لطفاً مجدداً وارد حساب کاربری خود شوید");
        logout();
        router.push("/login");
      } else {
        toast.error(error.response?.data?.message || "خطا در به‌روزرسانی پروفایل");
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    toast.success("خروج موفقیت‌آمیز");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* تب‌های اصلی */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FontAwesomeIcon icon={faUser} className="ml-2" />
              پروفایل
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "orders"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FontAwesomeIcon icon={faShoppingBag} className="ml-2" />
              سفارشات ({userData?.stats?.ordersCount || 0})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FontAwesomeIcon icon={faStar} className="ml-2" />
              نظرات ({userData?.stats?.reviewsCount || 0})
            </button>
            <button
              onClick={() => setActiveTab("likes")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "likes"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="ml-2" />
              علاقه‌مندی‌ها ({userData?.stats?.likesCount || 0})
            </button>
          </nav>
        </div>

        {/* محتوای تب‌ها */}
        <div className="p-6">
          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">اطلاعات پروفایل</h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <FontAwesomeIcon icon={faEdit} className="ml-2" />
                  {editMode ? "انصراف" : "ویرایش"}
                </button>
              </div>

              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">نام</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">شماره تماس</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">آدرس</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">رمز عبور جدید (اختیاری)</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      ذخیره تغییرات
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">نام</label>
                    <p className="mt-1">{userData?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                    <p className="mt-1">{userData?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">شماره تماس</label>
                    <p className="mt-1">{userData?.phone || "-"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">آدرس</label>
                    <p className="mt-1">{userData?.address || "-"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
                    <p className="mt-1">
                      {userData?.birthDate
                        ? format(new Date(userData.birthDate), "yyyy/MM/dd")
                        : "-"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">سفارشات من</h2>
              {orders.length === 0 ? (
                <p className="text-gray-500">شما هنوز سفارشی ثبت نکرده‌اید.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">سفارش #{order._id}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(order.createdAt), "yyyy/MM/dd HH:mm")}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status === "delivered"
                            ? "تحویل داده شده"
                            : order.status === "processing"
                            ? "در حال پردازش"
                            : "در انتظار پردازش"}
                        </span>
                      </div>
                      <div className="mt-4">
                        <p className="font-medium">مبلغ کل: {order.totalPrice.toLocaleString()} تومان</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">نظرات من</h2>
              {reviews.length === 0 ? (
                <p className="text-gray-500">شما هنوز نظری ثبت نکرده‌اید.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{review.product.title}</p>
                          <div className="flex items-center mt-1">
                            <div className="text-yellow-400">
                              {"★".repeat(review.rating)}
                              {"☆".repeat(5 - review.rating)}
                            </div>
                            <span className="text-sm text-gray-500 mr-2">
                              {format(new Date(review.createdAt), "yyyy/MM/dd")}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            review.isApproved
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {review.isApproved ? "تایید شده" : "در انتظار تایید"}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="font-medium">{review.title}</p>
                        <p className="text-gray-600 mt-1">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "likes" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">محصولات مورد علاقه</h2>
              {likes.length === 0 ? (
                <p className="text-gray-500">شما هنوز محصولی را لایک نکرده‌اید.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {likes.map((like) => (
                    <div
                      key={like._id}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={like.product.images[0]}
                          alt={like.product.title}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => handleUnlike(like.product._id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{like.product.title}</h3>
                        <p className="text-gray-600 mt-1 line-clamp-2">
                          {like.product.description}
                        </p>
                        <p className="text-indigo-600 font-medium mt-2">
                          {like.product.price.toLocaleString()} تومان
                        </p>
                        <button
                          onClick={() => router.push(`/shop/${like.product._id}`)}
                          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                        >
                          مشاهده محصول
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          خروج از حساب کاربری
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 