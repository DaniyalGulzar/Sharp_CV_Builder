import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Button from "@/components/Button";

interface SubscriptionData {
  isSubscribed: boolean;
  currentProductId?: string;
  currentAmount?: number;
}

interface ProductData {
  productId: string;
  name: string;
  amount: number;
  isActive: boolean;
  _id: string;
}

interface PlanData {
  type: "free" | "monthly" | "yearly";
  name: string;
  buttonText: string;
  buttonAction: (productId?: string) => void;
  isDisabled?: boolean;
  productId?: string;
  cutPrice?: number;
}

interface PricingCardProps {
  plan: PlanData;
  price: number;
}

const SubscriptionDashboard: React.FC = () => {
  const { data: session }: any = useSession();
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductData();
    if (session) {
      fetchUserSubscriptionStatus();
    }
  }, [session]);

  const fetchUserSubscriptionStatus = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/show/${session.user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubscriptionData({
        isSubscribed: !!response.data.result.subscription,
        currentProductId: response.data.result.productId?._id,
        currentAmount: response.data.result.productId?.amount,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch subscription details.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductData = async () => {
    setLoading(true);
    try {
      //const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/payment/product-list`
      );
      setProducts(response.data.result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch product details.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedProductId || !session) {
      window.location.href = "/auth/signup";
      return;
    }
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/payment/checkout`,
        { productId: selectedProductId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const checkoutUrl = response.data.result.url;
      window.location.href = checkoutUrl;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to initiate checkout.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const token = session.token;
      await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/payment/unsubscribe`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Unsubscribed successfully!");
      setSubscriptionData({ isSubscribed: false });
      setIsUnsubscribeModalOpen(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to unsubscribe.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "4 basic resume templates",
    "4 matching cover letter templates",
    "1 basic website template",
    "20,000 pre-written phrases",
    "1500+ resume examples",
    "Unlimited downloads",
  ];

  const getPlans = (): PlanData[] => {
    const monthlyProduct = products.find((p) => p.amount === 2);
    const yearlyProduct = products.find((p) => p.amount === 20);

    const isSubscribedToMonthly =
      subscriptionData?.currentProductId === monthlyProduct?._id;
    const isSubscribedToYearly =
      subscriptionData?.currentProductId === yearlyProduct?._id;

    const handlePlanChange = (fromPlan: string, toPlan: string) => {
      toast.error(`Please unsubscribe from your current plan first.`);
    };

    return [
      {
        type: "free",
        name: "Free Plan",
        buttonText: !session
          ? "SIGN UP FOR FREE"
          : subscriptionData?.isSubscribed
          ? "DOWNGRADE"
          : "CURRENT PLAN",
        buttonAction: () => {
          if (!session) {
            window.location.href = "/auth/signup";
          } else if (subscriptionData?.isSubscribed) {
            setIsUnsubscribeModalOpen(true);
          }
        },
      },
      {
        type: "monthly",
        name: "Monthly Plan",
        buttonText: !session
          ? "SIGN UP"
          : isSubscribedToMonthly
          ? "UNSUBSCRIBE"
          : isSubscribedToYearly
          ? "DOWNGRADE"
          : "UPGRADE NOW",
        buttonAction: () => {
          if (!session) {
            window.location.href = "/auth/signup";
          } else if (isSubscribedToMonthly) {
            setIsUnsubscribeModalOpen(true);
          } else if (isSubscribedToYearly) {
            handlePlanChange("Yearly", "Monthly");
          } else if (!subscriptionData?.isSubscribed) {
            setSelectedProductId(monthlyProduct?._id || "");
            setIsModalOpen(true);
          }
        },
        productId: monthlyProduct?._id,
      },
      {
        type: "yearly",
        name: "Yearly Plan",
        buttonText: !session
          ? "SIGN UP"
          : isSubscribedToYearly
          ? "UNSUBSCRIBE"
          : isSubscribedToMonthly
          ? "UPGRADE NOW"
          : "UPGRADE NOW",
        buttonAction: () => {
          if (!session) {
            window.location.href = "/auth/signup";
          } else if (isSubscribedToYearly) {
            setIsUnsubscribeModalOpen(true);
          } else if (isSubscribedToMonthly) {
            handlePlanChange("Monthly", "Yearly");
          } else if (!subscriptionData?.isSubscribed) {
            setSelectedProductId(yearlyProduct?._id || "");
            setIsModalOpen(true);
          }
        },
        productId: yearlyProduct?._id,
        cutPrice: 24,
      },
    ];
  };

  const PricingCard: React.FC<PricingCardProps> = ({ plan, price }) => (
    <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-lg p-6 m-3">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 ">{plan.name}</h2>
        <div className="flex items-baseline mb-6">
          {/* <span className="text-2xl font-semibold text-gray-900">$</span>
          <span className="text-5xl font-bold text-gray-900">{price}</span>
          <span className="ml-2 text-lg text-gray-600">
            {plan.type !== "free"
              ? `/${plan.type === "monthly" ? "Month" : "Year"}`
              : ""}
          </span>
        </div> */}
          <span className="text-2xl font-semibold text-gray-900">$</span>
          <span className="text-5xl font-bold text-gray-900">{price}</span>
          {plan.type === "yearly" && plan.cutPrice && (
            <>
              <span className="text-lg line-through text-gray-500 ml-2">
                ${plan.cutPrice}
              </span>
            </>
          )}
          <span className="ml-2 text-lg text-gray-600">
            {plan.type !== "free"
              ? `/${plan.type === "monthly" ? "Month" : "Year"}`
              : ""}
          </span>
        </div>
        <Button
          onClick={() => plan.buttonAction(plan.productId)}
          className={`w-full py-3 rounded-xl text-center font-semibold transition-colors ${
            plan.type === "free"
              ? "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
              : plan.buttonText === "UNSUBSCRIBE"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {plan.buttonText}
        </Button>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {"What's Included"}
        </h3>
        {plan.type === "yearly" && (
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-medium text-blue-600">
              2 months free
            </span>
          </div>
        )}
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 ${
                plan.type === "free" ? "text-gray-600" : "text-blue-600"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Loader loading={loading} />
      <div className="py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Choose Your Plan.
          </h1>
          <p className="text-lg text-gray-600">
            Elevate your career potential with Premium—unlock exclusive
            opportunities today.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6">
          {getPlans().map((plan) => {
            const productPrice =
              products.find((p) => p._id === plan.productId)?.amount || 0;
            return (
              <PricingCard
                key={plan.type}
                plan={plan}
                price={plan.type === "free" ? 0 : productPrice}
              />
            );
          })}
        </div>
      </div>

      {/* Subscribe Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <p className="text-2xl font-bold text-center mb-6">Subscribe Now</p>
            <p className="text-gray-600 text-center mb-4">
              Access premium tools to enhance your experience.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={handleSubscribe}
                className="h-12 bg-blue-600 text-white font-semibold rounded-lg px-14 hover:bg-blue-700"
              >
                Confirm Subscription
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Unsubscribe Modal */}
      {isUnsubscribeModalOpen && (
        <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setIsUnsubscribeModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <p className="text-2xl font-bold text-center mb-6">Unsubscribe</p>
            <p className="text-gray-600 text-center mb-4">
              Are you sure you want to unsubscribe from this package?
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleUnsubscribe}
                className="h-12 bg-red-600 text-white font-semibold rounded-lg px-14 hover:bg-red-700"
              >
                Confirm Unsubscribe
              </Button>
              <Button
                onClick={() => setIsUnsubscribeModalOpen(false)}
                className="h-12 bg-gray-200 text-gray-700 font-semibold rounded-lg px-14 hover:bg-gray-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionDashboard;

// const getPlans = (): PlanData[] => {
//   // Find monthly and yearly products based on amount
//   const monthlyProduct = products.find((p) => p.amount === 2);
//   const yearlyProduct = products.find((p) => p.amount === 20);

//   return [
//     {
//       type: "free",
//       name: "Free Plan",
//       buttonText: !session
//         ? "SIGN UP FOR FREE"
//         : subscriptionData?.isSubscribed
//         ? "DOWNGRADE"
//         : "CURRENT PLAN",
//       buttonAction: () => {
//         if (!session) {
//           window.location.href = "/auth/signup";
//         } else if (subscriptionData?.isSubscribed) {
//           setIsUnsubscribeModalOpen(true);
//         }
//       },
//     },
//     {
//       type: "monthly",
//       name: "Monthly Plan",
//       buttonText: !session
//         ? "SIGN UP"
//         : subscriptionData?.isSubscribed
//         ? "UNSUBSCRIBE"
//         : "UPGRADE NOW",
//       buttonAction: () => {
//         if (!session) {
//           window.location.href = "/auth/signup";
//         } else if (subscriptionData?.isSubscribed) {
//           setIsUnsubscribeModalOpen(true);
//         } else {
//           setSelectedProductId(monthlyProduct?._id || "");
//           setIsModalOpen(true);
//         }
//       },
//       productId: monthlyProduct?._id,
//     },
//     {
//       type: "yearly",
//       name: "Yearly Plan",
//       buttonText: !session
//         ? "SIGN UP"
//         : subscriptionData?.isSubscribed
//         ? "UNSUBSCRIBE"
//         : "UPGRADE NOW",
//       buttonAction: () => {
//         if (!session) {
//           window.location.href = "/auth/signup";
//         } else if (subscriptionData?.isSubscribed) {
//           setIsUnsubscribeModalOpen(true);
//         } else {
//           setSelectedProductId(yearlyProduct?._id || "");
//           setIsModalOpen(true);
//         }
//       },
//       productId: yearlyProduct?._id,
//     },
//   ];
// };

// const PricingCard: React.FC<PricingCardProps> = ({ plan, price }) => (
//   <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-lg p-6 m-3">
//     <div className="mb-6">
//       <h2 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h2>
//       <div className="flex items-baseline mb-6">
//         <span className="text-2xl font-semibold text-gray-900">$</span>
//         <span className="text-5xl font-bold text-gray-900">{price}</span>
//         <span className="ml-2 text-lg text-gray-600">
//           {plan.type !== "free"
//             ? `/${plan.type === "monthly" ? "Month" : "Year"}`
//             : ""}
//         </span>
//       </div>
//       <Button
//         onClick={() => plan.buttonAction(plan.productId)}
//         disabled={plan.isDisabled}
//         className={`w-full py-3 rounded-xl text-center font-semibold transition-colors ${
//           plan.type === "free"
//             ? "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
//             : "bg-blue-600 text-white hover:bg-blue-700"
//         } ${plan.isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
//       >
//         {plan.buttonText}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useSession } from "next-auth/react";
// import Loader from "@/components/Loader";
// import Button from "@/components/Button";

// interface SubscriptionData {
//   isSubscribed: boolean;
// }

// interface ProductData {
//   productId: string;
//   name: string;
//   amount: number;
//   isActive: boolean;
//   _id: string;
// }

// interface PlanData {
//   type: "free" | "monthly" | "yearly";
//   name: string;
//   price: number;
//   buttonText: string;
//   buttonAction: () => void;
//   isDisabled?: boolean;
// }

// interface PricingCardProps {
//   plan: PlanData;
// }

// const SubscriptionDashboard: React.FC = () => {
//   const { data: session }: any = useSession();
//   const [subscriptionData, setSubscriptionData] =
//     useState<SubscriptionData | null>(null);
//   const [productData, setProductData] = useState<ProductData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (session) {
//       fetchUserSubscriptionStatus();
//       fetchProductData();
//     }
//   }, [session]);

//   const fetchUserSubscriptionStatus = async () => {
//     if (!session) return;
//     setLoading(true);
//     try {
//       const token = session.token;
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/show/${session.user._id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSubscriptionData({
//         isSubscribed: !!response.data.result.subscription,
//       });
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error
//           ? err.message
//           : "Failed to fetch subscription details.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductData = async () => {
//     if (!session) return;
//     setLoading(true);
//     try {
//       const token = session.token;
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_NEXT_URL}api/payment/product-list`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProductData(response.data.result);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to fetch product details.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubscribe = async () => {
//     if (!productData || !session) return;
//     setLoading(true);
//     try {
//       const token = session.token;
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_NEXT_URL}api/payment/checkout`,
//         { productId: productData._id },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const checkoutUrl = response.data.result.url;
//       window.location.href = checkoutUrl;
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to initiate checkout.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUnsubscribe = async () => {
//     if (!session) return;
//     setLoading(true);
//     try {
//       const token = session.token;
//       await axios.get(
//         `${process.env.NEXT_PUBLIC_NEXT_URL}api/payment/unsubscribe`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Unsubscribed successfully!");
//       setSubscriptionData({ isSubscribed: false });
//       setIsUnsubscribeModalOpen(false);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to unsubscribe.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const features = [
//     "4 basic resume templates",
//     "4 matching cover letter templates",
//     "1 basic website template",
//     "20,000 pre-written phrases",
//     "1500+ resume examples",
//     "Unlimited downloads",
//   ];

//   const plans: PlanData[] = [
//     {
//       type: "free",
//       name: "Free Plan",
//       price: 0,
//       buttonText: !session
//         ? "SIGN UP FOR FREE"
//         : subscriptionData?.isSubscribed
//         ? "DOWNGRADE"
//         : "SUBSCRIBED",
//       buttonAction: () => {
//         if (!session) {
//           window.location.href = "/auth/signup";
//         } else if (subscriptionData?.isSubscribed) {
//           setIsUnsubscribeModalOpen(true);
//         }
//       },
//     },
//     {
//       type: "monthly",
//       name: "Monthly Plan",
//       price: 2,
//       buttonText: !session
//         ? "SIGN UP"
//         : subscriptionData?.isSubscribed
//         ? "UNSUBSCRIBE"
//         : "UPGRADE NOW",
//       buttonAction: () => {
//         if (!session) {
//           window.location.href = "/auth/signup";
//         } else if (subscriptionData?.isSubscribed) {
//           setIsUnsubscribeModalOpen(true);
//         } else {
//           setIsModalOpen(true);
//         }
//       },
//     },
//     {
//       type: "yearly",
//       name: "Yearly Plan",
//       price: 20,
//       buttonText: !session
//         ? "SIGN UP"
//         : subscriptionData?.isSubscribed
//         ? "UNSUBSCRIBE"
//         : "UPGRADE NOW",
//       buttonAction: () => {
//         if (!session) {
//           window.location.href = "/auth/signup";
//         } else if (subscriptionData?.isSubscribed) {
//           setIsUnsubscribeModalOpen(true);
//         } else {
//           setIsModalOpen(true);
//         }
//       },
//     },
//   ];

//   const PricingCard: React.FC<PricingCardProps> = ({ plan }) => (
//     <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-lg p-6 m-3">
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h2>
//         <div className="flex items-baseline mb-6">
//           <span className="text-2xl font-semibold text-gray-900">$</span>
//           <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
//           <span className="ml-2 text-lg text-gray-600">/Month</span>
//         </div>
//         <Button
//           onClick={plan.buttonAction}
//           disabled={plan.isDisabled}
//           className={`w-full py-3 rounded-xl text-center font-semibold transition-colors ${
//             plan.type === "free"
//               ? "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           } ${plan.isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
//         >
//           {plan.buttonText}
//         </Button>
//       </div>
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold text-gray-900 mb-3">
//           {"What's Included"}
//         </h3>
//         {features.map((feature, index) => (
//           <div key={index} className="flex items-center gap-2">
//             <svg
//               className={`w-4 h-4 ${
//                 plan.type === "free" ? "text-gray-600" : "text-blue-600"
//               }`}
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             <span className="text-sm text-gray-600">{feature}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Loader loading={loading} />
//       <div className="py-12 px-4">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-900 mb-3">
//             Choose Your Plan.
//           </h1>
//           <p className="text-lg text-gray-600">
//             Elevate your career potential with Premium—unlock exclusive
//             opportunities today.
//           </p>
//         </div>
//         <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6">
//           {plans.map((plan) => (
//             <PricingCard key={plan.type} plan={plan} />
//           ))}
//         </div>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <p className="text-2xl font-bold text-center mb-6">Subscribe Now</p>
//             <p className="text-gray-600 text-center mb-4">
//               Access premium tools to enhance your experience.
//             </p>
//             <div className="flex justify-center">
//               <Button
//                 onClick={handleSubscribe}
//                 className="h-12 bg-blue-600 text-white font-semibold rounded-lg px-14 hover:bg-blue-700"
//               >
//                 Confirm Subscription
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isUnsubscribeModalOpen && (
//         <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
//             <button
//               onClick={() => setIsUnsubscribeModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <p className="text-2xl font-bold text-center mb-6">Unsubscribe</p>
//             <p className="text-gray-600 text-center mb-4">
//               Are you sure you want to unsubscribe from this package?
//             </p>
//             <div className="flex justify-center space-x-4">
//               <Button
//                 onClick={handleUnsubscribe}
//                 className="h-12 bg-red-600 text-white font-semibold rounded-lg px-14 hover:bg-red-700"
//               >
//                 Confirm Unsubscribe
//               </Button>
//               <Button
//                 onClick={() => setIsUnsubscribeModalOpen(false)}
//                 className="h-12 bg-gray-200 text-gray-700 font-semibold rounded-lg px-14 hover:bg-gray-300"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubscriptionDashboard;
