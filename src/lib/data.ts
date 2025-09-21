import type { Maid, Booking, Notification, Review, Attendance } from './types';
import { addDays, eachDayOfInterval, format, isWithinInterval, startOfDay } from 'date-fns';

let maids: Maid[] = [
  {
    id: '1',
    name: 'Reshmi',
    services: ['cooking', 'meal prep', 'kitchen cleaning'],
    monthly_rate: 3800,
    rating: 4.8,
    avg_rating: 4.8,
    reliability_score: 92,
    verified: true,
    image_url: 'https://picsum.photos/seed/woman-cooking/300/300',
    description: 'A fantastic cook, Reshmi specializes in preparing delicious and healthy home-style meals. She is an expert in various cuisines and maintains a spotless kitchen.'
  },
  {
    id: '2',
    name: 'Maria',
    services: ['deep cleaning', 'washing bathrooms', 'sweeping', 'mopping'],
    monthly_rate: 3200,
    rating: 4.6,
    avg_rating: 4.6,
    reliability_score: 88,
    verified: true,
    image_url: 'https://picsum.photos/seed/woman-cleaning/300/300',
    description: 'Maria is a deep cleaning specialist who prides herself on leaving every corner of your home, especially bathrooms, sparkling clean. She is efficient and reliable.'
  },
  {
    id: '3',
    name: 'Shruti',
    services: ['sweeping', 'mopping', 'washing utensils', 'dusting'],
    monthly_rate: 2800,
    rating: 4.5,
    avg_rating: 4.5,
    reliability_score: 75,
    verified: true,
    image_url: 'https://picsum.photos/seed/woman-sweeping/300/300',
    description: 'Shruti is diligent and efficient, ensuring your floors are always pristine. She handles daily sweeping, mopping, and other general cleaning tasks with great care.'
  },
  {
    id: '4',
    name: 'Gita',
    services: ['cleaning', 'laundry', 'washing bathrooms'],
    monthly_rate: 2800,
    rating: 4.6,
    avg_rating: 4.6,
    reliability_score: 95,
    verified: true,
    image_url: 'https://picsum.photos/seed/indian-woman-4/300/300',
    description: 'Gita is hardworking and meticulous. She excels at general house cleaning and laundry services, ensuring your clothes are fresh and your home is tidy.'
  },
  {
    id: '5',
    name: 'Meena',
    services: ['elderly care', 'cooking'],
    monthly_rate: 3500,
    rating: 4.9,
    avg_rating: 4.9,
    reliability_score: 98,
    verified: true,
    image_url: 'https://picsum.photos/seed/indian-woman-5/300/300',
    description: 'Meena is a compassionate caregiver with experience in assisting the elderly. She combines this with her cooking skills to provide holistic support.'
  },
  {
    id: '6',
    name: 'Priya',
    services: ['deep cleaning', 'organizing'],
    monthly_rate: 4500,
    rating: 4.7,
    avg_rating: 4.7,
    reliability_score: 68,
    verified: false,
    image_url: 'https://picsum.photos/seed/indian-woman-6/300/300',
    description: 'Priya specializes in deep cleaning and home organization. She can transform cluttered spaces into neat, functional areas. Currently awaiting verification.'
  }
];

let bookings: Booking[] = [
    {
        id: 'b1',
        user_phone: 'client123',
        maid_id: '1',
        date: '2024-07-01',
        time_slot: 'Monthly Subscription',
        status: 'completed',
        created_at: '2024-06-28T10:00:00Z',
    },
    {
        id: 'b2',
        user_phone: 'client123',
        maid_id: '3',
        date: '2024-08-01',
        time_slot: 'Monthly Subscription',
        status: 'accepted',
        created_at: '2024-07-28T11:00:00Z',
    },
    {
        id: 'b3',
        user_phone: 'client456',
        maid_id: '1',
        date: '2024-08-20',
        time_slot: 'Monthly Subscription',
        status: 'pending',
        created_at: '2024-08-18T09:30:00Z',
    },
    {
        id: 'b4',
        user_phone: 'client789',
        maid_id: '2',
        date: '2024-07-15',
        time_slot: 'Monthly Subscription',
        status: 'rejected',
        created_at: '2024-07-10T15:00:00Z',
    }
];

let notifications: Notification[] = [
    {
        id: 'n1',
        maid_id: '1',
        booking_id: 'b3',
        title: 'New Booking Request',
        body: 'You have a new booking request from client456 for August 20, 2024.',
        read: false,
        created_at: '2024-08-18T09:31:00Z',
    },
    {
        id: 'n2',
        maid_id: '3',
        booking_id: 'b2',
        title: 'Booking Accepted',
        body: 'You accepted the booking from client123.',
        read: true,
        created_at: '2024-08-05T11:05:00Z',
    }
];

let reviews: Review[] = [
    {
        id: 'r1',
        booking_id: 'b1',
        client_id: 'client123',
        maid_id: '1',
        rating: 5,
        comment: 'Reshmi is an amazing cook! Her food is delicious and she always keeps the kitchen sparkling clean. Highly recommended.',
        created_at: '2024-08-02T10:00:00Z'
    },
     {
        id: 'r2',
        booking_id: 'b1',
        client_id: 'clientABC',
        maid_id: '1',
        rating: 4,
        comment: 'Very good service. Food is great, but sometimes she can be a little late.',
        created_at: '2024-05-15T12:00:00Z'
    }
];

// Generate some fake attendance data for booking b1
const generateFakeAttendance = () => {
    const booking = bookings.find(b => b.id === 'b1');
    if (!booking) return [];

    const startDate = new Date(booking.date);
    const endDate = addDays(startDate, 29); // 30 days
    const interval = { start: startDate, end: endDate };

    const days = eachDayOfInterval(interval);
    
    return days.map((day, i) => ({
        id: `att${i}`,
        booking_id: 'b1',
        maid_id: '1',
        client_id: 'client123',
        date: format(day, 'yyyy-MM-dd'),
        // make 2 days absent
        status: (i === 5 || i === 20) ? 'absent' : 'present',
        created_at: day.toISOString(),
    })).filter(att => isWithinInterval(new Date(att.date), {start: startDate, end: new Date()})); // only show past
};

let attendance: Attendance[] = generateFakeAttendance();


// --- Helper function to recalculate scores ---
function recalculateScores(maidId: string) {
    const maid = maids.find(m => m.id === maidId);
    if (!maid) return;

    // Recalculate average rating
    const maidReviews = reviews.filter(r => r.maid_id === maidId);
    const totalRating = maidReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = maidReviews.length > 0 ? totalRating / maidReviews.length : 0;
    maid.rating = avgRating; // Update both for now
    maid.avg_rating = avgRating;


    // Recalculate attendance percentage for the last 30 days
    const thirtyDaysAgo = subDays(new Date(), 30);
    const recentAttendance = attendance.filter(a => a.maid_id === maidId && new Date(a.date) >= thirtyDaysAgo);
    
    const presentDays = recentAttendance.filter(a => a.status === 'present').length;
    const attendancePercentage = recentAttendance.length > 0 ? (presentDays / recentAttendance.length) * 100 : 100; // Default to 100 if no record

    // Calculate reliability score
    const reliabilityScore = (attendancePercentage * 0.7) + (maid.avg_rating * 20 * 0.3); // a 5-star rating is 100%
    maid.reliability_score = Math.round(reliabilityScore);
}


// --- API-like functions to simulate data fetching ---

export function getMaids(verifiedOnly = true): Maid[] {
  if (verifiedOnly) {
    return maids.filter(maid => maid.verified);
  }
  return maids;
}

export function getMaidById(id: string): Maid | undefined {
  recalculateScores(id); // Recalculate on-the-fly for demo
  return maids.find(maid => maid.id === id);
}

export function getBookingsByClient(user_phone: string): Booking[] {
  return bookings
    .filter(b => b.user_phone === user_phone)
    .map(b => ({ ...b, maid: getMaidById(b.maid_id) }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getBookingById(id: string): Booking | undefined {
  const booking = bookings.find(b => b.id === id);
  if (booking) {
    return { ...booking, maid: getMaidById(booking.maid_id) };
  }
  return undefined;
}


export function getBookingsByMaid(maid_id: string): Booking[] {
  return bookings
    .filter(b => b.maid_id === maid_id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getNotificationsByMaid(maid_id: string): Notification[] {
  return notifications
    .filter(n => n.maid_id === maid_id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getReviewsByMaid(maid_id: string): Review[] {
    return reviews
        .filter(r => r.maid_id === maid_id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getAttendanceByBooking(booking_id: string): Attendance[] {
    return attendance
        .filter(a => a.booking_id === booking_id && a.status === 'present')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}


export function createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'status'>): Booking {
  const newBooking: Booking = {
    ...bookingData,
    id: `b${Date.now()}`,
    created_at: new Date().toISOString(),
    status: 'pending',
  };
  bookings.push(newBooking);
  
  // Simulate creating a notification
  const newNotification: Notification = {
    id: `n${Date.now()}`,
    maid_id: newBooking.maid_id,
    booking_id: newBooking.id,
    title: 'New Booking Request',
    body: `New booking for ${newBooking.date} at ${newBooking.time_slot}.`,
    read: false,
    created_at: new Date().toISOString(),
  };
  notifications.unshift(newNotification);

  return newBooking;
}

export function updateBookingStatus(bookingId: string, status: 'accepted' | 'rejected'): Booking | undefined {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = status;
    }
    return booking;
}

export function markAttendance(attendanceData: Omit<Attendance, 'id' | 'created_at'>): Attendance {
    const newAttendance: Attendance = {
        ...attendanceData,
        id: `att${Date.now()}`,
        created_at: new Date().toISOString()
    };
    attendance.push(newAttendance);
    recalculateScores(attendanceData.maidId);
    return newAttendance;
}
