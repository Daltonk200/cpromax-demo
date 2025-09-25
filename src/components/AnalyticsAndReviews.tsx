import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Eye, 
  MessageCircle, 
  Star, 
  TrendingUp, 
  Calendar,
  Users,
  Clock
} from 'lucide-react';

const AnalyticsAndReviews: React.FC = () => {
  const [profileViews, setProfileViews] = useState(0);
  const [leads, setLeads] = useState(0);
  const [rating, setRating] = useState(0);

  // Animate numbers counting up
  useEffect(() => {
    const animateNumber = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 30);
    };

    animateNumber(120, setProfileViews);
    animateNumber(8, setLeads);
    animateNumber(4.5, setRating);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-5 w-5 text-yellow-400" />
          <Star className="h-5 w-5 text-yellow-400 fill-current absolute top-0 left-0" 
                style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-5 w-5 text-neutral-300" />
      );
    }

    return stars;
  };

  const demoReviews = [
    {
      id: 1,
      customerName: 'Jean-Claude M.',
      rating: 5,
      comment: 'Excellent service! Very professional and completed the work on time.',
      date: '2025-01-15',
      service: 'House Painting',
    },
    {
      id: 2,
      customerName: 'Marie D.',
      rating: 4,
      comment: 'Good quality work, would recommend to others.',
      date: '2025-01-10',
      service: 'Plumbing Repair',
    },
    {
      id: 3,
      customerName: 'Paul T.',
      rating: 5,
      comment: 'Outstanding craftsmanship and attention to detail.',
      date: '2025-01-05',
      service: 'Carpentry',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">
            Analytics Overview
          </h2>
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <Calendar className="h-4 w-4" />
            <span>Last 30 days</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Views */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-1">
              <motion.div 
                className="text-2xl font-bold text-blue-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {profileViews}
              </motion.div>
              <p className="text-blue-700 text-sm">Profile Views</p>
              <p className="text-xs text-blue-600">+15% from last month</p>
            </div>
          </motion.div>

          {/* Leads Received */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-1">
              <motion.div 
                className="text-2xl font-bold text-green-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {leads}
              </motion.div>
              <p className="text-green-700 text-sm">Leads Received</p>
              <p className="text-xs text-green-600">+3 this week</p>
            </div>
          </motion.div>

          {/* Average Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <Users className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="space-y-1">
              <motion.div 
                className="text-2xl font-bold text-yellow-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {rating.toFixed(1)}★
              </motion.div>
              <p className="text-yellow-700 text-sm">Average Rating</p>
              <p className="text-xs text-yellow-600">Based on 12 reviews</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Charts Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Performance Trends
        </h3>
        <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
            <h4 className="font-medium text-neutral-600 mb-2">
              Advanced Analytics Coming Soon
            </h4>
            <p className="text-sm text-neutral-500">
              Detailed charts and insights will be available in future updates
            </p>
          </div>
        </div>
      </motion.div>

      {/* Customer Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Customer Reviews
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {renderStars(4.5)}
            </div>
            <span className="text-sm text-neutral-600 ml-2">
              4.5 out of 5 (12 reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {demoReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="border border-neutral-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-neutral-900">
                    {review.customerName}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-xs text-neutral-500">
                      {review.service}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-neutral-500">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-neutral-700 text-sm">
                "{review.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Review System Coming Soon</span>
          </div>
          <p className="text-sm text-primary-800">
            Real customer reviews and rating system will be available once customers 
            can book and rate your services through the platform.
          </p>
        </div>
      </motion.div>

      {/* Insights & Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Insights & Recommendations
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Boost Your Visibility
              </h4>
              <p className="text-sm text-blue-800">
                Add more photos to your services to increase customer engagement by up to 40%.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-green-900 mb-1">
                Quick Response Matters
              </h4>
              <p className="text-sm text-green-800">
                Responding to inquiries within 1 hour increases conversion rates by 60%.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">
                Maintain Excellence
              </h4>
              <p className="text-sm text-yellow-800">
                Your rating is excellent! Keep providing quality service to maintain customer trust.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsAndReviews;
